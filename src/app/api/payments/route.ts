import mpClient from '@/utils/mercadopago/server';
import { isRequestFromMercadoPago } from '@/utils/mercadopago/verify';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface MpHookResponse {
  action: string;
  api_version: string;
  data: { id: string };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
}

const client = mpClient();
export async function POST(req: NextRequest, config: any) {
  try {
    const headersList = headers();
    const body = (await req.json()) as MpHookResponse;
    const { searchParams } = new URL(req.url);
    const order_id = searchParams.get('order');
    const xSignature = headersList.get('x-signature') || '';
    const xRequestId = headersList.get('x-request-id') || '';

    if (isRequestFromMercadoPago(xSignature, xRequestId, body.data.id)) {
      console.log('es de mercadopago', { order_id });

      // const payment = await new Payment(client).get({ id: body.data.id });

      console.log('payment', body);
    } else {
      console.log('no es de mercadopago');
    }
    return NextResponse.json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: 'error',
      },
      { status: 200 }
    );
  }
}
