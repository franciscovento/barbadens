import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Profile {
  id: string;
  created_at: string;
  user_id: string;
  profile_name: string;
  birth_date?: string;
}

export type User = {
  id: string | undefined;
  email: string | undefined;
  type: UserRoles;
  profiles: Profile[];
};

export type UserRoles = 'client' | 'staff' | 'admin';

export type UserActions = {
  setUserData: (data: User) => void;
  clearUserData: () => void;
};

const initialState: User = {
  id: undefined,
  email: undefined,
  type: 'client',
  profiles: [],
};

// export const useUser = create<User & UserActions>()((set) => ({
//   ...initialState,
//   clearUserData: () => set({ id: undefined, email: undefined, type: 'client' }),
//   setUserData: (data) =>
//     set({ id: data.id, email: data.email, type: data.type }),
// }));

export const useUser = create<User & UserActions>()(
  persist(
    (set) => ({
      ...initialState,
      clearUserData: () =>
        set({ id: undefined, email: undefined, type: 'client', profiles: [] }),
      setUserData: (data) =>
        set({
          id: data.id,
          email: data.email,
          type: data.type,
          profiles: data.profiles,
        }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
