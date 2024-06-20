'use server';
import {
  getFabrics,
  getProducts,
} from '@/services/api/bsale/products.services';

export async function fetchProducts({
  offset = 0,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}) {
  const data = await getProducts(`limit=${limit}&offset=${offset}`);
  return data;
}

export async function fetchFabrics({
  offset = 0,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}) {
  const data = await getFabrics(`limit=${limit}&offset=${offset}`);
  return data;
}

// export async function fetchFabrics(offset: number = 0, limit: number = 10) {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from('fabrics')
//     .select('*')
//     .range(offset, limit)
//     .order('id', { ascending: true })
//     .returns<Fabric[]>();

//   return {
//     data,
//     error,
//   };
// }
