'use client';
import { getShirtCollarOptions } from '@/services/api/supabase/design.services';
import { appModal, errorToast } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/design/design.store';
import { Collar } from '@/utils/types/design.interface';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SelectAttribute from '../SelectAttribute';

const SelectCollar = () => {
  const [collarOptions, setCollarOptions] = useState<Collar[]>([]);
  const collarId = useCustomShirt((state) => state.shirt_collar_id);
  const currentCollar = collarOptions.find((p) => p.id === collarId);

  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de Cuello',
      html: <Options options={collarOptions} />,
    });
  };

  useEffect(() => {
    const fetchCollarOptions = async () => {
      const response = await getShirtCollarOptions();
      if (response.error) {
        return errorToast(response.error.message);
      }
      setCollarOptions(response?.data || []);
    };
    fetchCollarOptions();
  }, []);

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
