'use client';
import { addProductToCart } from '@/services/api/supabase/cart.services';
import { updateOrCreateProfile } from '@/services/api/supabase/profile.services';
import { appConfirm, appModal, appToast } from '@/services/modals/appModal';
import { useCartStore } from '@/stores/cart/cart.store';
import { useMeasures } from '@/stores/measures/measures.store';
import { useUser } from '@/stores/user/user.store';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import Tutorial from '@/ui/atoms/tutorial/Tutorial';
import { Button } from '@/ui/materialComponents';
import Cart from '@/ui/organisms/cart/Cart';
import LoginRegisterCard from '@/ui/organisms/loginRegisterCard/LoginRegisterCard';

import ClientDesign from '@/ui/templates/design/ClientDesign';
import { standardMeasures } from '@/utils/data/standardMeasures';
import { Profile } from '@/utils/types/profile.interface';
import { ShirtMeasures } from '@/utils/types/shirtMeasures.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Option, Select, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { routes } from '../../../../../../routes';
import { FormMeasuresSchema, formMeasuresSchema } from './formSchema';

import checkMeasures from '@/utils/checkMeasures';
import measuresInfo from '@/utils/data/measures.data';
import * as Sentry from '@sentry/nextjs';

interface Props {
  profiles: Profile[];
  fabric_id: number;
  shirt_design_id: number;
}

const MeasureForm: FC<Props> = ({ profiles, fabric_id, shirt_design_id }) => {
  const { checkCart } = useCartStore();
  const { getMeasures, setMeasures, clearMeasures } = useMeasures();
  const router = useRouter();

  const { isAuthenticated } = useUser();

  const {
    register,
    reset,

    handleSubmit,
    formState: { isValid, defaultValues, isSubmitting, isDirty },
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
      const { id, profile_name, ...rest } = data;
      const errors = checkMeasures(rest);

      if (errors.length > 0) {
        const resp = await appConfirm({
          title: 'Medidas fuera de rango',
          cancelButtonText: 'Corregir medidas',
          confirmButtonText: 'Continuar',
          html: (
            <div className="text-left">
              <p>Las siguientes medidas están fuera de rango:</p>
              <ul className="flex flex-col gap-1 py-4">
                {errors.map((error, index) => (
                  <li key={error}>
                    {index + 1}. {error}
                  </li>
                ))}
              </ul>
              <p>
                Las medidas indicadas presentan desviaciones respecto a
                referencias estándares. ¿Deseas continuar?
              </p>
            </div>
          ),
        });
        if (resp.dismiss || resp.isDenied) return;
      }

      if (isDirty && data.id) {
        const resp = await appConfirm({
          title: 'Editar perfil',
          text: 'Estás editando este perfil. Esto afectará tus futuras compras y las que estén en proceso. Si quieres agregar otras medidas para la misma persona puedes crear otro perfil. Ejem: José XL',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Crear otro perfil',
        });
        if (resp.dismiss || resp.isDenied) return;
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
      await checkCart();
      // ! TODO: Check if this is necessary
      // router.refresh();
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
        showCloseButton: false,
      });
    } catch (error: any) {
      if (error?.code === '23505') {
        return appToast({
          text: 'Ya tienes un perfil con este nombre, selecciónalo en la lista',
          icon: 'warning',
        });
      }

      Sentry.captureException(error);
      appToast({
        text: 'Ocurrió un error, inténtalo más tarde.',
        icon: 'error',
      });
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
        sleeve_width: profile.sleeve_width,
        sleeve_long: profile.sleeve_long,
        shoulder: profile.shoulder,
        long: profile.long,
      });
    }
  };

  const displayTutorial = (key: string) => {
    appModal.fire({
      title: measuresInfo[key as keyof typeof measuresInfo].longDisplayName,
      html: (
        <Tutorial
          videoKey={measuresInfo[key as keyof typeof measuresInfo].videoKey}
        />
      ),
    });
  };

  const displayLoginModal = () => {
    const onLoginSuccess = () => {
      router.refresh();
      appToast({
        text: 'Iniciaste sesión correctamente',
        icon: 'success',
      });
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
      collar: undefined,
      chest: undefined,
      waist: undefined,
      long: undefined,
      back: undefined,
      sleeve_long: undefined,
      sleeve_width: undefined,
      shoulder: undefined,
    });
  };

  const selectStandardMeasure = () => {
    const pickStandardMeasure = (measure: ShirtMeasures) => {
      reset({
        ...measure,
      });
      appModal.close();
    };

    appModal.fire({
      html: (
        <div className="">
          <h2 className="pb-4 text-xl font-semibold">Selecciona una medida:</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {standardMeasures.map((measure) => {
              return (
                <button
                  onClick={() => pickStandardMeasure(measure.measures)}
                  className="bg-app-primary text-white rounded-lg p-2 text-sm duration-300 hover:bg-app-primary/80"
                  key={measure.name}
                >
                  {measure.name}
                </button>
              );
            })}
          </div>
        </div>
      ),
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
            Ingresa tus medidas en centímetros. Haz clic en {' "Ver Tutorial" '}{' '}
            para obtener más información. O puedes{' '}
            <button
              onClick={selectStandardMeasure}
              type="button"
              className="text-app-accent underline"
            >
              elegir alguna medida estándar
            </button>
            .
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
        <div className="flex flex-col gap-6">
          {Object.keys(measuresInfo).map((key) => {
            const measure = measuresInfo[key as keyof typeof measuresInfo];
            return (
              <div key={key} className="relative">
                <label className="flex justify-between items-end">
                  <span>{measure.longDisplayName}</span>

                  <div>
                    <Input
                      label="cm"
                      className="border border-gray-500"
                      containerProps={{ className: '!w-20 !min-w-0' }}
                      {...register(key as keyof FormMeasuresSchema)}
                      type="number"
                      step="0.1"
                    />{' '}
                    {/* cm */}
                  </div>
                </label>
                <span
                  onClick={() => displayTutorial(key)}
                  className="text-app-text text-sm hover:text-blue-600 cursor-pointer absolute"
                >
                  Ver tutorial
                </span>
              </div>
            );
          })}
          {/* {measures.map((value, index) => {
            return (
              <div key={index} className="relative">
                <label className="flex justify-between items-end">
                  <span>
                    {valuesMeasuresMap[value as keyof FormMeasuresSchema]}
                  </span>

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
                <span
                  onClick={() => displayTutorial(value)}
                  className="text-app-text text-sm hover:text-blue-600 cursor-pointer absolute"
                >
                  Ver tutorial
                </span>
              </div>
            );
          })} */}
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
