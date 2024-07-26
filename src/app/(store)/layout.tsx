import StoreHeader from '@/ui/organisms/header/StoreHeader';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const layout: FC<Props> = ({ children }) => {
  return (
    <>
      <StoreHeader />
      {children}
    </>
  );
};

export default layout;
