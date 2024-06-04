'use client';
import { appModal } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/customShirt/customShirt.store';
import { cuffOptions } from '@/utils/data/shirtOptions';
import Image from 'next/image';
import SelectAttribute from '../SelectAttribute';

const SelectCuff = () => {
  const cuff = useCustomShirt((state) => state.cuff);
  const currentCuff = cuffOptions.find((p) => p.id === cuff);
  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de Puño:',
      html: <Options />,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de puño"
      name={currentCuff?.label || 'Con botones'}
      image="/images/option-test.png"
      onClick={openModel}
    />
  );
};

export default SelectCuff;

const Options = () => {
  const updateCuff = useCustomShirt((state) => state.updateCuff);

  const updateCuffValue = (cuff: number) => {
    updateCuff(cuff);
    appModal.clickConfirm();
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      {cuffOptions.map((cuff) => (
        <button
          key={cuff.id}
          onClick={() => updateCuffValue(cuff.id)}
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
