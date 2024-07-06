import {
  LoginProps,
  login as loginSupabase,
  logout as logoutSupabase,
  signUpWithEmail as signUpWithEmailSupabase,
} from '@/services/api/supabase/authentication.services';
import { useCartStore } from '@/stores/cart/cart.store';
import { useUser } from '@/stores/user/user.store';

interface AuthProps {
  data: LoginProps;
}

const useAuth = () => {
  const checkCart = useCartStore((state) => state.checkCart);
  const emptyCart = useCartStore((state) => state.emptyCart);
  const { setUserData, clearUserData } = useUser();

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
      type: authData.user.type,
      isAuthenticated: true,
    });

    checkCart();

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
    emptyCart();

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
