import Header from '@/ui/organisms/header/Header';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default layout;
