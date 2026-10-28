import { Star } from "lucide-react";

export function RatingStars({ rating, reviewCount }: { rating: number | null; reviewCount: number }) {
  if (!rating) return null;
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1" aria-label={`تقييم ${rating} من 5`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < full ? "fill-current" : "fill-transparent"}
            style={{ color: "var(--color-primary)" }}
          />
        ))}
      </div>
      <span className="text-xs text-dark-brown/60">
        {rating} ({reviewCount})
      </span>
    </div>
  );
}
