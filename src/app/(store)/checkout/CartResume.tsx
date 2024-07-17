'use client';
import { useCartStore } from '@/stores/cart/cart.store';
import CartItem from '@/ui/organisms/cart/CartItem';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import useCart from '@/utils/hooks/useCart.hooks';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

interface Props {
  shippingCost: number;
}
const CartResume: FC<Props> = ({ shippingCost }) => {
  const { cart_products, total = 0, isLoading } = useCart();
  const deleteItem = useCartStore((state) => state.deleteItem);
  const onChangueProductQuantity = useCartStore(
    (state) => state.onChangueProductQuantity
  );

  return (
    <div className=" bg-app-background p-8 relative">
      <h3 className="text-xl font-medium">Resumen de compra</h3>
      <div className="py-4 flex flex-col gap-4">
        {cart_products?.map((product) => (
          <CartItem
            key={product.design_id + product.fabric_id + product.profile_id}
            product={product}
            deleteItem={deleteItem}
            onChangueProductQuantity={onChangueProductQuantity}
            allowDelete={false}
          />
        ))}
        <div className="py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>Subtotal:</div>
            <div className="text-center">{getCurrencyFormat(total)}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Shipping</div>
            <div className="text-center">{getCurrencyFormat(shippingCost)}</div>
          </div>
          <hr className="col-span-full border border-b my-2 border-black/5 " />
          <div className="flex items-center justify-between">
            <div>Total</div>
            <div className="text-center">
              {getCurrencyFormat(total + shippingCost)}
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 bg-black/10 flex items-center justify-center">
          <ArrowPathIcon
            width={60}
            height={60}
            color="black"
            className="animate-spin"
          />
        </div>
      )}
    </div>
  );
};

export default CartResume;
