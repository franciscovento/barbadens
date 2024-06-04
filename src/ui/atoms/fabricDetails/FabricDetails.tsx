import Link from 'next/link';
import { FC } from 'react';

interface Props {
  title: string;
  attributes: {
    [key: string]: string;
  }[];
}

const FabricDetails: FC<Props> = ({ title, attributes }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">{title}</span>
      <div>
        {attributes.map((att, index) => {
          return <Detail key={index} title={att.title} value={att.value} />;
        })}
      </div>
      <Link
        href={'/'}
        className="border border-black p-2 text-xs sm:text-sm text-center"
      >
        Selecciona nueva tela
      </Link>
    </div>
  );
};

export default FabricDetails;

interface DetailProps {
  title: string;
  value: string;
}
const Detail: FC<DetailProps> = ({ title, value }) => {
  return (
    <div className="grid grid-cols-2 text-xs font-normal gap-8 border-b py-1">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};
