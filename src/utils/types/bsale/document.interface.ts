export interface Document {
  documentTypeId: number;
  officeId?: number;
  priceListId?: number;
  emissionDate: number;
  expirationDate: number;
  declare: number;
  dispatch: number;
  clientId?: number;
  client: {
    code: string;
    city?: string;
    municipality?: string;
    address?: string;
    email: string;
    companyOrPerson: number;
    firstName: string;
    lastName: string;
    dynamicAttributes?: DynamicAttributes[];
  };
  sendEmail: number;
  details: Details[];
  dynamicAttributes?: DynamicAttributes[];
  payments?: Payments[];
}

export interface Payments {
  paymentTypeId: number;
  amount: number;
  recordDate: number;
}
export interface Details {
  variantId: number;
  grossUnitValue: number;
  quantity: number;
  taxId?: [number];
  discount?: number;
  comment?: string;
}

export interface DynamicAttributes {
  description: string;
  dynamicAttributeId: number;
}

export interface DocumentResponse {
  href: string;
  id: number;
  emissionDate: number;
  expirationDate: number;
  generationDate: number;
  number: number;
  serialNumber: string;
  trackingNumber: string;
  totalAmount: number;
  netAmount: number;
  taxAmount: number;
  exemptAmount: number;
  notExemptAmount: number;
  exportTotalAmount: number;
  exportNetAmount: number;
  exportTaxAmount: number;
  exportExemptAmount: number;
  commissionRate: number;
  commissionNetAmount: number;
  commissionTaxAmount: number;
  commissionTotalAmount: number;
  percentageTaxWithheld: number;
  purchaseTaxAmount: number;
  purchaseTotalAmount: number;
  address: string;
  district: string;
  city: string;
  stamp: string;
  urlPublicView: string;
  urlPdf: string;
  urlPublicViewOriginal: string;
  urlPdfOriginal: string;
  token: string;
  state: number;
  commercialState: number;
  urlXml: string;
  salesId: null;
  informed: number;
  responseMsg: string;
  document_type: {
    href: string;
    id: string;
  };
  client: {
    href: string;
    id: string;
  };
  office: {
    href: string;
    id: string;
  };
  user: {
    href: string;
    id: string;
  };
  coin: {
    href: string;
    id: string;
  };
  references: {
    href: string;
  };
  document_taxes: {
    href: string;
  };
  details: {
    href: string;
  };
  sellers: {
    href: string;
  };
  attributes: {
    href: string;
  };
}
