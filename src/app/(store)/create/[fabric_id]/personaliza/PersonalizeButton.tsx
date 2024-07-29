'use client';
import { errorToast, successToast } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores';
import { createClient } from '@/utils/supabase/client';
import { Design } from '@/utils/types/design.interface';
import { Button } from '@material-tailwind/react';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  fabric_id: string;
}
const PersonalizeButton: FC<Props> = ({ fabric_id }) => {
  const { shirt_collar_id, shirt_pocket_id, sleeve_type, shirt_cuff_id } =
    useCustomShirt();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const completeStep = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      let { data, error } = await supabase
        .rpc('get_or_create_design', {
          var_shirt_collar_id: shirt_collar_id,
          var_shirt_cuff_id: shirt_cuff_id,
          var_shirt_pocket_id: shirt_pocket_id,
          var_sleeve_type: sleeve_type,
        })
        .returns<Design>();

      if (error) throw error;

      successToast('Diseño creado correctamente, ahora inserta tus medidas');
      // return router.push(
      //   routes.create.fabric.measures.replace('[fabric_id]', fabric_id) +
      //     `?shirt_design_id=${data?.id}`
      // );
    } catch (error: any) {
      Sentry.captureException(error);
      errorToast(
        'Ocurrió un error al crear el diseño, actualiza la página e intenta de nuevo'
      );
    }
  };

  return (
    <Button loading={isLoading} disabled={isLoading} onClick={completeStep}>
      Completar paso
    </Button>
  );
};

export default PersonalizeButton;
