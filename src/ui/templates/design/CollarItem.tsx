'use client';
import { useCustomShirt } from '@/stores';
import { Collar } from '@/utils/types/design.interface';
import { FC } from 'react';

interface Props {
  collarOptions: Collar[];
}
const CollarItem: FC<Props> = ({ collarOptions }) => {
  const collarId = useCustomShirt((state) => state.shirt_collar_id);
  const currentCollar = collarOptions.find((p) => p.id === collarId);

  return (
    currentCollar && (
      <g dangerouslySetInnerHTML={{ __html: currentCollar?.component }}></g>
    )
  );
};

export default CollarItem;
