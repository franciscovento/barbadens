'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface LoginProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const supabase = createClient();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginProps, type: 'login' | 'register') => {
    try {
      if (type === 'register') {
        const { data: response, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              type: 'client',
            },
          },
        });
        if (error) {
          throw error;
        }
        console.log(response);
      } else {
        const { data: response, error } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (error) {
          throw error;
        }
        console.log(response);

        // return router.push('/account');
      }
    } catch (error) {
      return console.error(error);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <form
        onSubmit={handleSubmit((e) => onSubmit(e, 'login'))}
        className="bg-blue-gray-100 flex flex-col gap-2 border-black border p-4"
      >
        LOGIN
        <label className="flex flex-col gap-2">
          Email
          <input type="text" {...register('email')} />
        </label>
        <label className="flex flex-col gap-2">
          Password
          <input type="password" {...register('password')} />
        </label>
        <label>
          <button
            disabled={isSubmitting}
            className="bg-black text-white p-1 rounded-sm disabled:bg-blue-gray-200"
          >
            Ingresar
          </button>
        </label>
      </form>
      <button onClick={logout}>CERRAR SESIóN</button>
      {/* <form
        onSubmit={handleSubmit((e) => onSubmit(e, 'register'))}
        className="bg-blue-gray-100 flex flex-col gap-2 border-black border p-4"
      >
        REGISTER
        <label className="flex flex-col gap-2">
          Email
          <input type="text" {...register('email')} />
        </label>
        <label className="flex flex-col gap-2">
          Password
          <input type="password" {...register('password')} />
        </label>
        <label>
          <button
            disabled={isSubmitting}
            className="bg-black text-white p-1 rounded-sm disabled:bg-blue-gray-200"
          >
            Ingresar
          </button>
        </label>
      </form> */}
    </div>
  );
};

export default LoginPage;
