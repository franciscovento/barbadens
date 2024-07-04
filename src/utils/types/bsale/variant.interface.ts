export interface GetVariantResponse {
  href: string;
  id: number;
  description: string;
  unlimitedStock: number;
  allowNegativeStock: number;
  state: number;
  barCode: string;
  code: string;
  tributaryCode: string;
  unit: string;
  imagestionCenterCost: number;
  imagestionAccount: number;
  imagestionConceptCod: number;
  imagestionProyectCod: number;
  imagestionCategoryCod: number;
  imagestionProductId: number;
  serialNumber: number;
  isLot: number;
  prestashopCombinationId: number;
  prestashopValueId: number;
  product: Product;
  attribute_values: AttributeValues;
  costs: AttributeValues;
}

export interface AttributeValues {
  href: string;
}

export interface Product {
  href: string;
  id: number;
  name: string;
  description: null;
  classification: number;
  ledgerAccount: string;
  costCenter: string;
  allowDecimal: number;
  stockControl: number;
  printDetailPack: number;
  state: number;
  prestashopProductId: number;
  presashopAttributeId: number;
  product_type: ProductType;
  variants: AttributeValues;
  product_taxes: AttributeValues;
}

export interface ProductType {
  href: string;
  id: string;
}
