'use client';
import Image from 'next/image';
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
        <Image
          className="block w-32 h-14 border border-gray-400 rounded-lg"
          src={image}
          alt={name}
          width={128}
          height={56}
        />

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
