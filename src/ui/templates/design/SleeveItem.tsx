'use client';
import { useCustomShirt } from '@/stores';
import { sleeveOptions } from '@/utils/data/shirtOptions';
import { CurrencyEuroIcon } from '@heroicons/react/24/outline';

const SleeveItem = () => {
  const sleeveType = useCustomShirt((state) => state.sleeve_type);

  const currentSleeve = sleeveOptions.find((p) => p.label === sleeveType);

  return (
    <g>
      {currentSleeve?.label === 'manga larga' ? <CurrencyEuroIcon /> : null}
    </g>
  );
};

export default SleeveItem;
