'use client';
import SelectCard from '@/ui/atoms/selectCard/SelectCard';
import { FC, useState } from 'react';

interface Props {
  onSelect: (_value: any) => void;
  options: { title: string; description: string; id: number; icon?: string }[];
}

const OptionsPayments: FC<Props> = ({ onSelect, options }) => {
  const [state, setState] = useState(0);

  const handleSelect = (id: number) => {
    const itemSelected = options.find((option) => option.id === id);
    setState(id);
    onSelect(itemSelected?.id.toString() || '');
  };

  return options.map((option) => {
    return (
      <SelectCard
        key={option.id}
        title={option.title}
        description={option.description}
        isActive={state === option.id}
        onClick={() => handleSelect(option.id)}
        icon={option.icon}
      />
    );
  });
};

export default OptionsPayments;
