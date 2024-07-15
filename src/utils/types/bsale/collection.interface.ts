export interface GetCollectionResponse {
  code: string;
  href: string;
  count: number;
  limit: number;
  offset: number;
  data: CollectionProduct[];
}

export interface CollectionProduct {
  id: number;
  productId: number;
  idVariantDefault: number;
  urlSlug: string;
  name: string;
  description: string;
  descriptions: Collections;
  displayNotice: string;
  state: number;
  mkProductType: string;
  productType: ProductType;
  productTaxes: Collections;
  urlImg: string;
  pictures: Collections;
  urlVideo: string;
  shippingUnit: null;
  width: null;
  depth: null;
  length: null;
  baseInfo: BaseInfo;
  variant: Variant;
  variants: Collections;
  discounts: null;
  stocks: Collections;
  integration: Integration;
  order: number;
  totalStock: number;
  collections: Collections;
}

export interface BaseInfo {
  id: number;
  name: string;
  classification: number;
  stockControl: number;
  href: string;
}

export interface Collections {
  href: string;
}

export interface Integration {
  order_by: string;
}

export interface ProductType {
  id: number;
  href: string;
}

export interface Variant {
  id: number;
  price: number;
  description: string;
  finalPrice: number;
  fpWithoutDiscount: number;
  taxPrice: number;
  taxDiscountPrice: number;
  netDiscountPrice: number;
  unlimitedStock: number;
  allowDecimal: number;
  allowNegativeStock: number;
  code: string;
  discount: Discount;
}

export interface Discount {
  percent: number;
  minimumQuantity: number;
}
