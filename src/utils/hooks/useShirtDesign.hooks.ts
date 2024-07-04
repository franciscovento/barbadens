import { useCustomShirt } from '@/stores';

const useShirtDesign = () => {
  const sleeve_type = useCustomShirt((store) => store.sleeve_type);
  const shirt_cuff_id = useCustomShirt((store) => store.shirt_cuff_id);
  const shirt_pocket_id = useCustomShirt((store) => store.shirt_pocket_id);
  const shirt_collar_id = useCustomShirt((store) => store.shirt_collar_id);

  return {
    sleeve_type,
    shirt_cuff_id,
    shirt_pocket_id,
    shirt_collar_id,
  };
};

export default useShirtDesign;
