import bsaleApi from '@/utils/axios.utils';
import { GetCheckoutResponse } from '@/utils/types/bsale/checkoutResponse.interface';

import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  id: string;
};
export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    const token = context.params.id;

    const response = await bsaleApi.get<GetCheckoutResponse>(
      `/v2/token/checkout/${token}.json?expand=[cartDetails]`
    );
    return NextResponse.json<ApiResponse<GetCheckoutResponse>>({
      data: response.data,
      error: null,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json<ApiResponse<GetCheckoutResponse>>({
        data: null,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    } else {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: 'Internal server error',
          },
        },
        { status: 500 }
      );
    }
  }
}
