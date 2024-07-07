import { User } from '@/stores/user/user.store';
import { createClient } from '@/utils/supabase/client';
import { AuthError, PostgrestError } from '@supabase/supabase-js';
import axios from 'axios';

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const supabase = createClient();

export const login = async ({ email, password }: LoginProps) => {
  const { data } = await axios.post<{
    data: { user: User };
    error: PostgrestError;
  }>('/api/auth', { email, password });

  return {
    ...data,
  };
};

export const logout = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const signUpWithEmail = async ({
  email,
  password,
  first_name,
  last_name,
}: RegisterProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`,
      data: {
        first_name,
        last_name,
      },
    },
  });
  return { data, error };
};

export const getUser = async () => {
  const { data } = await axios.get<{
    data: { user: User };
    error: PostgrestError;
  }>('/api/user');

  return {
    ...data,
  };
};

export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return false;
  }
  return data.user ? true : false;
};
