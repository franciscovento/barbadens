import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useClientSupabase = () => {
  const [supabase, setSupabase] =
    useState<SupabaseClient<any, 'public', any>>();

  const createSupabaseClient = () => {
    const supabase = createClient();
    setSupabase(supabase);
  };

  useEffect(() => {
    createSupabaseClient();
  }, []);

  return {
    supabase,
  };
};

export default useClientSupabase;
