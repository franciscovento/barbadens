import { FormMeasuresSchema } from '@/app/(store)/create/[fabric_id]/medidas/formSchema';
import { createClient } from '@/utils/supabase/client';
import { Profile } from '@/utils/types/profile.interface';

const supabase = createClient();

async function updateProfileMeasures(profileData: FormMeasuresSchema) {
  const { id, ...rest } = profileData;
  const { data, error } = await supabase
    .from('profiles')
    .update(rest)
    .eq('id', id)
    .select()
    .returns<Profile[]>();

  return {
    data: data?.[0],
    error,
  };
}

async function createProfile(profileData: FormMeasuresSchema) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select()
    .returns<Profile[]>();

  return {
    data: data?.[0],
    error,
  };
}

async function updateOrCreateProfile(profileData: FormMeasuresSchema) {
  const { id, ...rest } = profileData;
  if (id) {
    return updateProfileMeasures(profileData);
  }
  return createProfile(rest);
}

export { createProfile, updateOrCreateProfile, updateProfileMeasures };
