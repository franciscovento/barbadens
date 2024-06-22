'use server';
import { createCheckout } from '@/services/api/bsale/products.services';
import { checkoutMock } from '@/utils/data/mocks/checkout.mock';

export async function createNewCheckout() {
  const data = await createCheckout(checkoutMock);
  console.log(data);

  return data;
}
