import { MeasuresStore } from '@/stores';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

async function updateProfileMeasures(profileData: MeasuresStore) {
  const { id, ...rest } = profileData;
  const { data, error } = await supabase
    .from('profiles')
    .update(rest)
    .eq('id', id);

  return {
    data,
    error,
  };
}

async function createProfile(profileData: MeasuresStore) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select();
  return {
    data,
    error,
  };
}

export { createProfile, updateProfileMeasures };
