'use server';
import { getProducts } from '@/services/api/bsale/products.bsale.services';
import { createClient } from '@/utils/supabase/server';
import { Fabric } from '@/utils/types/fabrics.interface';

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

export async function fetchFabrics(offset: number = 0, limit: number = 10) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('fabrics')
    .select('*')
    .range(offset, limit)
    .order('id', { ascending: true })
    .returns<Fabric[]>();

  return {
    data,
    error,
  };
}
