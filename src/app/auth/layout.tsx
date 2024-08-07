import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}
const layout: FC<Props> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default layout;
