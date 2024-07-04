'use server';
import { getFabrics } from '@/services/api/bsale/products.services';

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
