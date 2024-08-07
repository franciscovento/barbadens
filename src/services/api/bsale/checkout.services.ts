import { Checkout } from '@/app/(store)/checkout/formSchema';
import { Order } from '@/utils/types/order.interface';

import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';
import { routes } from '../../../../routes';

async function createCheckout(checkout: Checkout) {
  const response = await axios.post<ApiResponse<Order>>(
    routes.api.checkout,
    checkout
  );
  return {
    data: response.data.data,
    error: response.data.error,
  };
}

export { createCheckout };
