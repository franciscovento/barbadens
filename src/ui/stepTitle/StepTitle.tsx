import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  title: string;
  ribbon?: 'center' | 'left' | 'right';
}
const StepTitle: FC<Props> = ({ title, ribbon = 'left' }) => {
  return (
    <h1
      className={clsx('font-semibold text-2xl flex flex-col gap-1', {
        'items-center': ribbon === 'center',
        'items-start': ribbon === 'left',
        'items-end': ribbon === 'right',
      })}
    >
      {title} <span className="block h-[5px] w-[40px] bg-black"></span>
    </h1>
  );
};

export default StepTitle;
