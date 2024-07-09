'use client';
import { appModal } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/design/design.store';
import { Pocket } from '@/utils/types/design.interface';
import Image from 'next/image';
import { FC } from 'react';
import SelectAttribute from '../SelectAttribute';

interface Props {
  pocketOptions: Pocket[];
}
const SelectPocket: FC<Props> = ({ pocketOptions }) => {
  const pocketId = useCustomShirt((state) => state.shirt_pocket_id);
  const currentPocket = pocketOptions.find((p) => p.id === pocketId);
  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de bolsillo:',
      html: <Options options={pocketOptions} />,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de bolsillo"
      name={currentPocket?.name || '-'}
      image={currentPocket?.image || '/images/option-test.png'}
      onClick={openModel}
    />
  );
};

export default SelectPocket;

const Options = ({ options }: { options: Pocket[] }) => {
  const updatePocket = useCustomShirt((state) => state.updatePocketId);

  const updatePocketValue = (pocket: number) => {
    updatePocket(pocket);
    appModal.clickConfirm();
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      {options.map((pocket) => (
        <button
          key={pocket.id}
          onClick={() => updatePocketValue(pocket.id)}
          className="text-app-text py-2 rounded-md border border-text hover:scale-95 duration-300 opacity-80 hover:opacity-100"
        >
          {pocket.name}
          <Image
            className="mx-auto"
            src={pocket.image || '/images/option-test.png'}
            alt={pocket.name}
            width={320}
            height={160}
          />
        </button>
      ))}
    </div>
  );
};
