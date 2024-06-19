export interface Client {
  companyOrPerson: number; // empresa (0) | Persona o (1)
  facebook: string | null;
  municipality: string;
  phone: string | null;
  activity: string;
  city: string;
  maxCredit: number;
  hasCredit: 1 | null;
  accumulatePoints: 1;
  lastName: string;
  note: string;
  firstName: string;
  company: string; // Razón social del cliente (String).
  address: string;
  email: string;
  twitter: string;
  code: string; // Rut del cliente (String).
  dynamicAttributes: [
    {
      description: string;
      dynamicAttributeId: number;
    },
  ];
}
