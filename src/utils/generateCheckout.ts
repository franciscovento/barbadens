import {
  Checkout,
  FormCheckoutSchema,
} from '@/app/(store)/checkout/formSchema';
import { CartDetail } from './types/bsale/checkout.interface';
import { CartProductWithFabricDesignProfile } from './types/cart.interface';

export function generateCheckout(
  checkoutInfo: FormCheckoutSchema,
  cartProducts: CartProductWithFabricDesignProfile[]
): Checkout {
  let cartDetails: CartDetail[] = [];

  cartProducts.forEach((product) => {
    cartDetails.push({
      idVarianteProducto: product.fabric_id,
      grossUnitValue: product.unit_price,
      quantity: product.quantity,
    });
  });

  return {
    cartDetails,
    ...checkoutInfo,
  };
}
