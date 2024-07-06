import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { generateDocument } from '@/utils/generateDocument';
import { createClient } from '@/utils/supabase/server';
import { DocumentResponse } from '@/utils/types/bsale/document.interface';
import { GetDocumentWithDetailsResponse } from '@/utils/types/document.interface';
import { Order } from '@/utils/types/order.interface';
import axios from 'axios';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    const headersList = headers();
    const token = headersList.get('x-access-token');
    if (token !== process.env.API_ROUTE_SECRET) {
      return NextResponse.json(
        {
          error: {
            message: 'No authorized',
          },
        },
        { status: 404 }
      );
    }
    const supabase = createClient();
    const { data: order, error } = await supabase
      .rpc('read_order', {
        order_id: params.order_id,
      })
      .returns<Order>();

    if (error) {
      return NextResponse.json({
        data: null,
        error,
      });
    }

    if (order) {
      const response = await bsaleApi.get<GetDocumentWithDetailsResponse>(
        `/v1/documents/${order?.checkout_info.id_venta_documento_tributario}.json?expand=[details]`
      );
      const document = generateDocument(response.data, {
        order_id: order.id,
        payment_type_id: order.payment_type_id || 14,
      });

      const { data } = await bsaleApi.post<DocumentResponse>(
        '/v1/documents.json',
        document
      );
      return NextResponse.json({
        data,
        error: error,
      });
    }

    throw Error;
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: {
            message: JSON.stringify(error),
            hint: 'axios error',
          },
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        error: {
          message: error,
        },
      },
      {
        status: 500,
      }
    );
  }
}
