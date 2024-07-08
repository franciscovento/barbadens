'use server';

import { RegisterProps } from '@/services/api/supabase/authentication.services';
import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { createClient } from '@/utils/supabase/server';
import {
  CreateClientResponse,
  GetClientsResponse,
} from '@/utils/types/bsale/client.interface';

const createNewClient = async (client: RegisterProps) => {
  try {
    const { email, first_name, last_name, password } = client;
    const supabase = createClient();
    let clientId;
    const { data } = await bsaleApi.get<GetClientsResponse>(
      `/v1/clients.json?email=${client.email}`
    );
    if (data.items.length === 0) {
      const { data: newClient } = await bsaleApi.post<CreateClientResponse>(
        '/v1/clients.json',
        {
          firstName: client.first_name,
          lastName: client.last_name,
          email: client.email,
        }
      );
      clientId = newClient.id;
    } else {
      clientId = data.items[0].id;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
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

    return {
      data: authData,
      error: authError,
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error?.message || 'An error occurred. Please try again.',
      },
    };
  }
};

export { createNewClient };
