'use client';

import { appModal } from '@/services/modals/appModal';
import { createClient } from '@/utils/supabase/client';
import { Design } from '@/utils/types/design.interface';
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
        .select()
        .eq('id', designId)
        .single<Design>();

      if (profileError || designError)
        throw new Error('Error al cargar los detalles');
      if (profile) {
        appModal.fire({
          html: <ProductDetail profile={profile} design={design} />,
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
  design: Design;
}
const ProductDetail: FC<ProductDetailProps> = ({ profile, design }) => {
  return (
    <div>
      <span>PERFIL : {profile.profile_name}</span>
      <span>FECHA DE NACIMIENTO : {profile.birth_date}</span>
      <span>LONGITUD : {profile.long}</span>
      <span>CUELLO : {profile.collar}</span>
      <span>PECHO : {profile.chest}</span>
      <span>CINTURA : {profile.waist}</span>
      <span>CADERA : {profile.hip}</span>
      <span>ESPALDA : {profile.back}</span>
      <span>MANGA ANCHO : {profile.sleeve_width}</span>
      <span>MANGA LARGA : {profile.sleeve_long}</span>
      <span>PUNO : {profile.fist}</span>
      <span>HOMBRO : {profile.shoulder}</span>
    </div>
  );
};
