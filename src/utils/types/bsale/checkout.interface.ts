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
  shippingCost: number;
  ptId: number;
  payProcess: PayProcess;
  clientCountry: string;
  shippingComment?: string;
  clientState: string;
  clientCityZone: string;
  clientStreet: string;
  clientPostcode: string;
  clientBuildingNumber: string;
  extrasUserData: ExtrasUserData;
  cartDetails: CartDetail[];
  generateDocument: 1;
  documentData: {
    declareSii: 1;
    officeId: 1;
    emissionDate: number;
  };
}

export type PayProcess = 'success' | 'pending' | 'for_validate';

export interface CartDetail {
  quantity: number;
  netUnitValue: number;
  idVarianteProducto: number;
  productWebId: number;
}

export interface ExtrasUserData {
  user_rut: string;
  razon_social?: string;
  direccion: string;
  ciudad: string;
  comuna: string;
}
