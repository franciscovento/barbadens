import { useMeasures } from '@/stores';

const useMeasuresStoreData = () => {
  const chest = useMeasures((state) => state).chest;
  const left_fist = useMeasures((state) => state).left_fist;
  const left_sleeve = useMeasures((state) => state).left_sleeve;
  const length = useMeasures((state) => state).length;
  const neck = useMeasures((state) => state).neck;
  const right_fist = useMeasures((state) => state).right_fist;
  const right_sleeve = useMeasures((state) => state).right_sleeve;
  const shoulder = useMeasures((state) => state).shoulder;
  const waist = useMeasures((state) => state).waist;

  return {
    chest,
    left_fist,
    left_sleeve,
    length,
    neck,
    right_fist,
    right_sleeve,
    shoulder,
    waist,
  };
};

export default useMeasuresStoreData;
