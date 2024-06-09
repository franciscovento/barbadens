export interface Cuff {
  id: number;
  name: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface Collar {
  id: number;
  name: string;
  description: string;
  created_at: string;
  image: string | null;
}
