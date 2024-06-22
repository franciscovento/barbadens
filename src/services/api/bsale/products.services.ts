import bsaleApi from '@/utils/axios.utils';
import { FabricsResponse } from '@/utils/types/bsale/fabrics.interface';
import { ProductsResponse } from '@/utils/types/products.interface';

const getProducts = async (queries?: string) => {
  const response = await bsaleApi.get<ProductsResponse>(
    `/v1/products.json?${queries || ''}`
  );
  return response.data;
};

const getProduct = async (id: string) => {
  const response = await bsaleApi.get<ProductsResponse>(
    `/v1/products/${id}.json`
  );
  return response.data;
};

const getFabrics = async (queries?: string) => {
  const response = await bsaleApi.get<FabricsResponse>(
    `/v2/markets/1/products/market_info.json?collId=5&${queries || ''}`
  );
  return response.data;
};

// const createCheckout = async (checkout: Checkout) => {
//   const response = await bsaleApi.post('/v1/markets/checkout.json', checkout);
//   return response.data;
// };

export { getFabrics, getProduct, getProducts };
