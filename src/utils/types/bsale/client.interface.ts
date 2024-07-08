export interface GetClientsResponse {
  href: string;
  count: number;
  limit: number;
  offset: number;
  items: Client[];
}

export interface Client {
  href: string;
  id: number;
  firstName: null;
  lastName: string;
  email: string;
  code: string;
  phone: null;
  company: string;
  note: null;
  facebook: null;
  twitter: null;
  hasCredit: null;
  maxCredit: number;
  state: number;
  activity: string;
  city: string;
  commerciallyBlocked: number;
  district: string;
  address: string;
  companyOrPerson: number;
  accumulatePoints: number;
  points: number;
  pointsUpdated: string;
  sendDte: number;
  isForeigner: number;
  prestashopClienId: number;
  createdAt: number;
  updatedAt: number;
  contacts: Addresses;
  attributes: Addresses;
  addresses: Addresses;
}

export interface Addresses {
  href: string;
}

export interface CreateClientResponse {
  href: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  phone: string;
  company: string;
  note: string;
  facebook: string;
  twitter: string;
  hasCredit: number;
  maxCredit: number;
  state: number;
  activity: string;
  city: string;
  commerciallyBlocked: number;
  district: string;
  address: string;
  companyOrPerson: number;
  accumulatePoints: number;
  points: number;
  pointsUpdated: string;
  sendDte: number;
  isForeigner: number;
  prestashopClienId: number;
  createdAt: number;
  updatedAt: number;
  contacts: Addresses;
  attributes: Addresses;
  addresses: Addresses;
}
