'use client';
import { appModal } from '@/services/modals/appModal';
import { SleeveType, useCustomShirt } from '@/stores/design/design.store';
import { sleeveOptions } from '@/utils/data/shirtOptions';
import Image from 'next/image';
import SelectAttribute from '../SelectAttribute';

const SelectSleeve = () => {
  const sleeve = useCustomShirt((state) => state.sleeve_type);
  const currentSleeve = sleeveOptions.find((s) => s.label === sleeve);

  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de manga:',
      html: <Options />,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de manga"
      name={currentSleeve?.label || '-'}
      image={currentSleeve?.image || '/images/option-test.png'}
      onClick={openModel}
    />
  );
};

export default SelectSleeve;

const Options = () => {
  const updateSleeve = useCustomShirt((state) => state.updateSleeveType);
  const setCuffToNull = useCustomShirt((state) => state.setCuffToNull);
  const updateCuff = useCustomShirt((state) => state.updateCuffId);
  const updateSleeveModal = (sleeve: SleeveType) => {
    updateSleeve(sleeve);
    if (sleeve === 'manga corta') {
      setCuffToNull();
      return appModal.clickConfirm();
    }
    updateCuff(1);
    return appModal.clickConfirm();
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      {sleeveOptions.map((sleeve) => (
        <button
          key={sleeve.id}
          onClick={() => updateSleeveModal(sleeve.label as SleeveType)}
          className="text-app-text py-2 rounded-md border border-text hover:scale-95 duration-300 opacity-80 hover:opacity-100"
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
