import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { FabricsResponse } from '@/utils/types/bsale/fabrics.interface';

const getFabrics = async (queries?: string) => {
  const response = await bsaleApi.get<FabricsResponse>(
    `/v2/markets/1/products/market_info.json?collId=5&${queries || ''}`
  );
  return response.data;
};

export { getFabrics };
