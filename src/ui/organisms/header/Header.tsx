import HeaderLogin from '@/ui/molecules/headerLogin/HeaderLogin';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-app-primary h-16 w-full px-8 flex items-center justify-between">
      <Link href={'/'}>
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

export default Header;
