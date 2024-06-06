import {
  LoginProps,
  login as loginSupabase,
  logout as logoutSupabase,
  signUpWithEmail as signUpWithEmailSupabase,
} from '@/services/api/supabase/authentication.supabase.api';
import { useMeasures } from '@/stores';
import { UserRoles, useUser } from '@/stores/user/user.store';

interface AuthProps {
  data: LoginProps;
}

const useAuth = () => {
  const { setUserData, clearUserData } = useUser();
  const { resetMeasuresStore } = useMeasures();

  const login = async ({ data }: AuthProps) => {
    const { data: authData, error: authError } = await loginSupabase(data);
    if (authError) {
      return {
        data: null,
        error: authError,
      };
    }

    setUserData({
      email: authData.user.email,
      id: authData.user.id,
      type: authData.user.id as UserRoles,
      profiles: authData.profiles,
    });

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
    resetMeasuresStore();

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
