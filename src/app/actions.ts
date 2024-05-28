'use server';
import { getProducts } from '@/services/api/products.services';

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
