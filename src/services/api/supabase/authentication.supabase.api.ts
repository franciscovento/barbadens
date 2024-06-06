import { Profile, User } from '@/stores/user/user.store';
import { createClient } from '@/utils/supabase/client';
import { AuthError, PostgrestError } from '@supabase/supabase-js';
import axios from 'axios';

export interface LoginProps {
  email: string;
  password: string;
}

const supabase = createClient();

export const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const logout = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const signUpWithEmail = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/verify-email',
      data: {
        type: 'client',
      },
    },
  });
  return { data, error };
};

export const getUser = async () => {
  const { data } = await axios.get<{
    data: { user: User; profiles: Profile[] };
    error: PostgrestError;
  }>('/api/user');

  return {
    ...data,
  };
};
