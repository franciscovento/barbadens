'use client';
import MeasureForm from '@/ui/organisms/measuresForm/MeasureForm';
import useMeasuresStoreData from '@/utils/hooks/useMeasuresStoreData';
import { FC } from 'react';

const Medidas: FC = () => {
  const data = useMeasuresStoreData();
  const { profileName, ...measures } = data;
  return <MeasureForm measures={measures} profileName={profileName} />;
};

export default Medidas;
