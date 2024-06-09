'use client';
import { getShirtCuffOptions } from '@/services/api/supabase/design.services';
import { appModal, errorToast } from '@/services/modals/appModal';
import { useCustomShirt } from '@/stores/design/design.store';
import { Cuff } from '@/utils/types/design.interface';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SelectAttribute from '../SelectAttribute';

const SelectCuff = () => {
  const [cuffOptions, setCuffOptions] = useState<Cuff[] | null>([]);
  const cuffId = useCustomShirt((state) => state.shirt_cuff_id);
  const cuffSelected = cuffOptions?.find((c) => c.id === cuffId);
  const openModel = () => {
    appModal.fire({
      title: 'Selecciona el tipo de Puño:',
      html: <Options cuffOptions={cuffOptions || []} />,
    });
  };

  useEffect(() => {
    const fetchCuffOptions = async () => {
      const response = await getShirtCuffOptions();
      if (response.error) {
        return errorToast(response.error.message);
      }
      console.log('here', response);
      setCuffOptions(response.data);
    };
    fetchCuffOptions();
  }, []);

  return (
    <SelectAttribute
      title="Tipo de puño"
      name={cuffSelected?.name || 'botones'}
      image={cuffSelected?.image || '/images/option-test.png'}
      onClick={openModel}
    />
  );
};

export default SelectCuff;

const Options = ({ cuffOptions }: { cuffOptions: Cuff[] }) => {
  const updateCuff = useCustomShirt((state) => state.updateCuffId);

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
          {cuff.name}
          <Image
            className="mx-auto"
            src={cuff.image || '/images/option-test.png'}
            alt={cuff.name}
            width={320}
            height={160}
          />
        </button>
      ))}
    </div>
  );
};
