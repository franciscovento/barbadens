import { createClient } from '@/utils/supabase/client';
import { Cuff } from '@/utils/types/design.interface';

const supabase = createClient();
async function getShirtCuffOptions() {
  const { data, error } = await supabase
    .from('shirt_cuffs')
    .select('*')
    .returns<Cuff[]>();
  return {
    data,
    error,
  };
}

export { getShirtCuffOptions };
