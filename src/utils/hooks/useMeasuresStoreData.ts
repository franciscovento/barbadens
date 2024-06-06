import { useMeasures } from '@/stores';

const useMeasuresStoreData = () => {
  const id = useMeasures((state) => state).id;
  const profile_name = useMeasures((state) => state).profile_name;
  const chest = useMeasures((state) => state).chest;
  const back = useMeasures((state) => state).back;
  const shoulder = useMeasures((state) => state).shoulder;
  const long = useMeasures((state) => state).long;
  const collar = useMeasures((state) => state).collar;
  const sleeve_long = useMeasures((state) => state).sleeve_long;
  const sleeve_width = useMeasures((state) => state).sleeve_width;
  const hip = useMeasures((state) => state).hip;
  const waist = useMeasures((state) => state).waist;
  const fist = useMeasures((state) => state).fist;

  return {
    id,
    profile_name,
    chest,
    back,
    shoulder,
    long,
    collar,
    sleeve_long,
    sleeve_width,
    hip,
    waist,
    fist,
  };
};

export default useMeasuresStoreData;
