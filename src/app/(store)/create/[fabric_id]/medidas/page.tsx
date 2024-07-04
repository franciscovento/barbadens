'use client';
import useMeasuresStoreData from '@/utils/hooks/useMeasuresStoreData';
import { FC } from 'react';
import MeasureForm from './MeasureForm';

const Medidas: FC = () => {
  const data = useMeasuresStoreData();
  return <MeasureForm profileMeasures={data} />;
};

export default Medidas;
