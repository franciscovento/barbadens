'use client';
import { addProductToCart } from '@/services/api/supabase/cart.services';
import { updateOrCreateProfile } from '@/services/api/supabase/profile.services';
import { appModal, errorToast } from '@/services/modals/appModal';
import { useCartStore } from '@/stores/cart/cart.store';
import { useMeasures } from '@/stores/measures/measures.store';
import { useUser } from '@/stores/user/user.store';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import Tutorial from '@/ui/atoms/tutorial/Tutorial';
import { Button } from '@/ui/materialComponents';
import Cart from '@/ui/organisms/cart/Cart';
import LoginRegisterCard from '@/ui/organisms/loginRegisterCard/LoginRegisterCard';

import ClientDesign from '@/ui/templates/design/ClientDesign';
import { Design } from '@/utils/types/design.interface';
import { Profile } from '@/utils/types/profile.interface';
import { valuesMeasuresMap } from '@/utils/valuesMeasuresMap';
import { yupResolver } from '@hookform/resolvers/yup';
import { Option, Select, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { routes } from '../../../../../../routes';
import { FormMeasuresSchema, formMeasuresSchema } from './formSchema';

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

interface Props {
  profiles: Profile[];
  designs: Design[];
  fabric_id: number;
  shirt_design_id: number;
}

const MeasureForm: FC<Props> = ({
  profiles,
  designs,
  fabric_id,
  shirt_design_id,
}) => {
  const { checkCart } = useCartStore();
  const { getMeasures, setMeasures, clearMeasures } = useMeasures();
  const router = useRouter();
  // const params = useSearchParams();
  // const { fabric_id } = useParams();
  // const shirt_design_id = params.get('shirt_design_id');

  const { isAuthenticated } = useUser();

  const {
    register,
    reset,

    handleSubmit,
    formState: { isValid, defaultValues, isSubmitting },
  } = useForm({
    resolver: yupResolver(formMeasuresSchema),
    mode: 'all',
  });

  const onSubmit = async (data: FormMeasuresSchema) => {
    setMeasures(data);
    try {
      if (!isAuthenticated) {
        return displayLoginModal();
      }

      const { data: profileData, error: profileError } =
        await updateOrCreateProfile(data);

      if (profileError) throw profileError;

      if (!profileData) throw new Error('No se pudo crear el perfil');

      if (profileData) {
        const { error } = await addProductToCart({
          design_id: shirt_design_id,
          fabric_id: fabric_id,
          profile_id: profileData.id,
        });
        if (error) throw new Error(error.message);
      }
      checkCart();
      router.refresh();
      return appModal.fire({
        html: (
          <Cart
            onCheckoutRedirect={() => {
              router.push(routes.checkout.home);
              appModal.close();
            }}
            onContinueShoppingRedirect={() => {
              router.push('/create');
              appModal.close();
            }}
          />
        ),
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
    } catch (error: any) {
      errorToast(error?.message || 'Ocurrió un error, inténtalo más tarde.');
    }
  };

  const onSelectProfile = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId);

    if (profile) {
      reset({
        profile_name: profile.profile_name,
        id: profile.id,
        back: profile.back,
        chest: profile.chest,
        collar: profile.collar,
        waist: profile.waist,
        hip: profile.hip,
        sleeve_width: profile.sleeve_width,
        sleeve_long: profile.sleeve_long,
        fist: profile.fist,
        shoulder: profile.shoulder,
        long: profile.long,
      });
    }
  };

  const displayTutorial = (key: string) => {
    const tutorial = tutorials.find((t) => t.key === key);
    if (tutorial) {
      appModal.fire({
        title: valuesMeasuresMap[tutorial.key as keyof FormMeasuresSchema],
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
      router.refresh();
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
    clearMeasures();
    reset();
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
    reset(getMeasures());
  }, [reset, getMeasures]);

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
          {!isAuthenticated && (
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
                value={defaultValues?.id}
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
                  <span>
                    {valuesMeasuresMap[value as keyof FormMeasuresSchema]}
                  </span>
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
                    {...register(value as keyof FormMeasuresSchema, {
                      required: true,
                    })}
                    type="number"
                    step="0.1"
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
          <ClientDesign shirt_design_id={shirt_design_id} />
          {/* <CurrentDesign /> */}
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
            <div className="flex flex-col gap-4 items-center justify-center">
              <Button
                loading={isSubmitting}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Agregar producto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MeasureForm;
