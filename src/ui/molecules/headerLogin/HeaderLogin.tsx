'use client';

import { errorToast } from '@/services/modals/appModal';
import { useUser } from '@/stores/user/user.store';
import useAuth from '@/utils/hooks/useAuth.hooks';
import Link from 'next/link';

const HeaderLogin = () => {
  const { email } = useUser();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const response = await logout();
    if (response.error) {
      errorToast(response.error.message);
    }
  };

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
