import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
  params: {
    product_id: string;
  };
}

const layout: FC<Props> = ({ children }) => {
  return (
    <>
      <main className="app-container mt-16 py-8">{children}</main>
    </>
  );
};

export default layout;
