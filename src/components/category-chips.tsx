import Link from "next/link";
import type { CategoryDTO } from "@/lib/types";

export function CategoryChips({ categories, activeSlug }: { categories: CategoryDTO[]; activeSlug?: string }) {
  if (categories.length === 0) return null;
  return (
    <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-2">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/products?category=${c.slug}`}
          className="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          style={
            activeSlug === c.slug
              ? { backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)", color: "white" }
              : { borderColor: "color-mix(in srgb, var(--color-dark-brown) 15%, transparent)", color: "var(--color-dark-brown)" }
          }
        >
          {c.nameAr}
        </Link>
      ))}
    </div>
  );
}
