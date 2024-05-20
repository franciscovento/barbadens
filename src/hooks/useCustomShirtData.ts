import { useCustomShirt } from '@/stores';

const useCustomShirtData = () => {
  const sleeve = useCustomShirt((store) => store.sleeve);
  const cuff = useCustomShirt((store) => store.cuff);
  const pocket = useCustomShirt((store) => store.pocket);
  const collar = useCustomShirt((store) => store.collar);

  return {
    sleeve,
    cuff,
    pocket,
    collar,
  };
};

export default useCustomShirtData;
