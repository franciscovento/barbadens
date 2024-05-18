import { FC } from 'react';

interface Props {
  title: string;
}
const StepTitle: FC<Props> = ({ title }) => {
  return (
    <h1 className="font-semibold text-2xl flex flex-col gap-1">
      {title} <span className="block h-[5px] w-[40px] bg-black"></span>
    </h1>
  );
};

export default StepTitle;
