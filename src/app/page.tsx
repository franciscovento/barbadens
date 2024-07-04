import { redirect } from 'next/navigation';

export default function Home() {
  return redirect('/create');
  // return (
  //   <>
  //     <main className="app-container py-12">PAGINA LANDING</main>
  //   </>
  // );
}
