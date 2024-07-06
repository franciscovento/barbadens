import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  searchParams: {
    code: string;
  };
}
const page: FC<Props> = async ({ searchParams }) => {
  const code = searchParams?.code;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-app-primary text-white">
      <div className="flex flex-col gap-2 items-center">
        <EnvelopeOpenIcon width={100} height={100} />
        <p className="max-w-80 text-center">
          CORREO ELECTRONICO VERIFICADO, REGRESA AL FORMULARIO E{' '}
          <Link
            className="duration-300 hover:text-app-accent"
            href={'/auth/login'}
          >
            INICIA SESIÓN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
