import { getUser } from '@/services/api/supabase/authentication.services';
import { create } from 'zustand';

export type User = {
  isAuthenticated: boolean;
  id: string | undefined;
  email: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  client_id: string | undefined;
};

export type UserActions = {
  setUserData: (data: User) => void;
  clearUserData: () => void;
  checkAuth: () => void;
};

const initialState: User = {
  id: undefined,
  isAuthenticated: false,
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  client_id: undefined,
};

export const useUser = create<User & UserActions>()((set, get) => ({
  ...initialState,
  clearUserData: () =>
    set({
      id: undefined,
      email: undefined,
      first_name: undefined,
      last_name: undefined,
      isAuthenticated: false,
      client_id: undefined,
    }),
  setUserData: (data) =>
    set({
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      isAuthenticated: data.isAuthenticated,
      client_id: data.client_id,
    }),
  checkAuth: async () => {
    const { data, error } = await getUser();
    if (error) {
      get().clearUserData();
    } else {
      set({
        id: data?.user?.id,
        email: data?.user?.email,
        first_name: data?.user.first_name,
        last_name: data?.user.last_name,
        client_id: data?.user.client_id,
        isAuthenticated: true,
      });
    }
  },
}));
