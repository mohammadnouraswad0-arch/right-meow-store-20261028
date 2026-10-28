"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { CategoryDTO, BrandDTO } from "@/lib/types";
import { useCallback, useState, useTransition } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const petTypes = [
  { value: "cats", label: "القطط" },
  { value: "dogs", label: "الكلاب" },
  { value: "small-pets", label: "الحيوانات الصغيرة" },
  { value: "fish", label: "الأسماك" },
  { value: "general", label: "عناية عامة" },
];

const sortOptions = [
  { value: "newest", label: "الأحدث" },
  { value: "price-asc", label: "السعر: من الأقل للأعلى" },
  { value: "price-desc", label: "السعر: من الأعلى للأقل" },
  { value: "bestseller", label: "الأكثر مبيعًا" },
  { value: "rating", label: "الأعلى تقييمًا" },
];

export function ProductFilters({ categories, brands }: { categories: CategoryDTO[]; brands: BrandDTO[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [router, pathname, searchParams],
  );

  const petType = searchParams.get("petType") ?? "";
  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const onSale = searchParams.get("onSale") === "1";
  const inStock = searchParams.get("inStock") === "1";
  const sort = searchParams.get("sort") ?? "newest";

  const content = (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-extrabold text-dark-brown">الترتيب</h3>
        <select
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-white)] px-3 py-2.5 text-sm"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-extrabold text-dark-brown">نوع الحيوان</h3>
        <div className="flex flex-col gap-2">
          {petTypes.map((p) => (
            <label key={p.value} className="flex items-center gap-2 text-sm text-dark-brown/80">
              <input
                type="radio"
                name="petType"
                checked={petType === p.value}
                onChange={() => update("petType", petType === p.value ? null : p.value)}
              />
              {p.label}
            </label>
          ))}
          {petType ? (
            <button onClick={() => update("petType", null)} className="w-fit text-xs text-[var(--color-primary)] underline">
              إزالة الفلتر
            </button>
          ) : null}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-extrabold text-dark-brown">الفئة</h3>
        <select
          value={category}
          onChange={(e) => update("category", e.target.value || null)}
          className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-white)] px-3 py-2.5 text-sm"
        >
          <option value="">كل الفئات</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.nameAr}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-extrabold text-dark-brown">العلامة</h3>
        <select
          value={brand}
          onChange={(e) => update("brand", e.target.value || null)}
          className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-white)] px-3 py-2.5 text-sm"
        >
          <option value="">كل العلامات</option>
          {brands.map((b) => (
            <option key={b.id} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-dark-brown/80">
          <input type="checkbox" checked={onSale} onChange={(e) => update("onSale", e.target.checked ? "1" : null)} />
          المنتجات المخفضة فقط
        </label>
        <label className="flex items-center gap-2 text-sm text-dark-brown/80">
          <input type="checkbox" checked={inStock} onChange={(e) => update("inStock", e.target.checked ? "1" : null)} />
          المتوفر في المخزون فقط
        </label>
      </div>

      {(petType || category || brand || onSale || inStock) && (
        <button
          onClick={() => router.push(pathname)}
          className="rounded-full border border-dark-brown/20 py-2 text-sm font-bold text-dark-brown"
        >
          مسح كل الفلاتر
        </button>
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="mb-4 flex items-center gap-2 rounded-full border border-dark-brown/15 px-4 py-2 text-sm font-bold lg:hidden"
      >
        <SlidersHorizontal size={16} /> الفلاتر والترتيب
      </button>

      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>

      <div
        className={`fixed inset-0 z-50 bg-dark-brown/40 transition-opacity lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-[var(--color-white)] p-5 shadow-2xl transition-transform lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">الفلاتر والترتيب</h2>
          <button onClick={() => setMobileOpen(false)}>
            <X size={22} />
          </button>
        </div>
        {content}
      </div>
    </>
  );
}
