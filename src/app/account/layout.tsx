import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login page if not authenticated
  if (!user) {
    redirect('/auth');
  }

  return <div>{children}</div>;
}
