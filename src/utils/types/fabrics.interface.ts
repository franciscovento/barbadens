export interface Fabric {
  id: number;
  sku: string;
  variant_id: number;
  name: string;
  description: string | null;
  created_at: string;
  price: number;
  stock: number;
  fabric_type: string | null;
  featured: boolean;
  discount?: number | null;
  short_description: string | null;
  images: string[];
}
