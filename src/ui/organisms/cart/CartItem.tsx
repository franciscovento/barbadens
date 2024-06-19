import Counter from '@/ui/atoms/counter/Counter';
import SvgTrash from '@/ui/atoms/svgs/SvgTrash';
import { CartProductWithFabricDesignProfile } from '@/utils/types/cart.interface';
import { FC } from 'react';

interface Props {
  product: CartProductWithFabricDesignProfile;
  onChangueProductQuantity: (productId: any, quantity: number) => void;
  deleteItem: (productId: any) => void;
}

const CartItem: FC<Props> = ({
  product,
  deleteItem,
  onChangueProductQuantity,
}) => {
  return (
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
  );
};

export default CartItem;
