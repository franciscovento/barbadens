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

export interface CartProductWithFabricDesignProfile extends CartProduct {
  products: {
    name: string;
    id_variant_default: number;
    shirt_designs: {
      image: string;
    };
  };
  profiles: {
    profile_name: string;
  };
}

export interface CartProductWithProduct extends Cart {
  cart_product: CartProductWithFabricDesignProfile[];
}

export interface CartProductId {
  cart_id: number;
  design_id: number;
  fabric_id: number;
  profile_id: string;
}
