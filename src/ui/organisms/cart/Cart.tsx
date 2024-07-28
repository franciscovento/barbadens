import { useCartStore } from '@/stores/cart/cart.store';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import useCart from '@/utils/hooks/useCart.hooks';
import { Button } from '@material-tailwind/react';
import { FC } from 'react';
import CartItem from './CartItem';

interface Props {
  onCheckoutRedirect: () => void;
  onContinueShoppingRedirect: () => void;
}

const Cart: FC<Props> = ({
  onCheckoutRedirect,
  onContinueShoppingRedirect,
}) => {
  const { cart_products, total } = useCart();

  const deleteItem = useCartStore((state) => state.deleteItem);
  const onChangueProductQuantity = useCartStore(
    (state) => state.onChangueProductQuantity
  );

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col justify-between">
      <div>
        <StepTitle title="Carrito" />
        <div className="flex flex-col gap-4 py-8 w-[400px] max-w-full">
          {cart_products?.length === 0 && (
            <p className="text-center">No hay productos en el carrito...</p>
          )}
          {cart_products?.map((product, index) => (
            <CartItem
              key={index}
              deleteItem={deleteItem}
              onChangueProductQuantity={onChangueProductQuantity}
              product={product}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between pb-3">
          Total: <span className="font-bold">S/.{total} PEN</span>
        </div>
        <Button onClick={onContinueShoppingRedirect} variant="outlined">
          Agregar más productos
        </Button>
        {cart_products && cart_products?.length > 0 && (
          <Button onClick={onCheckoutRedirect}>Ir al Checkout</Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
