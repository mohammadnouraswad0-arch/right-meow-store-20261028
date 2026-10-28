import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { getProducts } from "@/db/queries";
import { ProductGrid } from "@/components/products/product-grid";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "العروض — Right Meow" };

export default async function OffersPage() {
  const offers = await getProducts({ onSale: true, sort: "newest" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-rose)" }}>
          <Tag size={20} className="text-white" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-dark-brown sm:text-3xl">عروض مميزة</h1>
          <p className="text-sm text-dark-brown/60">خصومات حقيقية على منتجات مختارة لفترة محدودة</p>
        </div>
      </div>
      {offers.length === 0 ? (
        <p className="rounded-2xl bg-[var(--color-white)] p-10 text-center text-dark-brown/60">
          لا توجد عروض فعّالة حاليًا، تابعونا قريبًا لمزيد من العروض.
        </p>
      ) : (
        <ProductGrid products={offers} />
      )}
    </div>
  );
}
