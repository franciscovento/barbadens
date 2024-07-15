import { createClient } from '@/utils/supabase/server';
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
      .rpc('changue_order_status', {
        order_id: params.order_id,
        order_status: 'shipped',
      })
      .returns<Order>();

    if (error) {
      return NextResponse.json({
        data: null,
        error,
      });
    }

    return NextResponse.json({
      data: order,
      error: error,
    });

    // if (order) {
    //   const response = await bsaleApi.get<GetDocumentWithDetailsResponse>(
    //     `/v1/documents/${order?.checkout_info.id_venta_documento_tributario}.json?expand=[details]`
    //   );
    //   const document = generateDocument(response.data, {
    //     payment_type_id: order.payment_type_id || 14,
    //   });

    //   const { data } = await bsaleApi.post<DocumentResponse>(
    //     '/v1/documents.json',
    //     document
    //   );
    //   return NextResponse.json({
    //     data,
    //     error: error,
    //   });
    // }

    // throw Error;
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
