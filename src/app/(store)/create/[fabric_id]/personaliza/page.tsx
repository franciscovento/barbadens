import { getShirtDesigns } from '@/services/api/supabase/design.services';
import FabricDetails from '@/ui/atoms/fabricDetails/FabricDetails';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Typography } from '@/ui/materialComponents';
import CurrentDesign from '@/ui/templates/currentDesign/CurrentDesign';
import Image from 'next/image';
import { FC } from 'react';
import DesignItems from './DesignItems';
import PersonalizeButton from './PersonalizeButton';

interface Props {
  params: {
    fabric_id: string;
  };
}

const Personaliza: FC<Props> = async ({ params }) => {
  const { data: designs } = await getShirtDesigns();

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
          <DesignItems />
        </div>
      </div>
      <div className=" bg-app-background">
        <div className="max-w-[370px] mx-auto flex flex-col gap-4 items-center justify-center p-12">
          <Typography variant="h4">Tu camisa</Typography>
          <Typography className="text-app-text text-center text-base">
            Su camisa perfecta está casi lista. Por favor, compruebe todos los
            detalles y proceda a insertar sus medidas.
          </Typography>
          <CurrentDesign designs={designs} />
          <div className="flex gap-2 flex-col">
            <PersonalizeButton fabric_id={params.fabric_id} designs={designs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personaliza;
