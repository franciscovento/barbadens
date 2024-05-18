import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-primary h-16 w-full px-8">
      <Image
        width={160}
        height={45}
        src="/images/logo.png"
        alt="logo barbadens"
      />
    </header>
  );
};

export default Header;
