import {
  LoginProps,
  login as loginSupabase,
  logout as logoutSupabase,
  signUpWithEmail as signUpWithEmailSupabase,
} from '@/services/api/supabase/authentication.supabase.api';
import { useUser } from '@/stores/user/user.store';

interface AuthProps {
  data: LoginProps;
}

const useAuth = () => {
  const { setUserData, clearUserData } = useUser();

  const login = async ({ data }: AuthProps) => {
    const { data: authData, error } = await loginSupabase(data);
    if (error) {
      return {
        data: null,
        error: error,
      };
    }
    if (authData.user) {
      const {
        id,
        email,
        user_metadata: { type },
      } = authData.user;
      setUserData({
        email,
        id,
        type,
      });
    }
    return {
      data: authData,
      error: null,
    };
  };

  const logout = async () => {
    const { error } = await logoutSupabase();
    if (error) {
      return {
        data: null,
        error: error,
      };
    }
    clearUserData();

    return {
      data: {
        message: 'Logged out successfully.',
      },
      error: null,
    };
  };

  const signUp = async (data: LoginProps) => {
    const { data: authData, error } = await signUpWithEmailSupabase(data);
    return {
      data: authData,
      error: error,
    };
  };

  return {
    login,
    logout,
    signUp,
  };
};

export default useAuth;
