export interface DesignItem {
  id: number;
  name: string;
  description: string;
  created_at: string;
  image: string | null;
}

export interface Cuff extends DesignItem {}

export interface Collar extends DesignItem {}

export interface Pocket extends DesignItem {}
