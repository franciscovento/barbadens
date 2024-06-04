'use server';

import { createClient } from '@/utils/supabase/server';
import { ProfileForm } from './CreateNewProfile';

export async function createProfile(profileData: ProfileForm) {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').insert([profileData]);
  if (error) {
    throw error;
  }
  return data;
}

export async function updateProfile(profileData: ProfileForm, id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .update([profileData])
    .eq('id', id)
    .select();

  return {
    data,
    error,
  };
}
