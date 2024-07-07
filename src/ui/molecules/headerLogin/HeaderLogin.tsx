'use client';

import { errorToast } from '@/services/modals/appModal';
import { appSidebar } from '@/services/sidebar/appSidebar';
import { useCartStore } from '@/stores/cart/cart.store';
import { useUser } from '@/stores/user/user.store';
import SgvCart from '@/ui/atoms/svgs/SgvCart';
import Cart from '@/ui/organisms/cart/Cart';
import useAuth from '@/utils/hooks/useAuth.hooks';
import useCart from '@/utils/hooks/useCart.hooks';
import { Badge, IconButton } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HeaderLogin = () => {
  const path = usePathname();
  const checkAuth = useUser((state) => state.checkAuth);
  const checkCart = useCartStore((state) => state.checkCart);
  const userFirstName = useUser((state) => state.first_name);
  const { cart_products } = useCart();
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logout();
    if (response.error) {
      errorToast(response.error.message);
    }
    router.refresh();
    router.push('/auth');
  };

  const redirectToCheckout = () => {
    appSidebar.close();
    router.push('/checkout');
  };

  const displayCart = () => {
    appSidebar.fire({
      html: <Cart onCheckoutRedirect={() => redirectToCheckout()} />,
      width: 'fit-content',
    });
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    checkCart();
  }, [checkCart]);

  return !path.includes('checkout') ? (
    <div className="text-white text-right">
      {userFirstName ? (
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm">
              Hola, <span className="capitalize">{userFirstName}</span>
            </p>
            <button onClick={handleLogout} className="text-sm underline">
              Cerrar sesión
            </button>
          </div>
          <Badge content={cart_products?.length}>
            <IconButton onClick={displayCart}>
              <SgvCart className="w-6 h-6" />
            </IconButton>
          </Badge>
        </div>
      ) : (
        <Link className="text-sm underline" href={'/auth'}>
          Iniciar sesión
        </Link>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default HeaderLogin;
