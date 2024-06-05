import { useMeasures } from '@/stores';

const useMeasuresStoreData = () => {
  const chest = useMeasures((state) => state).chest;
  const back = useMeasures((state) => state).back;
  const shoulder = useMeasures((state) => state).shoulder;
  const long = useMeasures((state) => state).long;
  const collar = useMeasures((state) => state).collar;
  const sleeveLong = useMeasures((state) => state).sleeveLong;
  const sleeveWidth = useMeasures((state) => state).sleeveWidth;
  const hip = useMeasures((state) => state).hip;
  const waist = useMeasures((state) => state).waist;
  const fist = useMeasures((state) => state).fist;
  const profileName = useMeasures((state) => state).profileName;

  return {
    chest,
    back,
    shoulder,
    long,
    collar,
    sleeveLong,
    sleeveWidth,
    hip,
    waist,
    fist,
    profileName,
  };
};

export default useMeasuresStoreData;
