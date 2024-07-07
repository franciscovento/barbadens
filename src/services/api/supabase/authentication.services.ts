import { createClient } from '@/utils/supabase/client';
import { AuthError } from '@supabase/supabase-js';

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
  try {
    const { data: authUser, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) throw authError;

    const user = {
      email: authUser.user?.email,
      id: authUser.user?.id,
      first_name: authUser.user?.user_metadata.first_name,
      last_name: authUser.user?.user_metadata.last_name,
    };

    return {
      data: {
        user,
      },
      error: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        data: null,
        error: error,
      };
    }
    return {
      data: null,
      error: {
        message: 'An error occurred. Please try again.',
      },
    };
  }
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
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const user = {
      email: userData.user.email,
      id: userData.user.id,
      first_name: userData.user.user_metadata.first_name,
      last_name: userData.user.user_metadata.last_name,
    };

    return {
      data: {
        user,
      },
      error: null,
    };
  } catch (error) {
    return { error: error, data: null };
  }
};

export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return false;
  }
  return data.user ? true : false;
};
