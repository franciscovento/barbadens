import {
  Checkout,
  CheckoutResponse,
} from '@/utils/types/bsale/checkout.interface';
import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

async function getCheckoutByToken(token: string) {
  try {
    const {
      data: { data, error },
    } = await axios.get<ApiResponse<CheckoutResponse>>(
      `${BASE_URL}/api/checkout/${token}/`
    );
    return {
      data,
      error,
    };
  } catch (error) {
    console.log(error);
  }
}

export { createCheckout, getCheckoutByToken };
