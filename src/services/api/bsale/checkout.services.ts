import { Checkout } from '@/utils/types/bsale/checkout.interface';
import { Order } from '@/utils/types/order.interface';

import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';

async function createCheckout(checkout: Checkout) {
  const response = await axios.post<ApiResponse<Order>>(
    '/api/checkout',
    checkout
  );
  return {
    data: response.data.data,
    error: response.data.error,
  };
}

export { createCheckout };
