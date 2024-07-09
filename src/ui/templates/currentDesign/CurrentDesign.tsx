'use client';
import { getCurrentDesign } from '@/utils/getCurrentDesing';
import useShirtDesign from '@/utils/hooks/useShirtDesign.hooks';
import { Design } from '@/utils/types/design.interface';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  designs: Design[];
}
const CurrentDesign: FC<Props> = ({ designs }) => {
  const { shirt_collar_id, shirt_cuff_id, shirt_pocket_id, sleeve_type } =
    useShirtDesign();

  const currentDesign = getCurrentDesign(designs, {
    shirt_collar_id,
    shirt_cuff_id,
    shirt_pocket_id,
    sleeve_type,
  });

  return (
    <Image
      src={currentDesign?.image || '/images/camisa-test.png'}
      alt="camisa a la medida"
      width={370}
      height={250}
    />
  );
};

export default CurrentDesign;
