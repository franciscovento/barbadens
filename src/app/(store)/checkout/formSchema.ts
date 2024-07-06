import {
  ExtrasUserData,
  PayProcess,
} from '@/utils/types/bsale/checkout.interface';
import { CartDetail } from '@/utils/types/order.interface';
import * as yup from 'yup';

export interface FormCheckoutSchema {
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  ptId: number;
  marketId: number;
  shippingComment?: string;
  shippingCost: number;
  discountCost: number;
  withdrawStore: number;
  clientStreet?: string;
  clientBuildingNumber?: string;
  clientCityZone?: string;
  clientState?: string;
  clientCountry?: string;
  payProcess: PayProcess;
  clientPostcode?: yup.Maybe<string | undefined>;
  pickCode?: string;
  pickName?: string;
  generateDocument: number;
  pickStoreId?: number;
  extrasUserData?: ExtrasUserData | null;
}

export interface Checkout extends FormCheckoutSchema {
  cartDetails: CartDetail[];
  documentData: {
    clientId?: number;
    declareSii: number;
    officeId: number;
    emissionDate: number;
  };
}

export const formCheckoutSchema = yup
  .object({
    clientName: yup.string().required('Nombre es requerido'),
    clientLastName: yup.string().required('Apellido es requerido'),
    clientEmail: yup.string().email().required('Necesitas un email'),
    clientPhone: yup.string().required('Necesitas un teléfono'),
    ptId: yup.number().default(1).required(),
    marketId: yup.number().default(1).required(),
    shippingComment: yup.string(),
    shippingCost: yup.number().default(0).required(),
    discountCost: yup.number().default(0).required(),
    generateDocument: yup.number<0 | 1>().default(1).required(),
    payProcess: yup.string<PayProcess>().default('for_validate').required(),
    withdrawStore: yup.number().default(0).required(), // 0: delivery | 1: recojo en tienda
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
  })
  .required();
