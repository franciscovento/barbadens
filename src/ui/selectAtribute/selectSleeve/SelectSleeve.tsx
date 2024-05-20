'use client';
import { appModal } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/customShirt/customShirt.store';
import { sleeveOptions } from '@/utils/data/shirtOptions';
import Image from 'next/image';
import SelectAttribute from '../SelectAttribute';

const SelectSleeve = () => {
  const sleeve = useCustomShirt((state) => state.sleeve);
  const currentSleeve = sleeveOptions.find((s) => s.id === sleeve);
  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de manga:',
      html: <Options />,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de manga"
      name={currentSleeve?.label || 'Manga larga'}
      image="/images/option-test.png"
      onClick={openModel}
    />
  );
};

export default SelectSleeve;

const Options = () => {
  const updateSleeve = useCustomShirt((state) => state.updateSleeve);

  const updateSleeveModal = (sleeve: number) => {
    updateSleeve(sleeve);
    appModal.clickConfirm();
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      {sleeveOptions.map((sleeve) => (
        <button
          key={sleeve.id}
          onClick={() => updateSleeveModal(sleeve.id)}
          className="text-text py-2 rounded-md border border-text hover:scale-95 duration-300 opacity-80 hover:opacity-100"
        >
          {sleeve.label}
          <Image
            className="mx-auto"
            src={sleeve.image}
            alt={sleeve.label}
            width={320}
            height={160}
          />
        </button>
      ))}
    </div>
  );
};
