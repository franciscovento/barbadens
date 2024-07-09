'use client';
import { appModal } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/design/design.store';
import { Collar } from '@/utils/types/design.interface';
import Image from 'next/image';
import { FC } from 'react';
import SelectAttribute from '../SelectAttribute';

interface Props {
  collarOptions: Collar[];
}
const SelectCollar: FC<Props> = ({ collarOptions }) => {
  const collarId = useCustomShirt((state) => state.shirt_collar_id);
  const currentCollar = collarOptions.find((p) => p.id === collarId);

  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de Cuello',
      html: <Options options={collarOptions} />,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de Cuello"
      name={currentCollar?.name || '-'}
      image={currentCollar?.image || '/images/option-test.png'}
      onClick={openModel}
    />
  );
};

export default SelectCollar;

const Options = ({ options }: { options: Collar[] }) => {
  const updateCollar = useCustomShirt((state) => state.updateCollarId);

  const updateCollarValue = (collar: number) => {
    updateCollar(collar);
    appModal.clickConfirm();
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      {options.map((collar) => (
        <button
          key={collar.id}
          onClick={() => updateCollarValue(collar.id)}
          className="text-app-text py-2 rounded-md border border-text hover:scale-95 duration-300 opacity-80 hover:opacity-100"
        >
          {collar.name}
          <Image
            className="mx-auto"
            src={collar.image || '/images/option-test.png'}
            alt={collar.name}
            width={320}
            height={160}
          />
        </button>
      ))}
    </div>
  );
};
