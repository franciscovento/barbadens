'use client';
import { createClient } from '@/utils/supabase/client';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { AuthError } from '@supabase/supabase-js';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const Page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const submit = async (data: { email: string }) => {
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/changue-password`,
        }
      );
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
    <div className="min-h-[calc(100vh-65px)] bg-app-primary flex items-center justify-center flex-col text-white">
      <form
        onSubmit={handleSubmit(submit)}
        className="border border-white flex flex-col justify-center items-center gap-4 p-8 rounded-lg w-96 max-w-full"
      >
        <div className="p-4 text-center rounded-full border border-white w-28 h-28 flex items-center justify-center">
          <LockClosedIcon color="white" width={96} height={96} />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center text-center">
          <p className="text-lg font-semibold">¿Problemas iniciando sesión?</p>
          <p className="text-sm">
            Ingresa tu correo electrónico y te enviaremos un link para que
            puedas cambiar tu contraseña
          </p>
        </div>
        <input
          className="p-2 w-full rounded-lg bg-transparent border border-white text-white"
          {...register('email', { required: true })}
          placeholder="Email"
        />
        <button
          disabled={isSubmitting}
          className="w-full bg-app-secondary p-2 rounded-lg text-black duration-300 hover:bg-app-secondary/55"
          type="submit"
        >
          Enviar
        </button>
        {errors.root && (
          <p className="text-xs text-red-300">{errors.root.message}</p>
        )}
        {isSubmitSuccessful && (
          <p className="text-xs text-green-300">
            Se envió un correo electrónico a la dirección que proporcionaste.
          </p>
        )}
        <div className="pt-4 text-sm underline duration-300 hover:text-white/">
          <Link href={'/auth'}>Volver al inicio de sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
