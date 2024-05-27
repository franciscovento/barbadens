import CheckoutStepper from '@/ui/checkoutStepper/CheckoutStepper';
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
      <section className="max-w-lg mx-auto px-2 md:px-8 py-4">
        <CheckoutStepper />
      </section>
      <main className="app-container py-12">{children}</main>
    </>
  );
};

export default layout;
