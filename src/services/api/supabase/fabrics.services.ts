import { createClient } from '@/utils/supabase/client';
import { Fabric } from '@/utils/types/fabrics.interface';

async function getFabrics(offset: number = 0, limit: number = 10) {
  const supabase = createClient();
  const { data, count, error } = await supabase
    .from('fabrics')
    .select('*')
    .range(offset, limit)
    .returns<Fabric[]>();

  return {
    data,
    count,
    error,
  };
}

export { getFabrics };
