import { createClient } from '@/utils/supabase/client';
import { Collar, Cuff } from '@/utils/types/design.interface';

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

async function getShirtCollarOptions() {
  const { data, error } = await supabase
    .from('shirt_collars')
    .select('*')
    .returns<Collar[]>();
  return {
    data,
    error,
  };
}

async function getShirtPocketOptions() {
  const { data, error } = await supabase
    .from('shirt_pockets')
    .select('*')
    .returns<Cuff[]>();
  return {
    data,
    error,
  };
}

export { getShirtCollarOptions, getShirtCuffOptions, getShirtPocketOptions };
