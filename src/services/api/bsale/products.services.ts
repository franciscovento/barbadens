import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { FabricsResponse } from '@/utils/types/bsale/fabrics.interface';
import { WebDescriptionResponse } from '@/utils/types/webDescription.interface';

const getFabrics = async (queries?: string) => {
  const response = await bsaleApi.get<FabricsResponse>(
    `/v2/markets/1/products/market_info.json?collId=5&${queries || ''}`
  );
  return response.data;
};

const getWebDescription = async (product_id: number) => {
  const response = await bsaleApi.get<WebDescriptionResponse>(
    `/v2/products/list/market_info.json?&expand=[variantsInfo,variant.salePrice,variant.stock,images,descriptions]&priceListId=3&product_id=${product_id}`
  );
  return response.data;
};

export { getFabrics, getWebDescription };
