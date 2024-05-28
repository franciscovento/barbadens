import bsaleApi from '@/utils/axios.utils';
import { ProductsResponse } from '@/utils/types/products.interface';

const getProducts = async (queries?: string) => {
  const response = await bsaleApi.get<ProductsResponse>(
    `/products.json?${queries || ''}`
  );
  return response.data;
};

export { getProducts };
