import { CartDetail, Checkout } from './types/bsale/checkout.interface';
import { CartProductWithFabricDesignProfile } from './types/cart.interface';

export type CheckoutInfo = Pick<
  Checkout,
  | 'code'
  | 'clientName'
  | 'clientLastName'
  | 'clientEmail'
  | 'clientPhone'
  | 'clientCountry'
  | 'clientState'
  | 'clientCityZone'
  | 'clientStreet'
  | 'clientPostcode'
  | 'clientBuildingNumber'
  | 'shippingCost'
  | 'withdrawStore'
  | 'ptId'
  | 'shippingComment'
  | 'pickCode'
  | 'pickName'
>;

export function generateCheckout(
  checkoutInfo: CheckoutInfo,
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
    marketId: 1,
    generateDocument: 1,
    pickStoreId: 1,
    payProcess: 'for_validate',
    documentData: {
      declareSii: 1,
      officeId: 1,
      emissionDate: Date.now(),
    },
    cartDetails,
    ...checkoutInfo,
  };
}
