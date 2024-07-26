import HeaderLogin from '@/ui/molecules/headerLogin/HeaderLogin';
import Image from 'next/image';
import Link from 'next/link';

const StoreHeader = () => {
  return (
    <header className="bg-app-primary h-16 w-full px-8 flex items-center justify-between fixed top-0 left-0 z-40">
      <Link href={'/create'}>
        <Image
          width={160}
          height={45}
          src="/images/logo.png"
          alt="logo barbadens"
        />
      </Link>
      <HeaderLogin />
    </header>
  );
};

export default StoreHeader;
