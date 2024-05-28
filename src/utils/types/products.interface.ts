export interface ProductsResponse {
  href: string;
  count: number;
  limit: number;
  offset: number;
  items: Product[];
  next: string;
}

export interface Product {
  href: string;
  id: number;
  name: null;
  description: null;
  classification: number;
  ledgerAccount: null;
  costCenter: null;
  allowDecimal: number;
  stockControl: number;
  printDetailPack: number;
  state: number;
  prestashopProductId: number;
  presashopAttributeId: number;
  product_type: ProductType;
  variants: ProductTaxes;
  product_taxes: ProductTaxes;
}

export interface ProductTaxes {
  href: string;
}

export interface ProductType {
  href: string;
  id: string;
}
