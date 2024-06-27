export interface GetOrdersResponse {
  id: number;
  created_at: Date;
  user_id: string;
  bsale_token: string;
  order_product: OrderProduct[];
}

export interface OrderProduct {
  order_id: number;
  products: Products;
  profiles: Profiles;
  quantity: number;
  design_id: number;
  fabric_id: number;
  created_at: Date;
  profile_id: string;
  unit_price: number;
}

export interface Products {
  name: null;
  price: number;
  design_id: number;
  fabric_id: number;
  created_at: Date;
}

export interface Profiles {
  id: string;
  hip: number;
  back: number;
  fist: number;
  long: number;
  chest: number;
  phone: null;
  waist: number;
  collar: number;
  user_id: string;
  shoulder: number;
  birth_date: null;
  created_at: Date;
  is_primary: boolean;
  sleeve_long: number;
  profile_name: string;
  sleeve_width: number;
  profile_lastname: null;
}
