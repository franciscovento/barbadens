import { getShirtDesigns } from '@/services/api/supabase/design.services';
import { createClient } from '@/utils/supabase/server';
import MeasureForm from './MeasureForm';

const Medidas = async () => {
  const { data: designs } = await getShirtDesigns();
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', data.user?.id);

  return <MeasureForm designs={designs || []} profiles={profiles || []} />;
};

export default Medidas;
