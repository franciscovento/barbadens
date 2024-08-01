'use client';

import { appModal } from '@/services/modals/appModal';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { createClient } from '@/utils/supabase/client';
import { GetDesignResponse } from '@/utils/types/design.interface';
import { Profile } from '@/utils/types/profile.interface';
import { Button } from '@material-tailwind/react';
import { FC, useState } from 'react';

interface Props {
  profileId: string;
  designId: number;
}
const SeeDetail: FC<Props> = ({ designId, profileId }) => {
  const [loading, setLoading] = useState(false);
  const modal = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select()
        .eq('id', profileId)
        .single<Profile>();
      const { data: design, error: designError } = await supabase
        .from('shirt_designs')
        .select('*,shirt_collars(name), shirt_cuffs(name), shirt_pockets(name)')
        .eq('id', designId)
        .single<GetDesignResponse>();

      if (profileError || designError)
        throw new Error('Error al cargar los detalles');
      if (profile) {
        appModal.fire({
          html: <ProductDetail profile={profile} design={design} />,
          width: 650,
        });
      }
    } catch (error) {
      appModal.fire({
        html: <span>Error al cargar los detalles</span>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="text"
      size="sm"
      loading={loading}
      onClick={modal}
      className="text-app-accent text-sm underline px-0 normal-case font-thin hover:bg-white py-0"
    >
      Ver más detalles
    </Button>
  );
};

export default SeeDetail;

interface ProductDetailProps {
  profile: Profile;
  design: GetDesignResponse;
}
const ProductDetail: FC<ProductDetailProps> = ({ profile, design }) => {
  const measuresMap = {
    long: 'Largo',
    chest: 'Pecho',
    back: 'Espalda',
    waist: 'Cintura',

    sleeve_long: 'Largo de manga',
    sleeve_width: 'Ancho de manga',
    collar: 'Cuello',

    shoulder: 'Hombro',
  };

  return (
    <div>
      <StepTitle title="Detalles del modelo" />
      <div className="flex flex-wrap items-center gap-y-4 gap-x-2 justify-between py-4">
        <ItemDetail
          title="Tipo de cuello:"
          content={design.shirt_collars.name}
        />
        {design.shirt_cuffs && (
          <ItemDetail title="Tipo de puño:" content={design.shirt_cuffs.name} />
        )}
        <ItemDetail
          title="Tipo de bolsillo:"
          content={design.shirt_pockets.name}
        />
        <ItemDetail title="Tipo de manga:" content={design.sleeve_type} />
      </div>
      <div className="text-left">
        <span className="font-semibold">• Medidas (cm):</span>
        <div className="flex items-center py-4 flex-wrap gap-y-4">
          {Object.keys(measuresMap).map((key, index) => {
            return (
              <div
                key={index}
                className="flex flex-col text-sm justify-center items-center border border-black"
              >
                <span className="border text-xs border-b-black  h-12 flex flex-col justify-center px-1 max-w-20">
                  {measuresMap[key as keyof typeof measuresMap]}
                </span>
                <span className="h-10 flex flex-col items-center justify-center">
                  {profile[key as keyof typeof profile]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ItemDetail = ({ content, title }: { title: string; content: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-left">{title}</span>
      <span className="bg-app-background text-black text-sm px-4 py-2 rounded-sm">
        {content}
      </span>
    </div>
  );
};
