'use client';
import { checkoutMock } from '@/utils/data/mocks/checkout.mock';
import axios from 'axios';
import { FC } from 'react';

interface Props {
  params: {
    token: string;
  };
}
const page: FC<Props> = ({ params }) => {
  const handleClick = async () => {
    const response = await axios.post('/api/checkout', checkoutMock);
    console.log(response);

    return response;
  };
  return (
    <main className="app-container py-8 mt-16">
      <div>token : {params.token}</div>
      <button onClick={handleClick}>generate checkout</button>
      {/* <form action={createNewCheckout}>
        <button>Crear checkout</button>
      </form> */}
    </main>
  );
};

export default page;
