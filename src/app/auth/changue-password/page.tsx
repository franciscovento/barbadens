'use client';
import { createClient } from '@/utils/supabase/client';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { AuthError } from '@supabase/supabase-js';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { routes } from '../../../../routes';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      new_password: '',
      repeat_password: '',
    },
  });

  const submit = async (data: { new_password: string }) => {
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.updateUser({
        password: data.new_password,
      });
      if (resetError) {
        throw resetError;
      }
    } catch (error: AuthError | any) {
      setError('root', {
        message:
          error?.message || 'Ocurrió un error inesperado, intenta de nuevo.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-app-primary flex items-center justify-center flex-col text-white">
      <form
        onSubmit={handleSubmit(submit)}
        className="border border-white flex flex-col justify-center items-center gap-4 p-8 rounded-lg w-96 max-w-full"
      >
        <div className="p-4 text-center rounded-full border border-white w-28 h-28 flex items-center justify-center">
          <LockClosedIcon color="white" width={96} height={96} />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center text-center">
          <p className="text-lg font-semibold">Cambia tu contraseña</p>
          <p className="text-sm">
            Ingresa una nueva contraseña para poder acceder a tu cuenta.
          </p>
        </div>
        <div className="relative w-full">
          <input
            className="p-2 w-full rounded-lg bg-transparent border border-white text-white"
            placeholder="Nueva contraseña"
            {...register('new_password', { required: true, minLength: 6 })}
            type={showPassword ? 'text' : 'password'}
          />
          {
            <button
              tabIndex={-1}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 -translate-y-1/2 right-4"
            >
              {showPassword ? (
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                >
                  <path
                    d="M9.23083 2.81966C8.92067 2.82451 8.6128 2.87378 8.31662 2.96598C8.45362 3.20692 8.52657 3.47896 8.52849 3.75611C8.52849 3.97133 8.4861 4.18443 8.40374 4.38326C8.32138 4.58208 8.20067 4.76274 8.04849 4.91492C7.89632 5.0671 7.71566 5.18781 7.51683 5.27017C7.318 5.35253 7.1049 5.39491 6.88969 5.39491C6.61253 5.39299 6.34049 5.32004 6.09955 5.18304C5.90946 5.84231 5.93162 6.54467 6.16288 7.19064C6.39414 7.83661 6.82279 8.39345 7.38811 8.78227C7.95342 9.17109 8.62675 9.37219 9.3127 9.35708C9.99866 9.34196 10.6625 9.11141 11.2101 8.69806C11.7578 8.28472 12.1615 7.70955 12.3641 7.05402C12.5666 6.39849 12.5578 5.69583 12.3389 5.04558C12.12 4.39533 11.702 3.83044 11.1442 3.43095C10.5863 3.03145 9.91695 2.81759 9.23083 2.81966ZM17.5571 5.67C15.9701 2.57355 12.8283 0.478516 9.23083 0.478516C5.63337 0.478516 2.49068 2.57501 0.904558 5.67029C0.837614 5.80272 0.802734 5.94902 0.802734 6.0974C0.802734 6.24579 0.837614 6.39209 0.904558 6.52452C2.49156 9.62097 5.63337 11.716 9.23083 11.716C12.8283 11.716 15.971 9.61951 17.5571 6.52422C17.6241 6.3918 17.6589 6.24549 17.6589 6.09711C17.6589 5.94873 17.6241 5.80242 17.5571 5.67ZM9.23083 10.3113C6.34391 10.3113 3.69725 8.70178 2.26798 6.09726C3.69725 3.49274 6.34362 1.8832 9.23083 1.8832C12.118 1.8832 14.7644 3.49274 16.1937 6.09726C14.7647 8.70178 12.118 10.3113 9.23083 10.3113Z"
                    fill="#787878"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                >
                  <path
                    d="M1.53846 1.05359L2.52308 0.0766602L15.3846 12.9382L14.4077 13.9228L12.0385 11.5536C11.1539 11.8459 10.2154 11.9998 9.23078 11.9998C5.38462 11.9998 2.1 9.60745 0.769226 6.23052C1.3 4.87667 2.14615 3.68436 3.22308 2.7382L1.53846 1.05359ZM9.23078 3.92282C9.84282 3.92282 10.4298 4.16595 10.8626 4.59873C11.2954 5.03151 11.5385 5.61848 11.5385 6.23052C11.5389 6.49249 11.4946 6.75262 11.4077 6.99975L8.46155 4.05359C8.70868 3.96666 8.96881 3.92243 9.23078 3.92282ZM9.23078 0.461276C13.0769 0.461276 16.3616 2.85359 17.6923 6.23052C17.0642 7.82509 15.9974 9.20923 14.6154 10.2228L13.5231 9.12283C14.5869 8.38702 15.4449 7.39137 16.0154 6.23052C15.3936 4.96118 14.4281 3.89177 13.2288 3.14386C12.0294 2.39595 10.6442 1.99956 9.23078 1.99974C8.39232 1.99974 7.56924 2.1382 6.80001 2.38436L5.61539 1.20743C6.72309 0.730508 7.94617 0.461276 9.23078 0.461276ZM2.44615 6.23052C3.06796 7.49986 4.03343 8.56927 5.2328 9.31718C6.43217 10.0651 7.81733 10.4615 9.23078 10.4613C9.76155 10.4613 10.2846 10.4075 10.7692 10.2998L9.0154 8.53822C8.48014 8.48084 7.98065 8.24197 7.59999 7.86131C7.21934 7.48066 6.98046 6.98117 6.92309 6.4459L4.3077 3.82282C3.54616 4.47667 2.90769 5.29206 2.44615 6.23052Z"
                    fill="#787878"
                  />
                </svg>
              )}
            </button>
          }
        </div>
        <button
          disabled={isSubmitting}
          className="w-full bg-app-secondary p-2 rounded-lg text-black duration-300 hover:bg-app-secondary/55"
          type="submit"
        >
          Cambiar contraseña
        </button>
        {errors.root && (
          <p className="text-xs text-red-300">{errors.root.message}</p>
        )}
        {isSubmitSuccessful && (
          <p className="text-xs text-green-300">
            Se actualizó la contraseña correctamente.
          </p>
        )}
        <div className="pt-4 text-sm underline duration-300 hover:text-white/">
          <Link href={routes.auth.login}>Volver al inicio de sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
