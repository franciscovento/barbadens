'use client';
import { useCustomShirt } from '@/stores';
import { Cuff } from '@/utils/types/design.interface';
import { FC } from 'react';

interface Props {
  cuffOptions: Cuff[];
}
const CuffItem: FC<Props> = ({ cuffOptions }) => {
  const cuffId = useCustomShirt((state) => state.shirt_cuff_id);

  const currentCuff = cuffOptions.find((p) => p.id === cuffId);

  return (
    currentCuff && (
      <g dangerouslySetInnerHTML={{ __html: currentCuff?.component }}></g>
    )
  );
};

export default CuffItem;
