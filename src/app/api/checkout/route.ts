// import bsaleApi from '@/utils/axios.utils';

import { createClient } from '@/utils/supabase/server';
import { CheckoutInfo } from '@/utils/types/order.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const checkoutInfo = (await request.json()) as CheckoutInfo;
    const supabase = createClient();
    const { data, error } = await supabase.rpc('create_order_checkout', {
      checkout_info: checkoutInfo,
    });

    return NextResponse.json({
      data,
      error,
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
