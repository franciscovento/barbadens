import {
  Checkout,
  CreateCheckoutResponse,
} from '@/utils/types/bsale/checkout.interface';
import { GetCheckoutResponse } from '@/utils/types/bsale/checkoutResponse.interface';

import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function createCheckout(checkout: Checkout) {
  const response = await axios.post<ApiResponse<CreateCheckoutResponse>>(
    '/api/checkout',
    checkout
  );
  return {
    data: response.data.data,
    error: response.data.error,
  };
}

async function getCheckoutByToken(
  token: string
): Promise<ApiResponse<GetCheckoutResponse>> {
  try {
    const {
      data: { data, error },
    } = await axios.get<ApiResponse<GetCheckoutResponse>>(
      `${BASE_URL}/api/checkout/${token}/`
    );

    if (error) {
      return {
        data: null,
        error,
      };
    }
    return {
      data,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        error: {
          message: error.message,
          code: error.code,
        },
      };
    }
    return {
      data: null,
      error: {
        message: 'Internal server error',
        code: '500',
      },
    };
  }
}

export { createCheckout, getCheckoutByToken };
