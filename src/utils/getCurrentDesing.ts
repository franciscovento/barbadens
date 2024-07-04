import { SleeveType } from '@/stores';
import { Design } from './types/design.interface';

export function getCurrentDesign(
  designs: Design[],
  params: {
    shirt_collar_id: number;
    shirt_cuff_id?: number | null;
    shirt_pocket_id: number;
    sleeve_type: SleeveType;
  }
) {
  const { shirt_collar_id, shirt_cuff_id, shirt_pocket_id, sleeve_type } =
    params;

  const currentDesign = designs.find((design) => {
    if (shirt_cuff_id === null) {
      return (
        design.sleeve_type === sleeve_type &&
        design.shirt_collar_id === shirt_collar_id &&
        design.shirt_pocket_id === shirt_pocket_id &&
        design.shirt_cuff_id === null
      );
    }
    return (
      design.sleeve_type === sleeve_type &&
      design.shirt_collar_id === shirt_collar_id &&
      design.shirt_pocket_id === shirt_pocket_id &&
      design.shirt_cuff_id === shirt_cuff_id
    );
  });

  return currentDesign;
}
