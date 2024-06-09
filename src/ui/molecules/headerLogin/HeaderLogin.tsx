'use client';

import { getUser } from '@/services/api/supabase/authentication.services';
import { errorToast } from '@/services/modals/appModal';
import { useUser } from '@/stores/user/user.store';
import useAuth from '@/utils/hooks/useAuth.hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HeaderLogin = () => {
  const { email, setUserData, clearUserData } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logout();
    if (response.error) {
      errorToast(response.error.message);
    }
    router.refresh();
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await getUser();
      if (error) {
        clearUserData();
      } else {
        setUserData({
          email: data.user?.email,
          id: data.user?.id,
          type: data.user?.type,
          profiles: data.profiles,
        });
      }
    };
    checkAuth();
  }, [clearUserData, setUserData]);

  return (
    <div className="text-white text-right">
      {email ? (
        <>
          <p className="text-sm">Hola, {email}</p>
          <button onClick={handleLogout} className="text-sm underline">
            Cerrar sesión
          </button>
        </>
      ) : (
        <Link className="text-sm underline" href={'/auth'}>
          Iniciar sesión
        </Link>
      )}
    </div>
  );
};

export default HeaderLogin;
