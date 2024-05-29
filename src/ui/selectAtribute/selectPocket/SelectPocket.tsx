'use client';
import { appModal } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/customShirt/customShirt.store';
import { pocketOptions } from '@/utils/data/shirtOptions';
import Image from 'next/image';
import SelectAttribute from '../SelectAttribute';

const SelectPocket = () => {
  const pocket = useCustomShirt((state) => state.pocket);
  const currentPocket = pocketOptions.find((p) => p.id === pocket);
  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de bolsillo:',
      html: <Options />,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de bolsillo"
      name={currentPocket?.label || 'Sin bolsillo'}
      image="/images/option-test.png"
      onClick={openModel}
    />
  );
};

export default SelectPocket;

const Options = () => {
  const updatePocket = useCustomShirt((state) => state.updatePocket);

  const updatePocketValue = (pocket: number) => {
    updatePocket(pocket);
    appModal.clickConfirm();
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      {pocketOptions.map((pocket) => (
        <button
          key={pocket.id}
          onClick={() => updatePocketValue(pocket.id)}
          className="text-app-text py-2 rounded-md border border-text hover:scale-95 duration-300 opacity-80 hover:opacity-100"
        >
          {pocket.label}
          <Image
            className="mx-auto"
            src={pocket.image}
            alt={pocket.label}
            width={320}
            height={160}
          />
        </button>
      ))}
    </div>
  );
};
