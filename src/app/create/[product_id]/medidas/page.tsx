'use client';
import MeasureForm from '@/ui/organisms/measuresForm/MeasureForm';
import useMeasuresStoreData from '@/utils/hooks/useMeasuresStoreData';
import { FC } from 'react';

interface Props {
  params: {
    product_id: string;
  };
}
const Medidas: FC<Props> = () => {
  const data = useMeasuresStoreData();

  return <MeasureForm defaultValues={data} />;
};

export default Medidas;
