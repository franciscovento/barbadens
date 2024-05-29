'use client';
import { appModal } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/customShirt/customShirt.store';
import { collarOptions } from '@/utils/data/shirtOptions';
import Image from 'next/image';
import SelectAttribute from '../SelectAttribute';

const SelectCollar = () => {
  const collar = useCustomShirt((state) => state.collar);
  const currentCollar = collarOptions.find((p) => p.id === collar);
  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de Cuello',
      html: <Options />,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de Cuello"
      name={currentCollar?.label || 'Con botones'}
      image="/images/option-test.png"
      onClick={openModel}
    />
  );
};

export default SelectCollar;

const Options = () => {
  const updateCollar = useCustomShirt((state) => state.updateCollar);

  const updateCollarValue = (collar: number) => {
    updateCollar(collar);
    appModal.clickConfirm();
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      {collarOptions.map((cuff) => (
        <button
          key={cuff.id}
          onClick={() => updateCollarValue(cuff.id)}
          className="text-app-text py-2 rounded-md border border-text hover:scale-95 duration-300 opacity-80 hover:opacity-100"
        >
          {cuff.label}
          <Image
            className="mx-auto"
            src={cuff.image}
            alt={cuff.label}
            width={320}
            height={160}
          />
        </button>
      ))}
    </div>
  );
};
