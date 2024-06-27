import { PayProcess } from './checkout.interface';

export interface GetCheckoutResponse {
  code: number;
  data: Checkout;
}

export interface Checkout {
  id: number;
  token: string;
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientCountry: string;
  clientState: string;
  clientStreet: string;
  clientCityZone: string;
  clientPostcode: string;
  clientBuildingNumber: string;
  cartId: number;
  cartDetails: CartDetail[];
  ptId: number;
  payUrl: string;
  createAt: number;
  shippingCost: number;
  isMafs: number;
  discountCost: number;
  active: number;
  shippingComment: string;
  totalCart: number;
  pickStoreId: number;
  extrasUserData?: {
    user_rut?: string;
  };
  id_venta_documento_tributario: number;
  documentNumber: number;
  documentToken: string;
  marketId: number;
  isService: number;
  withdrawStore: number;
  payProcess: PayProcess;
  ptName: string;
  total: number;
  url: string;
  currency: Currency;
}

export interface CartDetail {
  id: number;
  quantity: number;
  unitValue: number;
  netUnitValue: number;
  discount: number;
  itemName: string;
  total: number;
  image: string;
  idVarianteProducto: number;
  sku: string;
  link: string;
  notice: string;
  description: string;
  productWebId: number;
  cartId: number;
  taxList: number[];
  name: string;
  value: number;
  cd_q: number;
  cd_unit_value: number;
  cd_discount: number;
  cd_item_name: string;
  cd_sub_total: number;
  cd_id: number;
  cd_id_discount: number;
  cd_image: string;
  id_variante_producto: number;
  codigo_variante_producto: string;
  href: string;
}

export interface Currency {
  decimals: number;
  symbol: null;
  decimalSeparator: null;
}
