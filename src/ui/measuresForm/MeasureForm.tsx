'use client';

import { Button } from '@/ui/materialComponents';
import { ShirtMeasure } from '@/utils/types/ShirtMeasure';
import { valuesMeasuresMap } from '@/utils/valuesMeasuresMap';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import StepTitle from '../stepTitle/StepTitle';

const MeasureForm = () => {
  const router = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { defaultValues, isValid },
  } = useForm<ShirtMeasure>({
    defaultValues: {
      neck: undefined,
      chest: undefined,
      waist: undefined,
      shoulder: undefined,
      left_sleeve: undefined,
      right_sleeve: undefined,
      left_fist: undefined,
      right_fist: undefined,
      length: undefined,
    },
  });

  const onSubmit = (data: ShirtMeasure) => {
    console.log(data);
    router.push(`/create/${params.product_id}/checkout`);
  };

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
                    {valuesMeasuresMap[value as keyof ShirtMeasure]}
                  </span>
                  <span className="text-text text-sm hover:text-blue-600 cursor-pointer">
                    Ver tutorial
                  </span>
                </div>
                <div>
                  <input
                    className="border border-gray-500 rounded-xl w-20 h-8 px-2"
                    {...register(value as keyof ShirtMeasure, {
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
