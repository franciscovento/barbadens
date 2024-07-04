export interface GetDocumentWithDetailsResponse {
  href: string;
  id: number;
  emissionDate: number;
  expirationDate: number;
  generationDate: number;
  number: number;
  serialNumber: string;
  trackingNumber: null;
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
  stamp: null;
  urlPublicView: string;
  urlPdf: string;
  urlPublicViewOriginal: string;
  urlPdfOriginal: string;
  token: string;
  state: number;
  commercialState: number;
  urlXml: null;
  salesId: null;
  informed: number;
  responseMsg: null;
  document_type: Client;
  client: Client;
  office: Client;
  user: Client;
  coin: Client;
  references: Attributes;
  document_taxes: Attributes;
  details: Details;
  sellers: Attributes;
  attributes: Attributes;
}

export interface Attributes {
  href: string;
}

export interface Client {
  href: string;
  id: string;
}

export interface Details {
  href: string;
  count: number;
  limit: number;
  offset: number;
  items: Item[];
}

export interface Item {
  href: string;
  id: number;
  lineNumber: number;
  quantity: number;
  netUnitValue: number;
  netUnitValueRaw: number;
  totalUnitValue: number;
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
  netDiscount: number;
  totalDiscount: number;
  variant: Variant;
  note: string;
  relatedDetailId: number;
}

export interface Variant {
  href: string;
  id: number;
  description: string;
  code: string;
}
