import Counter from '@/ui/atoms/counter/Counter';
import SvgTrash from '@/ui/atoms/svgs/SvgTrash';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import { CartProductWithFabricDesignProfile } from '@/utils/types/cart.interface';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  product: CartProductWithFabricDesignProfile;
  allowDelete?: boolean;
  onChangueProductQuantity: (productId: any, quantity: number) => void;
  deleteItem: (productId: any) => void;
}

const CartItem: FC<Props> = ({
  product,
  deleteItem,
  allowDelete = true,
  onChangueProductQuantity,
}) => {
  return (
    <div className="flex items-center justify-between  gap-4">
      <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap ">
        <Image
          className="border border-black"
          src={'/images/placeholder-image.jpg'}
          alt="imagen"
          width={70}
          height={70}
        />
        <div className="flex flex-col gap-1 text-left ">
          <p className="text-sm">{product.products.name}</p>
          <p className="text-xs text-app-text">
            {product.profiles.profile_name}
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
          {getCurrencyFormat(product.unit_price * product.quantity)}
        </span>
        {allowDelete && (
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
        )}
      </div>
    </div>
  );
};

export default CartItem;
