"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useCartStore } from "@/lib/cart-store";
import { Price } from "@/components/ui/price";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-2xl font-extrabold text-dark-brown sm:text-3xl">المفضلة</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-[var(--color-white)] py-20 text-center">
          <Heart size={44} className="text-dark-brown/40" />
          <p className="text-dark-brown/70">لم تقم بإضافة أي منتج إلى المفضلة بعد</p>
          <Link href="/products" className="rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.productId} className="flex flex-col gap-3 rounded-2xl bg-[var(--color-white)] p-3 shadow-[var(--shadow-card)]">
              <Link href={`/products/${item.slug}`} className="relative block aspect-square overflow-hidden rounded-xl bg-[var(--color-cream)]">
                {item.image ? <Image src={item.image} alt={item.nameAr} fill className="object-cover" /> : null}
              </Link>
              <Link href={`/products/${item.slug}`} className="line-clamp-2 text-sm font-bold text-dark-brown hover:underline">
                {item.nameAr}
              </Link>
              <Price price={item.price} compareAtPrice={item.compareAtPrice} size="sm" />
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => addItem({ productId: item.productId, slug: item.slug, nameAr: item.nameAr, image: item.image, price: item.price, compareAtPrice: item.compareAtPrice, stock: 99 })}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <ShoppingBag size={14} /> أضف للسلة
                </button>
                <button onClick={() => remove(item.productId)} aria-label="حذف من المفضلة" className="flex h-8 w-8 items-center justify-center rounded-full border border-dark-brown/15">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
