'use client';

import { Measures, useMeasures } from '@/stores';
import { Button } from '@/ui/materialComponents';
import { valuesMeasuresMap } from '@/utils/valuesMeasuresMap';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import StepTitle from '../stepTitle/StepTitle';

const MeasureForm = ({ defaultValues }: { defaultValues: Measures }) => {
  const router = useRouter();
  const params = useParams();
  const updateMeasures = useMeasures((state) => state.updateMeasures);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Measures>({
    defaultValues,
  });

  const onSubmit = (data: Measures) => {
    updateMeasures(data);
    router.push(`/create/${params.product_id}/checkout`);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 md:py-8 gap-8 "
    >
      <div className="flex flex-col gap-4">
        <StepTitle title="Ingresa tus medidas" />
        <div className="flex flex-col gap-2">
          {Object.keys(defaultValues as {}).map((value) => {
            return (
              <label key={value} className="flex justify-between">
                <div className="flex flex-col">
                  <span className="capitalize">
                    {valuesMeasuresMap[value as keyof Measures]}
                  </span>
                  <span className="text-text text-sm hover:text-blue-600 cursor-pointer">
                    Ver tutorial
                  </span>
                </div>
                <div>
                  <input
                    className="border border-gray-500 rounded-xl w-20 h-8 px-2"
                    {...register(value as keyof Measures, {
                      required: true,
                    })}
                    type="number"
                  />{' '}
                  cm
                </div>
              </label>
            );
          })}
        </div>
      </div>
      <div className=" bg-background">
        <div className="max-w-[370px] mx-auto flex flex-col gap-4 items-center justify-center p-12">
          <Typography variant="h4">Toma tus medidas</Typography>
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
            <Button disabled={!isValid} type="submit">
              Completar paso
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MeasureForm;
