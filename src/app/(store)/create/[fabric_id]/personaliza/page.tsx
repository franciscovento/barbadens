import { getShirtDesigns } from '@/services/api/supabase/design.services';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Typography } from '@/ui/materialComponents';
import CurrentDesign from '@/ui/templates/currentDesign/CurrentDesign';
import { FC, Suspense } from 'react';
import DesignItems from './DesignItems';
import FabricInfo from './FabricInfo';
import FabricInfoSkeleton from './FabricInfoSkeleton';
import PersonalizeButton from './PersonalizeButton';

interface Props {
  params: {
    fabric_id: string;
  };
}

const Personaliza: FC<Props> = async ({ params }) => {
  const fabric_id = Number(params.fabric_id);
  const { data: designs } = await getShirtDesigns();

  return (
    <div className="grid md:grid-cols-2 md:py-8 gap-8 ">
      <div>
        <StepTitle title="Crea tu diseño" />
        {/* TELA CAMISA */}

        <Suspense fallback={<FabricInfoSkeleton />}>
          <FabricInfo fabric_id={fabric_id} />
        </Suspense>
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
