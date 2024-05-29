'use client';
import { FC, useState } from 'react';
import SelectCard from '../selectCard/SelectCard';

interface Props {
  onSelect: (_value: any) => void;
  options: { title: string; description: string; id: number }[];
}

const OptionsDeliveryRadio: FC<Props> = ({ onSelect, options }) => {
  const [state, setState] = useState(0);

  const handleSelect = (id: number) => {
    const itemSelected = options.find((option) => option.id === id);
    setState(id);
    onSelect(itemSelected?.id.toString() || '');
  };

  return (
    <div className="flex gap-4 flex-wrap md:flex-nowrap">
      {options.map((option) => {
        return (
          <SelectCard
            key={option.id}
            title={option.title}
            description={option.description}
            isActive={state === option.id}
            onClick={() => handleSelect(option.id)}
          />
        );
      })}
    </div>
  );
};

export default OptionsDeliveryRadio;
