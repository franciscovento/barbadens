import { Profile } from '@/utils/types/profile.interface';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
