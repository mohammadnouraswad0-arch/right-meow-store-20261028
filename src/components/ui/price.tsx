import { formatPrice, discountPercent } from "@/lib/format";

export function Price({
  price,
  compareAtPrice,
  currency = "SAR",
  size = "md",
}: {
  price: number;
  compareAtPrice?: number | null;
  currency?: string;
  size?: "sm" | "md" | "lg";
}) {
  const discount = discountPercent(price, compareAtPrice ?? null);
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`font-bold ${sizes[size]}`} style={{ color: "var(--color-primary)" }}>
        {formatPrice(price, currency)}
      </span>
      {compareAtPrice && compareAtPrice > price ? (
        <>
          <span className="text-xs text-dark-brown/50 line-through">{formatPrice(compareAtPrice, currency)}</span>
          {discount ? (
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
              style={{ backgroundColor: "var(--color-rose)" }}
            >
              خصم {discount}%
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
