import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { GetClientsResponse } from '@/utils/types/bsale/client.interface';

async function checkIfClientExist(email: string) {
  try {
    const { data } = await bsaleApi.get<GetClientsResponse>(
      `/v1/clients.json?email=${email}`
    );
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export { checkIfClientExist };
