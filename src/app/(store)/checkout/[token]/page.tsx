import { FC } from 'react';

interface Props {
  params: {
    token: string;
  };
}
const page: FC<Props> = ({ params }) => {
  console.log(params);

  return (
    <main className="app-container py-8 mt-16">
      <div>token : {params.token}</div>
    </main>
  );
};

export default page;
