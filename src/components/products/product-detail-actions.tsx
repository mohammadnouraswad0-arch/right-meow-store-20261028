"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import type { ProductDTO } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useUIStore } from "@/lib/ui-store";

export function ProductDetailActions({ product }: { product: ProductDTO }) {
  const [variant, setVariant] = useState(product.variants[0]?.label ?? undefined);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const [added, setAdded] = useState(false);

  const selectedVariant = product.variants.find((v) => v.label === variant);
  const stock = selectedVariant ? selectedVariant.stock : product.stock;
  const price = product.price + (selectedVariant?.priceDelta ?? 0);
  const outOfStock = stock <= 0;

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        nameAr: product.nameAr,
        image: product.images[0]?.url ?? "",
        price,
        compareAtPrice: product.compareAtPrice,
        stock,
        variant,
      },
      quantity,
    );
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-5">
      {product.variants.length > 0 ? (
        <div>
          <h3 className="mb-2 text-sm font-bold text-dark-brown">الخيار</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.label}
                onClick={() => setVariant(v.label)}
                className="rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors"
                style={
                  variant === v.label
                    ? { borderColor: "var(--color-primary)", backgroundColor: "var(--color-primary)", color: "white" }
                    : { borderColor: "color-mix(in srgb, var(--color-dark-brown) 15%, transparent)", color: "var(--color-dark-brown)" }
                }
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <h3 className="mb-2 text-sm font-bold text-dark-brown">الكمية</h3>
        <div className="flex w-fit items-center rounded-full border border-dark-brown/20">
          <button className="p-3" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="إنقاص الكمية">
            <Minus size={16} />
          </button>
          <span className="min-w-[2rem] text-center font-bold">{quantity}</span>
          <button
            className="p-3"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            aria-label="زيادة الكمية"
            disabled={quantity >= stock}
          >
            <Plus size={16} />
          </button>
        </div>
        <p className="mt-1.5 text-xs text-dark-brown/55">
          {outOfStock ? "نفدت الكمية حاليًا" : `${stock} قطعة متوفرة في المخزون`}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          disabled={outOfStock}
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white transition-transform disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <ShoppingBag size={18} />
          {outOfStock ? "غير متوفر حاليًا" : added ? "تمت الإضافة ✓" : "أضف إلى السلة"}
        </button>
        <button
          onClick={() =>
            toggleWishlist({
              productId: product.id,
              slug: product.slug,
              nameAr: product.nameAr,
              image: product.images[0]?.url ?? "",
              price: product.price,
              compareAtPrice: product.compareAtPrice,
            })
          }
          aria-label="إضافة للمفضلة"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dark-brown/15"
        >
          <Heart size={20} className={isWishlisted ? "fill-current" : ""} style={{ color: "var(--color-primary)" }} />
        </button>
      </div>
    </div>
  );
}
