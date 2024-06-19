'use client';
import { getShirtDesigns } from '@/services/api/supabase/design.services';
import { errorToast } from '@/services/modals/appModal';
import FabricDetails from '@/ui/atoms/fabricDetails/FabricDetails';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Button, Typography } from '@/ui/materialComponents';
import SelectCollar from '@/ui/organisms/selectAttribute/selectCollar/SelectCollar';
import SelectCuff from '@/ui/organisms/selectAttribute/selectCuff/SelectCuff';
import SelectPocket from '@/ui/organisms/selectAttribute/selectPocket/SelectPocket';
import SelectSleeve from '@/ui/organisms/selectAttribute/selectSleeve/SelectSleeve';
import { getCurrentDesign } from '@/utils/getCurrentDesing';
import useShirtDesign from '@/utils/hooks/useShirtDesign.hooks';
import { Design } from '@/utils/types/design.interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  params: {
    fabric_id: string;
  };
}

const Personaliza: FC<Props> = ({ params }) => {
  const [designs, setDesigns] = useState<Design[]>([]);

  const { shirt_collar_id, shirt_cuff_id, shirt_pocket_id, sleeve_type } =
    useShirtDesign();
  const currentDesign = getCurrentDesign(designs, {
    shirt_collar_id,
    shirt_cuff_id,
    shirt_pocket_id,
    sleeve_type,
  });
  const router = useRouter();

  const completeStep = () => {
    router.push(
      `/create/${params.fabric_id}/medidas?shirt_design_id=${currentDesign?.id}`
    );
  };

  useEffect(() => {
    const fetchDesigns = async () => {
      const { data, error } = await getShirtDesigns();
      if (error) {
        errorToast(error.message);
      }
      setDesigns(data || []);
    };
    fetchDesigns();
  }, []);

  return (
    <div className="grid md:grid-cols-2 md:py-8 gap-8 ">
      <div>
        <StepTitle title="Crea tu diseño" />
        {/* TELA CAMISA */}

        <div className="pt-5 grid grid-cols-2 gap-4 sm:gap-8">
          <div className="relative flex-shrink-0 ">
            <Image
              src={`/images/tela1.png`}
              fill
              alt="tela"
              className="object-cover"
            />
          </div>
          <FabricDetails
            title="100% algodón Popelina"
            attributes={[
              { title: 'Nombre de tejido', value: 'Barbadens' },
              { title: 'Composición', value: '100% Algodón' },
              { title: 'Peso', value: '100 gr/m2' },
              { title: 'Tono', value: 'Azul' },
            ]}
          />
        </div>
        <div className="py-8">
          <h3 className="font-semibold pb-4">Características del modelo</h3>
          <div className="flex flex-wrap gap-8">
            <SelectSleeve />
            <SelectCuff />
            <SelectPocket />
            <SelectCollar />
          </div>
        </div>
      </div>
      <div className=" bg-app-background">
        <div className="max-w-[370px] mx-auto flex flex-col gap-4 items-center justify-center p-12">
          <Typography variant="h4">Tu camisa</Typography>
          <Typography className="text-app-text text-center text-base">
            Su camisa perfecta está casi lista. Por favor, compruebe todos los
            detalles y proceda a insertar sus medidas.
          </Typography>
          <Image
            src={currentDesign?.image || '/images/camisa-test.png'}
            alt="camisa a la medida"
            width={370}
            height={250}
          />
          <div className="flex gap-2 flex-col">
            <Button onClick={completeStep}>Completar paso</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personaliza;
