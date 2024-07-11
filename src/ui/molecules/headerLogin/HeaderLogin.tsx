'use client';
import { appModal, errorToast } from '@/services/modals/appModal';
import { appSidebar } from '@/services/sidebar/appSidebar';
import { useCartStore } from '@/stores/cart/cart.store';
import { useUser } from '@/stores/user/user.store';
import SgvCart from '@/ui/atoms/svgs/SgvCart';
import Cart from '@/ui/organisms/cart/Cart';
import useAuth from '@/utils/hooks/useAuth.hooks';
import useCart from '@/utils/hooks/useCart.hooks';
import { UserIcon } from '@heroicons/react/24/outline';
import {
  Badge,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from '../../../../routes';

const HeaderLogin = () => {
  const pathName = usePathname();
  const checkAuth = useUser((state) => state.checkAuth);
  const checkCart = useCartStore((state) => state.checkCart);
  const isAuthenticated = useUser((state) => state.isAuthenticated);
  const userName = useUser((state) => state.first_name);
  const { cart_products } = useCart();
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logout();
    if (response.error) {
      errorToast(response.error.message);
    }
    router.refresh();
    // router.push(routes.auth.login);
  };

  const redirectToCheckout = () => {
    appSidebar.close();
    router.push(routes.checkout.home);
  };

  const displayCart = () => {
    appSidebar.fire({
      html: (
        <Cart
          onCheckoutRedirect={() => redirectToCheckout()}
          onContinueShoppingRedirect={() => appModal.close()}
        />
      ),
      width: 'fit-content',
    });
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    checkCart();
  }, [checkCart]);

  return (
    <div className="text-white text-right">
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <div>
            <Menu>
              <MenuHandler>
                <UserIcon className="w-6  h-6 cursor-pointer" />
              </MenuHandler>
              <MenuList>
                <div className="px-3 pb-2 border-b border-app-background">
                  Hola, {userName}
                </div>
                <Link href={routes.account.orders}>
                  <MenuItem>Ver mis ordenes</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
          </div>
          {!pathName.includes('checkout') && (
            <Badge content={cart_products?.length}>
              <IconButton onClick={displayCart}>
                <SgvCart className="w-6 h-6" />
              </IconButton>
            </Badge>
          )}
        </div>
      ) : (
        <Link className="text-sm underline" href={routes.auth.login}>
          Iniciar sesión
        </Link>
      )}
    </div>
  );
};

export default HeaderLogin;
