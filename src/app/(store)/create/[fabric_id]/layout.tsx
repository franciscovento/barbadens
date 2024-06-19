import CheckoutStepper from '@/ui/organisms/checkoutStepper/CheckoutStepper';
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
      <section
        id="stepper-container"
        className=" max-w-lg mx-auto px-2 md:px-8 pb-12  "
      >
        <CheckoutStepper />
      </section>
      <div>{children}</div>
    </>
  );
};

export default layout;
