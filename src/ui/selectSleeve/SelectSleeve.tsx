'use client';
import { Sleeve } from '@/utils/types/Shirt.enum';
import { useState } from 'react';
import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';
import SelectAttribute from '../selectAtribute/SelectAttribute';

const SelectSleeve = () => {
  const [selected, setSelected] = useState<Sleeve>(Sleeve.long);
  const MySwal = withReactContent(Swal);
  const openModel = () => {
    MySwal.fire({
      title: 'Selecciona el tipo de manga',
      html: `
        <div class="flex flex-col gap-4">
          <button class="bg-blue-500 text-white py-2 rounded-md">Manga larga</button>
          <button  class="bg-blue-500 text-white py-2 rounded-md">Manga corta</button>
        </div>
      `,
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
  return (
    <div className="flex flex-col gap-4">
      <button className="bg-blue-500 text-white py-2 rounded-md">
        Manga larga
      </button>
      <button className="bg-blue-500 text-white py-2 rounded-md">
        Manga corta
      </button>
    </div>
  );
};
