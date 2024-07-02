import { User } from '@/utils/types/user.interface';
import { InsertPayload } from '@/utils/types/webhook.interface';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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
    const body = (await req.json()) as InsertPayload<User>;
    console.log(body);

    return NextResponse.json({
      body,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: "Couldn't create an client on bsale",
        },
      },
      { status: 500 }
    );
  }
}
