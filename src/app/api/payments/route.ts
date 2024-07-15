import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { generateDocument } from '@/utils/generateDocument';
import mpClient from '@/utils/mercadopago/server';
import { isRequestFromMercadoPago } from '@/utils/mercadopago/verify';
import { createClient } from '@/utils/supabase/server';
import { DocumentResponse } from '@/utils/types/bsale/document.interface';
import { GetDocumentWithDetailsResponse } from '@/utils/types/document.interface';
import { Order } from '@/utils/types/order.interface';
import { Payment } from 'mercadopago';
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
export async function POST(req: NextRequest) {
  try {
    const headersList = headers();
    const body = (await req.json()) as MpHookResponse;
    const { searchParams } = new URL(req.url);
    const order_id = searchParams.get('order');
    const xSignature = headersList.get('x-signature') || '';
    const xRequestId = headersList.get('x-request-id') || '';

    if (isRequestFromMercadoPago(xSignature, xRequestId, body.data.id)) {
      const payment = await new Payment(client).get({ id: body.data.id });
      const supabase = createClient();

      if (payment.status === 'approved') {
        const { data: order, error } = await supabase
          .rpc('set_order_to_confirmed', {
            order_id: order_id,
          })
          .returns<Order>();

        if (error) {
          throw new Error('Error setting order to confirmed');
        }

        if (order) {
          const response = await bsaleApi.get<GetDocumentWithDetailsResponse>(
            `/v1/documents/${order?.checkout_info.id_venta_documento_tributario}.json?expand=[details]`
          );
          const document = generateDocument(response.data, {
            payment_type_id: order.payment_type_id || 14,
          });

          await bsaleApi.post<DocumentResponse>('/v1/documents.json', document);
          return NextResponse.json({
            message: 'success',
          });
        }
      }
    } else {
      throw new Error('Unauthorized');
    }
    return NextResponse.json({
      message: 'success',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
      },
      { status: 500 }
    );
  }
}
