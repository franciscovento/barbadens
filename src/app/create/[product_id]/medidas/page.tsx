import MeasureForm from '@/ui/measuresForm/MeasureForm';
import { FC } from 'react';

interface Props {
  params: {
    product_id: string;
  };
}
const Medidas: FC<Props> = () => {
  return <MeasureForm />;
};

export default Medidas;
