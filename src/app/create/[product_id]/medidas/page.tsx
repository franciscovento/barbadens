'use client';
import useMeasuresStoreData from '@/hooks/useMeasuresStoreData';
import MeasureForm from '@/ui/measuresForm/MeasureForm';
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
