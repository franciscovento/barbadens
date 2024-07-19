import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const page = () => {
  return (
    <main className="mt-16">
      <div className="p-4">
        <div className=" rounded-2xl w-full h-[500px] relative">
          <Image
            src={'/images/model-test.jpg'}
            className=" rounded-2xl object-cover"
            fill
            alt=""
          />
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
