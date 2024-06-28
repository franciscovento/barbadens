// import bsaleApi from '@/utils/axios.utils';

import { Checkout } from '@/app/(store)/checkout/formSchema';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const checkout = (await request.json()) as Checkout;
    const supabase = createClient();
    const { data, error } = await supabase.rpc('create_new_order', {
      checkout,
    });
    // const { data, error } = await supabase.rpc('create_order_checkout', {
    //   checkout_info: checkoutInfo,
    // });

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
