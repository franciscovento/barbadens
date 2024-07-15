export interface WebDescriptionResponse {
  code: string;
  href: string;
  count: number;
  limit: number;
  offset: number;
  data: WebDescription[];
}

export interface WebDescription {
  id: number;
  productId: number;
  idVariantDefault: number;
  urlSlug: string;
  name: string;
  description: string;
  descriptions: Description[];
  displayNotice: string;
  state: number;
  mkProductType: string;
  productType: ProductType;
  productTaxes: Brand;
  urlImg: string;
  pictures: Picture[];
  urlVideo: string;
  shippingUnit: number;
  width: number;
  depth: number;
  length: number;
  baseInfo: null;
  variants: VariantElement[];
  relatedVariants: Brand;
  collections: Brand;
  brand: Brand;
  variantShipping: Brand;
  discounts: null;
  stocks: Brand;
  integration: Integration;
  variant: PurpleVariant;
  order: number;
  link: string;
}

export interface Brand {
  href: string;
}

export interface Description {
  id: number;
  descriptionName: string;
  html: string;
  order: number;
  default: number;
}

export interface Integration {
  order_by: string;
}

export interface Picture {
  id: number;
  href: string;
  state: number;
  legendImage: string;
}

export interface ProductType {
  id: number;
  href: string;
}

export interface PurpleVariant {
  id: number;
  code: string;
}

export interface VariantElement {
  id: number;
  productId: number;
  description: string;
  unlimitedStock: number;
  allowNegativeStock: number;
  showInEcommerce: number;
  state: number;
  barCode: string;
  code: string;
  imagestionCenterCost: number;
  imagestionAccount: number;
  imagestionConceptCod: number;
  imagestionProyectCod: number;
  imagestionCategoryCod: number;
  imagestionProductId: number;
  serialNumber: number;
  prestashopCombinationId: number;
  prestashopValueId: number;
  prestashopSync: number;
  booticValueId: number;
  booticSync: number;
  attributeValues: any[];
  prices: any[];
  salePrices: SalePrices;
  discounts: Brand;
  stockInfo: StockInfo[];
  href: string;
  integration: null;
  variantMarket: VariantMarket;
  shipping: Brand;
}

export interface SalePrices {
  price: string;
  finalPrice: string;
  fpWithoutDiscount: string;
  taxPrice: string;
  taxDiscountPrice: string;
  netDiscountPrice: string;
}

export interface StockInfo {
  productId: number;
  variantId: number;
  code: string;
  quantity: number;
  quantityReserved: number;
  quantityAvailable: number;
  office: ProductType;
}

export interface VariantMarket {}
