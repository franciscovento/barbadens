import { SleeveType } from '@/stores';

export interface DesignItem {
  id: number;
  name: string;
  description: string;
  created_at: string;
  image: string | null;
}

export interface Design {
  id: number;
  sleeve_type: SleeveType;
  shirt_collar_id: number;
  shirt_pocket_id: number;
  shirt_cuff_id: number | null;
  created_at: string;
  fabric_consumption: number;
  image: string | null;
}

export interface Cuff extends DesignItem {}

export interface Collar extends DesignItem {}

export interface Pocket extends DesignItem {}

export interface GetDesignResponse {
  created_at: string;
  fabric_consumption: number;
  id: number;
  image: string | null;
  shirt_collar_id: number;
  shirt_collars: Collar;
  shirt_cuff_id: number | null;
  shirt_cuffs: Cuff;
  shirt_pocket_id: number;
  shirt_pockets: Pocket;
  sleeve_type: SleeveType;
}
