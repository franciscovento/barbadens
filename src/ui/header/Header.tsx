import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-primary h-16 w-full px-8">
      <Link href={'/'}>
        <Image
          width={160}
          height={45}
          src="/images/logo.png"
          alt="logo barbadens"
        />
      </Link>
    </header>
  );
};

export default Header;
