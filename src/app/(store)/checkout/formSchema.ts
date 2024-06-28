import { CartDetail } from '@/utils/types/order.interface';
import * as yup from 'yup';

export interface FormCheckoutSchema {
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientDocument: string;
  ptId: number;
  marketId: number;
  shippingComment?: string;
  shippingCost: number;
  withdrawStore: number;
  documentType: number;
  clientStreet?: string;
  clientBuildingNumber?: string;
  clientCityZone?: string;
  clientState?: string;
  clientCountry?: string;
  clientPostcode?: yup.Maybe<string | undefined>;
  pickCode?: string;
  pickName?: string;
  pickStoreId?: number;
  ruc?: string;
  companyName?: string;
  companyAddress?: string;
  companyCityZone?: string;
  companyState?: string;
}

export interface Checkout extends FormCheckoutSchema {
  cartDetails: CartDetail[];
}

export const formCheckoutSchema = yup
  .object({
    clientName: yup.string().required('Nombre es requerido'),
    clientLastName: yup.string().required('Apellido es requerido'),
    clientEmail: yup.string().email().required('Necesitas un email'),
    clientPhone: yup.string().required('Necesitas un teléfono'),
    clientDocument: yup.string().required('Necesitas un teléfono'),
    ptId: yup.number().default(1).required(),
    marketId: yup.number().default(1).required(),
    shippingComment: yup.string(),
    shippingCost: yup.number().default(0).required(),
    withdrawStore: yup.number().default(0).required(), // 0: delivery | 1: recojo en tienda
    documentType: yup.number().default(0).required(), // 0: boleta | 1: factura
    //? Datos dependientes de withdrawStore = 0
    clientStreet: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Dirección es requerida'),
    }),
    clientBuildingNumber: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Ingresa número de calle'),
    }),
    clientCityZone: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Distrito es requerido'),
    }),
    clientState: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Provincia es requerida'),
    }),
    clientCountry: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('País es requerido'),
    }),
    //? Datos dependientes de withdrawStore = 1
    pickCode: yup.string().when('withdrawStore', {
      is: 1,
      then: (schema) => schema.required('N° Documento es requerido'),
    }),
    pickName: yup.string().when('withdrawStore', {
      is: 1,
      then: (schema) => schema.required('Nombre es requerido'),
    }),
    pickStoreId: yup.number().when('withdrawStore', {
      is: 1,
      then: (schema) => schema.required('Elige la sucursal'),
    }),
    clientPostcode: yup.string().notRequired(),
    // ? Datos dependientes de document_type = 1
    ruc: yup.string().when('documentType', {
      is: 1,
      then: (schema) => schema.required('Ingresa nro de RUC o DNI'),
    }),
    companyName: yup.string().when('documentType', {
      is: 1,
      then: (schema) => schema.required('Ingresa nombre de persona o empresa'),
    }),
    companyAddress: yup.string().when('documentType', {
      is: 1,
      then: (schema) => schema.required('Ingresa dirección'),
    }),
    companyCityZone: yup.string().when('documentType', {
      is: 1,
      then: (schema) => schema.required('Ingresa el distrito'),
    }),
    companyState: yup.string().when('documentType', {
      is: 1,
      then: (schema) => schema.required('Ingresa el estado'),
    }),
  })
  .required();
