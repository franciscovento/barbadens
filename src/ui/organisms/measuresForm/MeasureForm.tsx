'use client';

import { appModal } from '@/services/modals/appModal';
import { Measures, useMeasures } from '@/stores';
import { useUser } from '@/stores/user/user.store';
import { Button } from '@/ui/materialComponents';
import { valuesMeasuresMap } from '@/utils/valuesMeasuresMap';
import { Option, Select, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import StepTitle from '../../atoms/stepTitle/StepTitle';
import Tutorial from '../../atoms/tutorial/Tutorial';
import LoginRegisterCard from '../loginRegisterCard/LoginRegisterCard';

const tutorials = [
  {
    key: 'neck',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'shoulder',
    tutorial: 'gxQ_d9MpGM',
  },
  {
    key: 'chest',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'waist',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'left_fist',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'right_fist',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'left_sleeve',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'right_sleeve',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'length',
    tutorial: '2gxQ_d9MpGM',
  },
];

const MeasureForm = ({
  measures,
  profileName,
}: {
  measures: Partial<Measures>;
  profileName: string | undefined;
}) => {
  const { profiles } = useUser();
  const router = useRouter();
  const params = useParams();
  const updateMeasures = useMeasures((state) => state.updateMeasures);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Measures>({
    defaultValues: {
      ...measures,
      profileName,
    },
  });

  const onSubmit = (data: Measures) => {
    updateMeasures(data);
    router.push(`/create/${params.product_id}/checkout`);
  };

  const displayTutorial = (key: string) => {
    const tutorial = tutorials.find((t) => t.key === key);
    if (tutorial) {
      appModal.fire({
        title: valuesMeasuresMap[tutorial.key as keyof Measures],
        html: (
          <Tutorial
            title={tutorial.key}
            description={tutorial.key}
            tutorialId={tutorial.tutorial}
          />
        ),
        width: 800,
      });
    }
  };

  const displayLoginModal = () => {
    const onLoginSuccess = () => {
      appModal.close();
    };

    appModal.fire({
      html: (
        <LoginRegisterCard
          onLoginSuccess={onLoginSuccess}
          defaultForm="login"
        />
      ),
    });
  };

  useEffect(() => {
    reset(measures);
  }, [measures, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 md:py-8 gap-8 "
    >
      <div className="flex flex-col gap-4">
        <StepTitle title="Ingresa tus medidas" />
        <div className="flex flex-col gap-2 ">
          <p>
            Ingresa tus medidas en centímetros. Si no sabes cómo tomar tus
            medidas, haz clic en {' "Ver Tutorial" '} para obtener más
            información.
          </p>
          {profiles.length === 0 && (
            <p>
              Si ya tienes una cuenta.{' '}
              <button
                onClick={displayLoginModal}
                type="button"
                className="text-app-accent underline"
              >
                Ingresa aquí
              </button>
            </p>
          )}
          {profiles.length > 0 && (
            <div className="py-2">
              <Select label="Selecciona un perfil">
                {profiles.map((profile) => (
                  <Option value={profile.id} key={profile.id}>
                    {profile.profile_name}
                  </Option>
                ))}
              </Select>
              <p className="text-sm pt-2">O crea uno nuevo: </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {Object.keys(measures as {}).map((value) => {
            return (
              <label key={value} className="flex justify-between">
                <div className="flex flex-col">
                  <span>{valuesMeasuresMap[value as keyof Measures]}</span>
                  <span
                    onClick={() => displayTutorial(value)}
                    className="text-app-text text-sm hover:text-blue-600 cursor-pointer"
                  >
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
      <div className=" bg-app-background flex items-center justify-center">
        <div className="max-w-[380px] mx-auto flex flex-col gap-4 items-center justify-center p-12">
          <Typography variant="h4">Toma tus medidas</Typography>
          <Typography className="text-app-text text-center text-base">
            Su camisa perfecta está casi lista. Por favor, compruebe todos los
            detalles y proceda a insertar sus medidas.
          </Typography>
          <Image
            src={'/images/camisa-test.png'}
            alt="camisa a la medida"
            width={370}
            height={250}
          />
          <div className="text-center">
            <label className="block pb-4 text-center">
              <span className="text-sm">
                Pon un nombre al perfil para continuar:
              </span>
              <span className="w-full flex-1">
                <input
                  {...register('profileName', { required: true })}
                  className="w-full border border-gray-500 rounded-xl h-8 px-2"
                  placeholder="Ejemplo: José"
                  type="text"
                />
              </span>
            </label>
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
