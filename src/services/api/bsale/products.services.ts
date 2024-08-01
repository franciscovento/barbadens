import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { FabricsResponse } from '@/utils/types/bsale/fabrics.interface';
import { WebDescriptionResponse } from '@/utils/types/webDescription.interface';
import { COLLECTION_FABRIC_ID, PRICE_LIST_ID } from '../../../../constants';

const getFabrics = async (queries?: string) => {
  const response = await bsaleApi.get<FabricsResponse>(
    `/v2/markets/1/products/market_info.json?collId=${COLLECTION_FABRIC_ID}&${queries || ''}`
  );
  console.log(response.data);

  return response.data;
};

const getWebDescription = async (product_id: number) => {
  const response = await bsaleApi.get<WebDescriptionResponse>(
    `/v2/products/list/market_info.json?&expand=[variantsInfo,variant.salePrice,variant.stock,images,descriptions]&priceListId=${PRICE_LIST_ID}&product_id=${product_id}`
  );
  return response.data;
};

export { getFabrics, getWebDescription };
