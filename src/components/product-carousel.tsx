"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductDTO } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

export function ProductCarousel({ products }: { products: ProductDTO[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 640);
    el.scrollBy({ left: dir * amount * (document.dir === "rtl" ? -1 : 1), behavior: "smooth" });
  };

  if (products.length === 0) {
    return <p className="text-sm text-dark-brown/60">لا توجد منتجات لعرضها حاليًا.</p>;
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar snap-x-mandatory flex gap-4 overflow-x-auto pb-2 sm:gap-5"
        style={{ scrollPaddingInlineStart: "4px" }}
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start w-[46%] shrink-0 sm:w-[30%] lg:w-[22%] xl:w-[19%]">
            <ProductCard product={p} className="h-full" />
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollByAmount(-1)}
        aria-label="السابق"
        className="absolute -top-14 left-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md sm:flex"
      >
        <ChevronRight size={18} style={{ color: "var(--color-dark-brown)" }} />
      </button>
      <button
        onClick={() => scrollByAmount(1)}
        aria-label="التالي"
        className="absolute -top-14 left-0 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md sm:flex"
      >
        <ChevronLeft size={18} style={{ color: "var(--color-dark-brown)" }} />
      </button>
    </div>
  );
}
