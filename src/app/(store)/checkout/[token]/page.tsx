import { getCheckoutByToken } from '@/services/api/bsale/checkout.services';
import { FC } from 'react';

interface Props {
  params: {
    token: string;
  };
}
const page: FC<Props> = async ({ params }) => {
  const response = await getCheckoutByToken(params.token);
  // console.log(error);

  return (
    <main className="app-container py-8 mt-16">
      {JSON.stringify(response?.data)}
    </main>
  );
};

export default page;
