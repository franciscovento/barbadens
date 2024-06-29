import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { createClient } from '@/utils/supabase/server';
import { DocumentResponse } from '@/utils/types/bsale/document.interface';
import { ApiResponse } from '@/utils/types/response.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json<ApiResponse<DocumentResponse>>(
        {
          data: null,
          error: {
            message: 'Not authorized',
            code: '401',
          },
        },
        {
          status: 401,
        }
      );
    }
    const body = (await req.json()) as { data: Document; order_id: number };

    const response = await bsaleApi.post<DocumentResponse>(
      '/v1/documents.json',
      body.data
    );
    const { data } = response;
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({
        status: 'confirmed',
        document_url: data.urlPublicView,
      })
      .eq('id', body.order_id)
      .select('*');

    if (orderError) {
      return NextResponse.json(
        {
          data: order,
          error: orderError,
        },
        { status: 400 }
      );
    }

    // supabase.from('orders')

    return NextResponse.json(
      {
        data,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json<ApiResponse<DocumentResponse>>(
      {
        data: null,
        error: {
          message: 'Internal server error',
          hint: 'bsale api not responding',
        },
      },
      { status: 500 }
    );
  }
}
