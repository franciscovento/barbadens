import FabricCard from '@/ui/fabricCard/FabricCard';
import StepTitle from '@/ui/stepTitle/StepTitle';
import { fabrics } from '@/utils/data/fabrics';

export default function Home() {
  return (
    <main className="app-container py-12">
      <div className="pb-8 text-center">
        <StepTitle title="Crea tu diseño" ribbon="center" />
        <p className="max-w-96 mx-auto pt-4 text-text text-balance">
          Para comenzar a crear tu propia camisa, selecciona en primer lugar la
          tela.{' '}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))]">
        {fabrics.map((fabric, index) => {
          return <FabricCard key={index} {...fabric} />;
        })}
        {fabrics.map((fabric, index) => {
          return <FabricCard key={index} {...fabric} />;
        })}
        {fabrics.map((fabric, index) => {
          return <FabricCard key={index} {...fabric} />;
        })}
      </div>
    </main>
  );
}
