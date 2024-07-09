'use client';
import { useCustomShirt } from '@/stores';
import { getCurrentDesign } from '@/utils/getCurrentDesing';
import { Design } from '@/utils/types/design.interface';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  designs: Design[];
  fabric_id: string;
}
const PersonalizeButton: FC<Props> = ({ designs, fabric_id }) => {
  const { shirt_collar_id, shirt_pocket_id, sleeve_type, shirt_cuff_id } =
    useCustomShirt();
  const currentDesign = getCurrentDesign(designs, {
    shirt_collar_id,
    shirt_pocket_id,
    sleeve_type,
    shirt_cuff_id,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const completeStep = () => {
    setIsLoading(true);
    router.push(
      `/create/${fabric_id}/medidas?shirt_design_id=${currentDesign?.id}`
    );
  };

  return (
    <Button loading={isLoading} disabled={isLoading} onClick={completeStep}>
      Completar paso
    </Button>
  );
};

export default PersonalizeButton;
