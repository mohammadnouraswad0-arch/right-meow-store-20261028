import type { CategoryDTO } from "@/lib/types";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function ShopByPet({ categories }: { categories: CategoryDTO[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionHeading eyebrow="تصفح حسب الفئة" title="تسوق حسب نوع حيوانك الأليف" />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} href={`/${c.slug}`} />
        ))}
      </div>
    </section>
  );
}
