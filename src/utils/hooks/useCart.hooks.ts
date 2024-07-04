import { useCartStore } from '@/stores/cart/cart.store';

const useCart = () => {
  const id = useCartStore((state) => state.id);
  const total = useCartStore((state) => state.total);
  const cart_products = useCartStore((state) => state.cart_products);
  const user_id = useCartStore((state) => state.user_id);

  return {
    id,
    total,
    cart_products,
    user_id,
  };
};

export default useCart;
