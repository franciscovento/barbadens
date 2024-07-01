import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { createClient } from '@/utils/supabase/server';
import { DocumentResponse } from '@/utils/types/bsale/document.interface';
import { CompanyUsers } from '@/utils/types/companyUsers.interface';
import { ApiResponse } from '@/utils/types/response.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // !! TODO: IMPROVE PERMISSIONS CHECKOUT FOR UPDATE
    const supabase = createClient();
    const { data: companyUser, error: companyUserError } = await supabase
      .from('company_users')
      .select('*')
      .returns<CompanyUsers[]>();

    if (companyUserError) {
      return NextResponse.json({
        data: null,
        error: companyUserError,
      });
    }

    if (companyUser.length == 0 || companyUser[0].rol == 'normal') {
      return NextResponse.json({
        data: null,
        error: {
          message: 'Not enough permissions',
        },
      });
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
