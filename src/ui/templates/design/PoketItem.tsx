'use client';
import { useCustomShirt } from '@/stores';
import { Pocket } from '@/utils/types/design.interface';
import { FC } from 'react';

interface Props {
  pocketOptions: Pocket[];
}
const PocketItem: FC<Props> = ({ pocketOptions }) => {
  const pocketId = useCustomShirt((state) => state.shirt_pocket_id);
  const currentPocket = pocketOptions.find((p) => p.id === pocketId);
  return (
    currentPocket && (
      <g dangerouslySetInnerHTML={{ __html: currentPocket.component }}></g>
    )
  );
};

export default PocketItem;
