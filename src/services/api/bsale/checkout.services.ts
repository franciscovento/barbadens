import {
  Checkout,
  CheckoutResponse,
} from '@/utils/types/bsale/checkout.interface';
import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';

async function createCheckout(checkout: Checkout) {
  const response = await axios.post<ApiResponse<CheckoutResponse>>(
    '/api/checkout',
    checkout
  );
  return {
    data: response.data.data,
    error: response.data.error,
  };
}

export { createCheckout };
