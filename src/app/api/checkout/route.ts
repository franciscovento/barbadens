// import bsaleApi from '@/utils/axios.utils';

import { Checkout } from '@/app/(store)/checkout/formSchema';
import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { createClient } from '@/utils/supabase/server';
import { CreateCheckoutResponse } from '@/utils/types/bsale/checkout.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const checkout = (await request.json()) as Checkout;
    const supabase = createClient();

    const response = await bsaleApi.post<CreateCheckoutResponse>(
      '/v1/markets/checkout.json',
      checkout
    );
    const { data, error } = await supabase.rpc('create_new_order', {
      checkout: response.data.data,
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
