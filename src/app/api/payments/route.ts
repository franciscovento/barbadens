import mpClient from '@/utils/mercadopago/server';
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
export async function POST(req: NextRequest, config: any) {
  try {
    console.log({ config });

    const searchParams = req.url;
    console.log({ searchParams });

    const headersList = headers();
    const body = (await req.json()) as MpHookResponse;
    console.log(body);
    // console.log(headersList);
    const payment = await new Payment(client).get({ id: body.data.id });
    console.log(payment);
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: 'success',
    });
  }

  return NextResponse.json({
    message: 'success',
  });
}
