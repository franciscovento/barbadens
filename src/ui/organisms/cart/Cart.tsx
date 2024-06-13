import {
  deleteProductFromCart,
  updatedQuantityFromProductCart,
} from '@/services/api/supabase/cart.services';
import { appSidebar } from '@/services/sidebar/appSidebar';
import { useCartStore } from '@/stores/cart/cart.store';
import Counter from '@/ui/atoms/counter/Counter';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import SvgTrash from '@/ui/atoms/svgs/SvgTrash';
import useCart from '@/utils/hooks/useCart.hooks';
import { CartProductId } from '@/utils/types/cart.interface';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';

const Cart = () => {
  const { cart_products, total } = useCart();
  const checkCart = useCartStore((state) => state.checkCart);

  const onChangueProductQuantity = async (
    productId: CartProductId,
    quantity: number
  ) => {
    const { data, error } = await updatedQuantityFromProductCart(
      productId,
      quantity
    );
    console.log(data, error);

    if (!error) {
      checkCart();
    } else {
      alert('Ocurrió un error al actualizar la cantidad del producto');
    }
  };

  const deleteItem = async (productId: CartProductId) => {
    const { error } = await deleteProductFromCart(productId);
    if (!error) {
      checkCart();
    } else {
      alert('Ocurrió un error al eliminar el producto');
    }
  };

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col justify-between">
      <div>
        <StepTitle title="Carrito" />
        <div className="flex flex-col gap-4 py-8 w-[400px] max-w-full">
          {cart_products?.length === 0 && (
            <p className="text-center">No hay productos en el carrito...</p>
          )}
          {cart_products?.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between  gap-4"
            >
              <div className="flex items-center gap-4  flex-wrap">
                <Image
                  className="border border-black"
                  src={'/images/placeholder-image.jpg'}
                  alt="imagen"
                  width={70}
                  height={70}
                />
                <div className="flex flex-col gap-1 text-left ">
                  <p className="text-sm">{product.products.fabrics.name}</p>
                  <p className="text-xs text-app-text">
                    Perfil: {product.profiles.profile_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Counter
                  value={product.quantity}
                  onChangueValue={(value) =>
                    onChangueProductQuantity(
                      {
                        cart_id: product.cart_id,
                        design_id: product.design_id,
                        fabric_id: product.fabric_id,
                        profile_id: product.profile_id,
                      },
                      value
                    )
                  }
                />
                <span className="text-sm text-nowrap">
                  S/.{product.unit_price * product.quantity}
                </span>
                <SvgTrash
                  className="cursor-pointer duration-300 hover:text-red-700"
                  width={20}
                  height={20}
                  onClick={() =>
                    deleteItem({
                      cart_id: product.cart_id,
                      design_id: product.design_id,
                      fabric_id: product.fabric_id,
                      profile_id: product.profile_id,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between pb-3">
          Total: <span className="font-bold">S/.{total} PEN</span>
        </div>
        <Button onClick={() => appSidebar.close()} variant="outlined">
          Continuar comprando
        </Button>
        <Button disabled={cart_products?.length === 0}>Ir al Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
