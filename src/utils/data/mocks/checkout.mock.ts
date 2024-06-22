import { Checkout } from '@/utils/types/bsale/checkout.interface';

export const checkoutMock: Checkout = {
  clientName: 'Francisco 2',
  clientLastName: 'Vento',
  clientEmail: 'fgvr92@gmail.com',
  clientPhone: '902079839',
  code: '70511415',
  //"pickName": "JUAN",
  //"pickCode": "66666666-6",
  marketId: 1,
  withdrawStore: 0,
  shippingCost: 50,
  ptId: 1,
  generateDocument: 1,
  payProcess: 'for_validate',
  clientCountry: 'Perú',
  clientState: 'Lima Metropolitana',
  clientCityZone: 'Lima',
  clientStreet: 'Flora Tristán',
  clientPostcode: '1405',
  clientBuildingNumber: 'Pablo Bonner',
  extrasUserData: {
    user_rut: '1-4',
    razon_social: 'Tomategrafico',
    direccion: 'Sandro Boticelli 76043',
    ciudad: 'Lima',
  },
  cartDetails: [
    {
      quantity: 1,
      //   "netUnitValue": 300,
      grossUnitValue: 300,
      idVarianteProducto: 104,
      //   "productWebId": 1,
    },
  ],
  documentData: {
    declareSii: 1,
    officeId: 1,
    emissionDate: 1718834083,
  },
};
