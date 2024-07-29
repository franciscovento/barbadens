import { createClient } from '@/utils/supabase/server';
import { Design } from '@/utils/types/design.interface';
import { notFound } from 'next/navigation';
import { FC } from 'react';
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
  const supabase = createClient();
  const { error } = await supabase
    .from('shirt_designs')
    .select('*')
    .eq('id', shirt_design_id)
    .single<Design>();

  if (error) {
    return notFound();
    // redirect(
    //   routes.create.fabric.personalize.replace(
    //     '[fabric_id]',
    //     fabric_id.toString()
    //   )
    // );
  }

  const { data } = await supabase.auth.getUser();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', data.user?.id);

  return (
    <MeasureForm
      fabric_id={fabric_id}
      shirt_design_id={shirt_design_id}
      profiles={profiles || []}
    />
  );
};

export default Medidas;
