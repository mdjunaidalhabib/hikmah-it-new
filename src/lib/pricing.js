export function formatTaka(amount) {
  return `৳${Number(amount || 0).toLocaleString("bn-BD")}`;
}

export function getDisplayPrice(pkg) {
  return pkg?.priceLabel || formatTaka(pkg?.priceAmount);
}

export function getDiscountPercent(pkg) {
  if (!pkg || pkg.priceLabel) return 0;
  const original = Number(pkg.originalPriceAmount) || 0;
  const current = Number(pkg.priceAmount) || 0;
  if (original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
