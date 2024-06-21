export interface Checkout {
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  code: string;
  pickName?: string;
  pickCode?: string;
  pickStoreId?: number;
  marketId: number;
  withdrawStore: number;
  shippingCost?: number;
  ptId: number;
  payProcess: PayProcess;
  clientCountry?: string;
  shippingComment?: string;
  clientState?: string;
  clientCityZone?: string;
  clientStreet?: string;
  clientPostcode?: string;
  clientBuildingNumber?: string;
  extrasUserData?: ExtrasUserData | null;
  cartDetails: CartDetail[];
  generateDocument: number;
  documentData: {
    declareSii: number;
    officeId: number;
    emissionDate: number;
  };
}

export type PayProcess = 'success' | 'pending' | 'for_validate';

export interface CartDetail {
  quantity: number;
  grossUnitValue: number;
  idVarianteProducto: number;
  productWebId?: number;
  netUnitValue?: number;
}

export interface ExtrasUserData {
  user_rut: string;
  razon_social: string;
  direccion?: string;
  ciudad?: string;
  comuna?: string;
}

export interface CheckoutResponse {
  code: string;
  data: Data;
}

export interface Data {
  id: number;
  token: string;
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientCountry: string;
  clientState: string;
  extrasUserData: ExtrasUserData;
  clientStreet: string;
  clientCityZone: string;
  clientPostcode: string;
  clientBuildingNumber: string;
  cartId: number;
  cartDetails: string[];
  ptId: number;
  createAt: number;
  shippingCost: number;
  isMafs: number;
  discountCost: number;
  active: number;
  totalCart: number;
  pickStoreId: number;
  id_venta_documento_tributario: number;
  documentNumber: number;
  documentToken: string;
  marketId: number;
  isService: number;
  withdrawStore: number;
  payProcess: string;
  stName: string;
  total: number;
  url: string;
  currency: Currency;
}

export interface Currency {
  decimals: number;
  symbol: null;
  decimalSeparator: null;
}
