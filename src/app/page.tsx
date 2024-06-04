import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import InfiniteScrollFabrics from '@/ui/organisms/infiniteScrollFabrics/InfiniteScrollFabrics';
import { fetchProducts } from './actions';

export default async function Home() {
  const data = await fetchProducts({});

  return (
    <main className="app-container py-12">
      <div className="pb-8 text-center">
        <StepTitle title="Crea tu diseño" ribbon="center" />
        <p className="max-w-96 mx-auto pt-4 text-app text-balance">
          Para comenzar a crear tu propia camisa, selecciona en primer lugar la
          tela.{' '}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] ">
        <InfiniteScrollFabrics initialData={data.items} nextPage={data.next} />
      </div>
    </main>
  );
}
