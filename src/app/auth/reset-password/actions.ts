'use server';

import { createClient } from '@/utils/supabase/server';

async function sendResetEmail(formData: FormData) {
  const supabase = createClient();
  const rawFormData = {
    email: formData.get('email') as string,
  };

  await supabase.auth.resetPasswordForEmail(rawFormData.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/changue-password`,
  });
}

export { sendResetEmail };
