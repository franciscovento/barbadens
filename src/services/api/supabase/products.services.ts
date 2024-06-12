import { PostgrestError } from '@supabase/supabase-js';
import axios from 'axios';

interface Product {
  design_id: number;
  fabric_id: number;
  created_at: string;
  price: number;
}
const getOrCreateProduct = async (
  data: Pick<Product, 'design_id' | 'fabric_id'>
) => {
  const { data: response } = await axios.post<{
    data: Product[] | null;
    error: PostgrestError | null;
  }>('/api/products', data);
  return {
    data: response.data?.[0],
    error: response.error,
  };
};

export { getOrCreateProduct };
