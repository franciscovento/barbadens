import Counter from '@/ui/atoms/counter/Counter';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import SvgTrash from '@/ui/atoms/svgs/SvgTrash';
import useCart from '@/utils/hooks/useCart.hooks';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';

type CartProductId = {
  cart_id: number;
  design_id: number;
  fabric_id: number;
  profile_id: string;
};

const Cart = () => {
  const { cart_products, total } = useCart();

  const incrementQuantity = (productId: CartProductId) => {
    console.log(productId);
  };
  const decrementQuantity = (productId: CartProductId) => {
    console.log(productId);
  };

  const deleteItem = (productId: CartProductId) => {
    console.log(productId);
  };

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col justify-between">
      <div>
        <StepTitle title="Carrito" />
        <div className="flex flex-col gap-4 py-8">
          {cart_products?.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4 shrink-0">
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
                  increment={() =>
                    incrementQuantity({
                      cart_id: product.cart_id,
                      design_id: product.design_id,
                      fabric_id: product.fabric_id,
                      profile_id: product.profile_id,
                    })
                  }
                  decrement={() =>
                    decrementQuantity({
                      cart_id: product.cart_id,
                      design_id: product.design_id,
                      fabric_id: product.fabric_id,
                      profile_id: product.profile_id,
                    })
                  }
                />
                <span className="text-sm">
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
        <Button variant="outlined">Continuar comprando</Button>
        <Button>Ir la Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
