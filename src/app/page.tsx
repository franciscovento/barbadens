import FabricCard from '@/ui/fabricCard/FabricCard';
import { fabrics } from '@/utils/data/fabrics';

export default function Home() {
  return (
    <main className="app-container py-12">
      <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))]">
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
