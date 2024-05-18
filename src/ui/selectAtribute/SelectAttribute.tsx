'use client';
import { FC } from 'react';

interface Props {
  title: string;
  image: string;
  name: string;
  onClick: () => void;
}

const SelectAttribute: FC<Props> = ({ title, image, name, onClick }) => {
  return (
    <div>
      <h6 className="font-bold pb-2">{title}:</h6>
      <div className="flex gap-4">
        <span className="block w-32 h-14 bg-blue-gray-300"></span>
        <div className="flex flex-col gap-2 items-start">
          <p className="font-semibold">{name}</p>
          <button className="uppercase text-blue-600 text-sm" onClick={onClick}>
            Cambiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAttribute;
