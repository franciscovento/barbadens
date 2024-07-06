import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import InfiniteScrollFabrics from '@/ui/organisms/infiniteScrollFabrics/InfiniteScrollFabrics';
import Link from 'next/link';
import { fetchFabrics } from './actions';

const CreatePage = async () => {
  const data = await fetchFabrics({});

  return (
    <>
      <Link href="/test">TEST</Link>
      <div className="pb-8 text-center">
        <StepTitle title="Crea tu diseño" ribbon="center" />
        <p className="max-w-96 mx-auto pt-4 text-app text-balance">
          Para comenzar a crear tu propia camisa, selecciona en primer lugar la
          tela.{' '}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] ">
        {data.data && (
          <InfiniteScrollFabrics initialData={data.data} nextPage={data.next} />
        )}
      </div>
    </>
  );
};

export default CreatePage;
