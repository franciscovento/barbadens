import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}
const layout: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="h-16 px-8 bg-app-primary flex items-center">
        <Link href={'/create'}>
          <Image
            width={160}
            height={45}
            src="/images/logo.png"
            alt="logo barbadens"
          />
        </Link>
      </header>
      {children}
    </>
  );
};

export default layout;
