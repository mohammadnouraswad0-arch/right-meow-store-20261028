import type { Metadata } from "next";
import { Suspense } from "react";
import { getBrands, getCategories, getProducts } from "@/db/queries";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "جميع المنتجات — Right Meow" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const get = (key: string) => (Array.isArray(sp[key]) ? sp[key]?.[0] : sp[key]);

  const [products, categories, brands] = await Promise.all([
    getProducts({
      petType: get("petType"),
      categorySlug: get("category"),
      brandSlug: get("brand"),
      onSale: get("onSale") === "1",
      inStock: get("inStock") === "1",
      search: get("search"),
      sort: (get("sort") as any) ?? "newest",
    }),
    getCategories(),
    getBrands(),
  ]);

  const searchTerm = get("search");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-dark-brown sm:text-3xl">
          {searchTerm ? `نتائج البحث عن "${searchTerm}"` : "جميع المنتجات"}
        </h1>
        <p className="mt-1 text-sm text-dark-brown/60">{products.length} منتج</p>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <Suspense>
          <ProductFilters categories={categories} brands={brands} />
        </Suspense>
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
