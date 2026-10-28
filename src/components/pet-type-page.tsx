import Image from "next/image";
import { getCategories, getProducts } from "@/db/queries";
import { CategoryChips } from "@/components/category-chips";
import { ProductCarousel } from "@/components/product-carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PetType } from "@/lib/types";

export async function PetTypePage({
  petType,
  titleAr,
  descriptionAr,
  heroImage,
  heroImageAlt,
}: {
  petType: PetType;
  titleAr: string;
  descriptionAr: string;
  heroImage: string;
  heroImageAlt: string;
}) {
  const [subCategories, bestsellers, newProducts, offers, allProducts] = await Promise.all([
    getCategories().then((cats) => cats.filter((c) => c.petType === petType && c.sortOrder >= 10)),
    getProducts({ petType, sort: "bestseller", limit: 10 }),
    getProducts({ petType, sort: "newest", limit: 10 }),
    getProducts({ petType, onSale: true, limit: 10 }),
    getProducts({ petType, limit: 20 }),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative h-56 w-full sm:h-72">
          <Image src={heroImage} alt={heroImageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-brown)]/75 to-[var(--color-dark-brown)]/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{titleAr}</h1>
            <p className="max-w-xl text-sm text-white/90 sm:text-base">{descriptionAr}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <CategoryChips categories={subCategories} />
      </div>

      {bestsellers.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <SectionHeading title="الأكثر مبيعًا" action={{ href: `/products?petType=${petType}&sort=bestseller`, label: "عرض الكل" }} />
          <ProductCarousel products={bestsellers} />
        </section>
      ) : null}

      {offers.length > 0 ? (
        <section className="py-10" style={{ backgroundColor: "var(--color-white)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading title="عروض مميزة" action={{ href: `/products?petType=${petType}&onSale=1`, label: "عرض الكل" }} />
            <ProductCarousel products={offers} />
          </div>
        </section>
      ) : null}

      {newProducts.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <SectionHeading title="وصل حديثًا" action={{ href: `/products?petType=${petType}&sort=newest`, label: "عرض الكل" }} />
          <ProductCarousel products={newProducts} />
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading title="جميع المنتجات" action={{ href: `/products?petType=${petType}`, label: "تصفية وترتيب" }} />
        <ProductCarousel products={allProducts} />
      </section>
    </div>
  );
}
