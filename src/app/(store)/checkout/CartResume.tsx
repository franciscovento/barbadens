'use client';
import { useCartStore } from '@/stores/cart/cart.store';
import CartItem from '@/ui/organisms/cart/CartItem';
import useCart from '@/utils/hooks/useCart.hooks';

const CartResume = () => {
  const { cart_products, total } = useCart();
  const deleteItem = useCartStore((state) => state.deleteItem);
  const onChangueProductQuantity = useCartStore(
    (state) => state.onChangueProductQuantity
  );

  return (
    <div className=" bg-app-background p-8">
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
            <div className="text-center">${total}.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Shipping</div>
            <div className="text-center">$20.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Tax</div>
            <div className="text-center">$1.00</div>
          </div>
          <hr className="col-span-full border border-b my-2 border-black/5 " />
          <div className="flex items-center justify-between">
            <div>Total</div>
            <div className="text-center">${total}.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartResume;
