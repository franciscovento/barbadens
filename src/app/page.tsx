import FabricCard from '@/ui/fabricCard/FabricCard';

export default function Home() {
  return (
    <main className="app-container py-12">
      <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))]">
        {Array.from({ length: 12 }).map((_, index) => {
          return <FabricCard key={index} />;
        })}
      </div>
    </main>
  );
}
