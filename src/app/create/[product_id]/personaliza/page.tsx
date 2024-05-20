'use client';
import FabricDetails from '@/ui/fabricDetails/FabricDetails';
import { Button, Typography } from '@/ui/materialComponents';
import SelectCollar from '@/ui/selectAtribute/selectCollar/SelectCollar';
import SelectCuff from '@/ui/selectAtribute/selectCuff/SelectCuff';
import SelectPocket from '@/ui/selectAtribute/selectPocket/SelectPocket';
import SelectSleeve from '@/ui/selectAtribute/selectSleeve/SelectSleeve';
import StepTitle from '@/ui/stepTitle/StepTitle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Props {
  params: {
    product_id: string;
  };
}

const Personaliza: FC<Props> = ({ params }) => {
  const router = useRouter();

  const completeStep = () => {
    router.push(`/create/${params.product_id}/medidas`);
  };
  return (
    <div className="grid md:grid-cols-2 md:py-8 gap-8 ">
      <div>
        <StepTitle title="Crea tu diseño" />
        {/* TELA CAMISA */}

        <div className="pt-5 grid grid-cols-2 gap-4 sm:gap-8">
          <div className="relative flex-shrink-0 ">
            <Image
              src={'/images/tela-test.png'}
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
      <div className=" bg-background">
        <div className="max-w-[370px] mx-auto flex flex-col gap-4 items-center justify-center p-12">
          <Typography variant="h4">Tu camisa</Typography>
          <Typography className="text-text text-center text-base">
            Su camisa perfecta está casi lista. Por favor, compruebe todos los
            detalles y proceda a insertar sus medidas.
          </Typography>
          <Image
            src={'/images/camisa-test.png'}
            alt="camisa a la medida"
            width={370}
            height={250}
          />
          <div>
            <Button onClick={completeStep}>Completar paso</Button>
          </div>
        </div>
      </div>
      {/* <Link href={`/create/${params.product_id}/medidas`}> Medidas</Link> */}
    </div>
  );
};

export default Personaliza;
