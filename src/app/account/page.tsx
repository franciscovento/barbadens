import { createClient } from '@/utils/supabase/server';

const Page = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('orders').select('*');
  // console.log(data);

  return (
    <main className="pt-20">
      {JSON.stringify(data)}
      <div className="text-4xl">{data?.length}</div>
    </main>
  );
};

export default Page;
