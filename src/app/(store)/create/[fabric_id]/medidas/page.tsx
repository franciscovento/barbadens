import { createClient } from '@/utils/supabase/server';
import MeasureForm from './MeasureForm';

const Medidas = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', data.user?.id);

  return <MeasureForm profiles={profiles || []} />;
};

export default Medidas;
