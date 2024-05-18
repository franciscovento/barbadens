'use client';
import { Sleeve } from '@/utils/types/Shirt.enum';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { useCustomShirt } from '@/stores/customShirt/customShirt.store';
import withReactContent from 'sweetalert2-react-content';
import SelectAttribute from '../selectAtribute/SelectAttribute';

const SelectSleeve = () => {
  const collar = useCustomShirt((state) => state.collar);
  console.log(collar, 'collar');

  const [selected, setSelected] = useState<Sleeve>(Sleeve.long);
  const MySwal = withReactContent(Swal);
  const openModel = () => {
    MySwal.fire({
      title: 'Selecciona el tipo de manga ',
      html: <Options />,
      showConfirmButton: false,
    });
  };

  return (
    <SelectAttribute
      title="Tipo de manga"
      name={selected === 0 ? 'Manga larga' : 'Manga corta'}
      image=""
      onClick={openModel}
    />
  );
};

export default SelectSleeve;

const Options = () => {
  const updateCollar = useCustomShirt((state) => state.updateCollar);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => updateCollar(0)}
        className="bg-blue-500 text-white py-2 rounded-md"
      >
        Manga larga
      </button>
      <button
        onClick={() => updateCollar(1)}
        className="bg-blue-500 text-white py-2 rounded-md"
      >
        Manga corta
      </button>
    </div>
  );
};
