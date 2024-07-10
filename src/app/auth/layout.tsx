import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}
const layout: FC<Props> = ({ children }) => {
  return (
    <>
      <main className=" mt-16">{children}</main>
    </>
  );
};

export default layout;
