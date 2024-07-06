import { getUser } from '@/services/api/supabase/authentication.services';
import { create } from 'zustand';

export type User = {
  isAuthenticated: boolean;
  id: string | undefined;
  email: string | undefined;
  type: UserRoles;
};

export type UserRoles = 'client' | 'staff' | 'admin';

export type UserActions = {
  setUserData: (data: User) => void;
  clearUserData: () => void;
  checkAuth: () => void;
};

const initialState: User = {
  id: undefined,
  isAuthenticated: false,
  email: undefined,
  type: 'client',
};

export const useUser = create<User & UserActions>()((set, get) => ({
  ...initialState,
  clearUserData: () =>
    set({
      id: undefined,
      email: undefined,
      type: 'client',
      isAuthenticated: false,
    }),
  setUserData: (data) =>
    set({
      id: data.id,
      email: data.email,
      type: data.type,
      isAuthenticated: data.isAuthenticated,
    }),
  checkAuth: async () => {
    const { data, error } = await getUser();
    if (error) {
      get().clearUserData();
    } else {
      set({
        id: data.user?.id,
        email: data.user?.email,
        type: data.user?.type,
        isAuthenticated: true,
      });
    }
  },
}));
