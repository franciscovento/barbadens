export interface Cart {
  id: number;
  user_id: string;
  created_at: string;
  total: number;
}

export interface CartProduct {
  cart_id: number;
  fabric_id: number;
  design_id: number;
  quantity: number;
  created_at: string;
  unit_price: number;
  profile_id: string;
}

export interface CartProductWithProduct extends CartProduct {
  cart_product: CartProduct[];
}
