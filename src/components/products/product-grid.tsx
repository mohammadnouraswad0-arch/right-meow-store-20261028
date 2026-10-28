"use client";

import { useState } from "react";
import type { ProductDTO } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { PackageSearch } from "lucide-react";

export function ProductGrid({ products }: { products: ProductDTO[] }) {
  const [visible, setVisible] = useState(12);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-[var(--color-white)] py-20 text-center text-dark-brown/60">
        <PackageSearch size={40} />
        <p className="text-base font-bold">لا توجد نتائج مطابقة لبحثك</p>
        <p className="text-sm">جرّب تعديل الفلاتر أو كلمات البحث.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, visible).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {visible < products.length ? (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 12)}
            className="rounded-full border-2 px-7 py-3 text-sm font-bold"
            style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
          >
            تحميل المزيد
          </button>
        </div>
      ) : null}
    </div>
  );
}
