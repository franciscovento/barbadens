'use client';
import SelectCard from '@/ui/atoms/selectCard/SelectCard';
import { FC, useState } from 'react';

interface Props {
  onSelect: (_value: any) => void;
  options: { name: string; description: string; id: number; icon?: string }[];
  defaultValue: number;
}

const OptionsPayments: FC<Props> = ({ onSelect, options, defaultValue }) => {
  const [state, setState] = useState(defaultValue);

  const handleSelect = (id: number) => {
    const itemSelected = options.find((option) => option.id === id);
    setState(id);
    onSelect(itemSelected?.id.toString() || '');
  };

  return options.map((option) => {
    return (
      <SelectCard
        key={option.id}
        title={option.name}
        description={option.description}
        isActive={state === option.id}
        onClick={() => handleSelect(option.id)}
        icon={option.icon}
      />
    );
  });
};

export default OptionsPayments;
