import { getShirtDesigns } from '@/services/api/supabase/design.services';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import { routes } from '../../../../../../routes';
import MeasureForm from './MeasureForm';

interface Props {
  searchParams: {
    shirt_design_id: string;
  };
  params: {
    fabric_id: string;
  };
}
const Medidas: FC<Props> = async ({ searchParams, params }) => {
  const shirt_design_id = Number(searchParams.shirt_design_id);
  const fabric_id = Number(params.fabric_id);
  const { data: designs } = await getShirtDesigns();
  const currentDesign = designs.find((design) => design.id === shirt_design_id);
  if (!shirt_design_id || !currentDesign)
    redirect(
      routes.create.fabric.personalize.replace(
        '[fabric_id]',
        fabric_id.toString()
      )
    );
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', data.user?.id);

  return (
    <MeasureForm
      fabric_id={fabric_id}
      shirt_design_id={shirt_design_id}
      designs={designs || []}
      profiles={profiles || []}
    />
  );
};

export default Medidas;
