import {
  Checkout,
  FormCheckoutSchema,
} from '@/app/(store)/checkout/formSchema';
import { CartDetail } from './types/bsale/checkout.interface';
import { CartProductWithFabricDesignProfile } from './types/cart.interface';

export function generateCheckout(
  checkoutInfo: FormCheckoutSchema,
  cartProducts: CartProductWithFabricDesignProfile[],
  clientId: number
): Checkout {
  let cartDetails: CartDetail[] = [];

  cartProducts.forEach((product) => {
    cartDetails.push({
      idVarianteProducto: product.fabric_id,
      grossUnitValue: product.unit_price,
      quantity: product.quantity,
    });
  });

  let date = new Date();
  let mls = date.getTime();
  let ms = Math.floor(mls / 1000);

  return {
    documentData: {
      clientId,
      declareSii: 1,
      officeId: 1,
      emissionDate: ms,
    },
    cartDetails,
    ...checkoutInfo,
  };
}
