// import bsaleApi from '@/utils/axios.utils';

import bsaleApi from '@/utils/axios.utils';
import { createClient } from '@/utils/supabase/server';
import {
  Checkout,
  CheckoutResponse,
} from '@/utils/types/bsale/checkout.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const checkoutInfo = (await request.json()) as Checkout;
    const response = await bsaleApi.post<CheckoutResponse>(
      '/v1/markets/checkout.json',
      checkoutInfo
    );

    const supabase = createClient();
    const { error } = await supabase.rpc('create_order', {
      token: response.data.data.token,
    });

    if (error) {
      return NextResponse.json({
        data: null,
        error: error,
      });
    }

    return NextResponse.json({
      data: response.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message:
            'No se pudo procesar el pedido. Inténtalo nuevamente más tarde',
        },
        data: null,
      },
      { status: 500 }
    );
  }
}
