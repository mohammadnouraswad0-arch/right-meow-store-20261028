"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ImageOff } from "lucide-react";
import { useState } from "react";
import type { ProductDTO } from "@/lib/types";
import { Price } from "@/components/ui/price";
import { RatingStars } from "@/components/ui/rating-stars";
import { Badge } from "@/components/ui/section-heading";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";

export function ProductCard({ product, className = "" }: { product: ProductDTO; className?: string }) {
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const mainImage = product.images[0];
  const outOfStock = product.stock <= 0;

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-white)] shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <button
        onClick={() => toggleWishlist({ productId: product.id, slug: product.slug, nameAr: product.nameAr, image: mainImage?.url ?? "", price: product.price, compareAtPrice: product.compareAtPrice })}
        aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition-transform hover:scale-110"
      >
        <Heart size={17} className={isWishlisted ? "fill-current" : ""} style={{ color: "var(--color-primary)" }} />
      </button>

      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
        {product.isNew ? <Badge tone="sage">جديد</Badge> : null}
        {product.isBestseller ? <Badge tone="primary">الأكثر مبيعًا</Badge> : null}
        {product.isOffer ? <Badge tone="rose">عرض</Badge> : null}
      </div>

      <Link href={`/products/${product.slug}`} className="relative block aspect-square w-full overflow-hidden bg-[var(--color-cream)]">
        {mainImage && !imgError ? (
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-dark-brown/40">
            <ImageOff size={28} />
            <span className="text-xs">الصورة غير متوفرة حاليًا</span>
          </div>
        )}
        {outOfStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-brown/40">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-dark-brown">نفدت الكمية</span>
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {product.brandName ? <span className="text-[11px] font-semibold text-dark-brown/50">{product.brandName}</span> : null}
        <Link href={`/products/${product.slug}`} className="line-clamp-2 min-h-[2.6em] text-sm font-bold text-dark-brown hover:underline">
          {product.nameAr}
        </Link>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} currency={product.currency} />
        </div>
        <button
          disabled={outOfStock}
          onClick={() =>
            addItem({
              productId: product.id,
              slug: product.slug,
              nameAr: product.nameAr,
              image: mainImage?.url ?? "",
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              stock: product.stock,
            })
          }
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] py-2.5 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <ShoppingBag size={16} />
          {outOfStock ? "غير متوفر" : "أضف إلى السلة"}
        </button>
      </div>
    </div>
  );
}
