import { getWebDescription } from '@/services/api/bsale/products.services';
import FabricDetails from '@/ui/atoms/fabricDetails/FabricDetails';
import { generateAttributes } from '@/utils/generateFabricAttributes';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  fabric_id: number;
}
const FabricInfo: FC<Props> = async ({ fabric_id }) => {
  const { data } = await getWebDescription(fabric_id);
  const fabric = data[0];

  const attributes = generateAttributes(fabric.descriptions);

  return (
    <div className="pt-5 grid grid-cols-2 gap-4 sm:gap-8">
      <div className="relative flex-shrink-0 ">
        <Image src={fabric.urlImg} fill alt="tela" className="object-cover" />
      </div>
      <FabricDetails title={fabric.name} attributes={attributes} />
    </div>
  );
};

export default FabricInfo;
