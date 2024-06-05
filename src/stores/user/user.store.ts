import { create } from 'zustand';

export type User = {
  id: string | undefined;
  email: string | undefined;
  type: UserRoles;
};

export type UserRoles = 'client' | 'staff' | 'admin';

export type UserActions = {
  setUserData: (data: User) => void;
  clearUserData: () => void;
};

export const useUser = create<User & UserActions>()((set) => ({
  id: undefined,
  email: undefined,
  type: 'client',
  setUserData: (data) =>
    set({ id: data.id, email: data.email, type: data.type }),
  clearUserData: () => set({ id: undefined, email: undefined, type: 'client' }),
}));
