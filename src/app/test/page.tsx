import { Spinner } from '@/ui/materialComponents';
import Image from 'next/image';
export default function Loading() {
  return (
    <div className="bg-app-primary min-h-screen flex flex-col justify-center items-center ">
      <Image
        src={'/images/logo.png'}
        width={350}
        height={100}
        // className="animate-pulse"
        alt="logo barbadens"
      />
      <Spinner className="h-8 w-8" />
    </div>
  );
}
