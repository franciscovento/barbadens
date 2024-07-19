import { UserIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Barbadens - Blog',
  description: 'Contenido a la medida',
  keywords: ['camisas', 'medida', 'blog', 'barbadens'],
};

const page = () => {
  return (
    <main className="mt-16">
      <div className="p-4">
        <div className=" rounded-2xl w-full h-[500px] relative">
          <Image
            src={'/images/model-test.jpg'}
            className=" rounded-2xl object-cover "
            fill
            alt=""
          />
          <div className="absolute bottom-8 left-4 text-white px-4 flex flex-col gap-2">
            <span className="font-medium">Destacado</span>
            <h3 className="text-3xl font-bold">
              Como elegir tus medidas y sobrevivir en el intento
            </h3>
            <p className="max-w-[650px] text-balance">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vel
              ullam possimus corporis aut eveniet error est explicabo! Ab, id.
              Ea nihil accusamus eius{' '}
            </p>
            <Link href={'/blog'} className="underline ">
              Leer más
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h3 className="text-2xl font-semibold">Post más recientes</h3>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8 py-4">
          <article className="flex flex-col gap-2">
            <div className="relative w-full h-48">
              <Image
                src={'/images/model-test.jpg'}
                className="rounded-2xl object-cover"
                fill
                alt=""
              />
            </div>
            <h3 className="text-lg font-semibold ">Como hacerte las medidas</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              inventore, perspiciatis perferendis tenetur itaque iusto quis
              atque, possimus voluptatibus rem et saepe.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <UserIcon className="w-4" />
                <span>Barbadens</span>
              </div>
              <span>20 jul 2024</span>
            </div>
          </article>
          <article className="flex flex-col gap-2">
            <div className="relative w-full h-48">
              <Image
                src={'/images/model-test.jpg'}
                className="rounded-2xl object-cover"
                fill
                alt=""
              />
            </div>
            <h3 className="text-lg font-semibold ">Como hacerte las medidas</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              inventore, perspiciatis perferendis tenetur itaque iusto quis
              atque, possimus voluptatibus rem et saepe.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <UserIcon className="w-4" />
                <span>Barbadens</span>
              </div>
              <span>20 jul 2024</span>
            </div>
          </article>
          <article className="flex flex-col gap-2">
            <div className="relative w-full h-48">
              <Image
                src={'/images/model-test.jpg'}
                className="rounded-2xl object-cover"
                fill
                alt=""
              />
            </div>
            <h3 className="text-lg font-semibold ">Como hacerte las medidas</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              inventore, perspiciatis perferendis tenetur itaque iusto quis
              atque, possimus voluptatibus rem et saepe.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <UserIcon className="w-4" />
                <span>Barbadens</span>
              </div>
              <span>20 jul 2024</span>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default page;
