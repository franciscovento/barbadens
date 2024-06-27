import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}
const layout: FC<Props> = async ({ children }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return redirect('/auth');
  }
  return <>{children}</>;
};

export default layout;
