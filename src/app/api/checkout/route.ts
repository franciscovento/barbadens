// import bsaleApi from '@/utils/axios.utils';

import {
  Checkout,
  CheckoutResponse,
} from '@/utils/types/bsale/checkout.interface';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const checkoutInfo = (await request.json()) as Checkout;
    const response = await axios.post<CheckoutResponse>(
      'https://api.bsale.io/v1/markets/checkout.json',
      checkoutInfo,
      {
        headers: {
          access_token: '647ed4627e9ad1ab38b287e934e62dd64520960c',
        },
        withCredentials: true,
      }
    );
    return NextResponse.json({
      data: response.data.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json({ error: error, data: null });
  }
}
