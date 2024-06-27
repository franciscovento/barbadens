export interface Order {
  id: number;
  created_at: Date;
  user_id: string;
  status: OrderStatus;
  checkout_info: CheckoutInfo;
  payment_type_id: null;
  shipping_cost: number;
  total_products: number;
  document_id: null;
}
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface CheckoutInfo {
  code: string;
  ptId: number;
  marketId: number;
  pickCode?: string;
  pickName?: string;
  clientName: string;
  clientDocument: string;
  payProcess: string;
  cartDetails: CartDetail[];
  clientEmail: string;
  clientPhone: string;
  pickStoreId: number;
  documentData: DocumentData;
  shippingCost: number;
  withdrawStore: number;
  clientLastName: string;
  clientPostcode: string;
  shippingComment: string;
  generateDocument: number;
  clientBuildingNumber: string;
  clientStreet?: string;
  clientCityZone?: string;
  clientState?: string;
  clientCountry?: string;
  extrasUserData?: any;
}

export interface CartDetail {
  quantity: number;
  grossUnitValue: number;
  idVarianteProducto: number;
}

export interface DocumentData {
  officeId: number;
  declareSii: number;
  emissionDate: number;
}

export interface OrderWithProducts extends Order {
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
