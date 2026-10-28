export function formatPrice(value: number | string, currency = "SAR"): string {
  const num = typeof value === "string" ? Number(value) : value;
  const formatted = new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(num);
  return `${formatted} ${currency === "SAR" ? "ر.س" : currency}`;
}

export function discountPercent(price: number, compareAt: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
