import { create } from 'zustand';

export type User = {
  id: string | null;
  email: string | null;
  type: 'client' | 'staff' | 'admin';
};

export type UserActions = {
  clearUserData: () => void;
};

export const useUser = create<User & UserActions>()((set) => ({
  id: null,
  email: null,
  type: 'client',
  clearUserData: () => set({ id: null, email: null, type: 'client' }),
}));
