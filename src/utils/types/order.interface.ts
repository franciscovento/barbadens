import { ExtrasUserData } from './bsale/checkout.interface';

export interface Order {
  id: number;
  created_at: Date;
  user_id: string;
  status: OrderStatus;
  checkout_info: CheckoutInfo;
  payment_type_id: null;
  shipping_cost: number;
  total_products: number;
  document_url: string | null;
}
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface CartDetail {
  quantity: number;
  grossUnitValue: number;
  idVarianteProducto: number;
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
  name: string;
  price: number;
  design_id: number;
  fabric_id: number;
  bar_code?: string;
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
}

export interface CheckoutInfo {
  id: number;
  url: string;
  ptId: number;
  token: string;
  total: number;
  active: number;
  cartId: number;
  isMafs: number;
  createAt: number;
  currency: Currency;
  marketId: number;
  isService: number;
  totalCart: number;
  clientName: string;
  payProcess: string;
  cartDetails: string[];
  clientEmail: string;
  clientPhone: string;
  clientState: string;
  pickStoreId: number;
  clientStreet: string;
  discountCost: number;
  shippingCost: number;
  clientCountry: string;
  documentToken: string;
  withdrawStore: number;
  clientCityZone: string;
  clientLastName: string;
  clientPostcode: string;
  documentNumber: number;
  clientBuildingNumber: string;
  id_venta_documento_tributario: number;
  extrasUserData?: ExtrasUserData;
}

export interface Currency {
  symbol: null;
  decimals: number;
  decimalSeparator: null;
}
