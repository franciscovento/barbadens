const getShippingCost = (total: number): number => {
  if (total > 300) return 0;
  return Number(process.env.NEXT_PUBLIC_SHIPPING_COST) || 20;
};

export { getShippingCost };
