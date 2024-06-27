import Sidebar from '@/ui/organisms/sideBar/SideBar';
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
  return (
    <main className="mt-16 flex overflow-hidden ">
      <div className="w-14 bg-app-primary min-h-[calc(100vh-64px)] mx-auto">
        <Sidebar />
      </div>
      <div className="bg-blue-gray-100 flex-1 p-8">{children}</div>
    </main>
  );
};

export default layout;
