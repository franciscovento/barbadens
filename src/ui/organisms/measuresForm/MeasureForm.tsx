'use client';

import { appModal } from '@/services/modals/appModal';
import { MeasuresStore, useMeasures } from '@/stores';
import { useUser } from '@/stores/user/user.store';
import { Button } from '@/ui/materialComponents';
import { valuesMeasuresMap } from '@/utils/valuesMeasuresMap';
import { Option, Select, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import StepTitle from '../../atoms/stepTitle/StepTitle';
import Tutorial from '../../atoms/tutorial/Tutorial';
import LoginRegisterCard from '../loginRegisterCard/LoginRegisterCard';

const tutorials = [
  {
    key: 'long',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'collar',
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
    key: 'hip',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'back',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'sleeve_long',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'sleeve_width',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'fist',
    tutorial: '2gxQ_d9MpGM',
  },
  {
    key: 'shoulder',
    tutorial: '2gxQ_d9MpGM',
  },
];

interface Props {
  profileMeasures: MeasuresStore;
}

const measures = [
  'long',
  'collar',
  'chest',
  'waist',
  'hip',
  'back',
  'sleeve_long',
  'sleeve_width',
  'fist',
  'shoulder',
];

const MeasureForm = ({ profileMeasures }: Props) => {
  const { profiles } = useUser();
  const updateMeasures = useMeasures((state) => state.updateMeasures);
  const resetMeasures = useMeasures((state) => state.resetMeasuresStore);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<MeasuresStore>({
    defaultValues: {
      id: profileMeasures.id || '',
      profile_name: profileMeasures.profile_name || '',
      back: profileMeasures.back || undefined,
      chest: profileMeasures.chest || undefined,
      collar: profileMeasures.collar || undefined,
      waist: profileMeasures.waist || undefined,
      hip: profileMeasures.hip || undefined,
      sleeve_width: profileMeasures.sleeve_width || undefined,
      sleeve_long: profileMeasures.sleeve_long || undefined,
      fist: profileMeasures.fist || undefined,
      shoulder: profileMeasures.shoulder || undefined,
      long: profileMeasures.long || undefined,
    },
  });

  const onSubmit = (data: MeasuresStore) => {
    console.log(data);
    updateMeasures(data);
    // router.push(`/create/${params.product_id}/checkout`);
  };

  const onSelectProfile = (profileId: string) => {
    reset();
    const profile = profiles.find((p) => p.id === profileId);

    if (profile) {
      const profileMeasures = profile?.profile_measures;
      reset({
        profile_name: profile.profile_name,
        id: profile.id,
        ...profileMeasures,
      });
    }
  };

  const displayTutorial = (key: string) => {
    const tutorial = tutorials.find((t) => t.key === key);
    if (tutorial) {
      appModal.fire({
        title: valuesMeasuresMap[tutorial.key as keyof MeasuresStore],
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

  const clearForm = async () => {
    reset();
    resetMeasures();
    reset({
      profile_name: '',
      id: '',
      back: undefined,
      chest: undefined,
      collar: undefined,
      waist: undefined,
      hip: undefined,
      sleeve_width: undefined,
      sleeve_long: undefined,
      fist: undefined,
      shoulder: undefined,
      long: undefined,
    });
  };

  useEffect(() => {
    reset(profileMeasures);
  }, [profileMeasures]);

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
              <Select
                label="Selecciona un perfil"
                onChange={(value) => onSelectProfile(value!)}
                value={profileMeasures.id}
              >
                {profiles.map((profile) => (
                  <Option value={profile.id} key={profile.id}>
                    {profile.profile_name}
                  </Option>
                ))}
              </Select>
              <button
                type="button"
                onClick={() => clearForm()}
                className="text-sm pt-2 cursor-pointer underline text-app-accent"
              >
                O crea uno nuevo:{' '}
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {measures.map((value, index) => {
            return (
              <label key={index} className="flex justify-between">
                <div className="flex flex-col">
                  <span>{value}</span>
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
                    {...register(value as keyof MeasuresStore, {
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
                  {...register('profile_name', { required: true })}
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
