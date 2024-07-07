'use server';

import { createClient } from '@/utils/supabase/server';

async function changuePassword(formData: FormData) {
  const supabase = createClient();
  const rawFormData = {
    new_password: formData.get('new_password') as string,
  };

  await supabase.auth.updateUser({ password: rawFormData.new_password });
}

export { changuePassword };
