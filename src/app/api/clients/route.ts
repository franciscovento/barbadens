import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { createClient } from '@/utils/supabase/server';
import {
  CreateClientResponse,
  GetClientsResponse,
} from '@/utils/types/bsale/client.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, first_name, last_name, password } = await req.json();
    const supabase = createClient();
    let clientId;
    const { data } = await bsaleApi.get<GetClientsResponse>(
      `/v1/clients.json?email=${email}`
    );
    if (data.items.length === 0) {
      const { data: newClient } = await bsaleApi.post<CreateClientResponse>(
        '/v1/clients.json',
        {
          firstName: first_name,
          lastName: last_name,
          email: email,
        }
      );
      clientId = newClient.id;
    } else {
      clientId = data.items[0].id;
    }

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`,
        data: {
          first_name,
          last_name,
          client_id: clientId,
        },
      },
    });

    if (authError) throw authError;

    return NextResponse.json({
      data: {
        message: 'User created, please confirm your email to continue',
      },
      error: null,
    });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      error: {
        message: error?.message || 'An error occurred. Please try again.',
      },
    });
  }
}
