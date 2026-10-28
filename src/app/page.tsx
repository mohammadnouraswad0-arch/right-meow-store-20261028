import Link from "next/link";
import { getCategories, getProducts } from "@/db/queries";
import { getGeneralSettings } from "@/db/settings";
import { Hero } from "@/components/home/hero";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ShopByPet } from "@/components/home/shop-by-pet";
import { BrandsStrip } from "@/components/home/brands-strip";
import { EditorialSection } from "@/components/home/editorial-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductCarousel } from "@/components/product-carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBrands } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, categories, brands, newArrivals, bestsellers, offers, featured, catProducts, dogProducts] =
    await Promise.all([
      getGeneralSettings(),
      getCategories(),
      getBrands(),
      getProducts({ sort: "newest", limit: 10 }),
      getProducts({ sort: "bestseller", limit: 10 }),
      getProducts({ onSale: true, limit: 10 }),
      getProducts({ limit: 40 }).then((all) => all.filter((p) => p.isFeatured).slice(0, 8)),
      getProducts({ petType: "cats", sort: "bestseller", limit: 10 }),
      getProducts({ petType: "dogs", sort: "bestseller", limit: 10 }),
    ]);

  const mainCategories = categories.filter((c) => ["cats", "dogs", "small-pets", "fish"].includes(c.slug));

  return (
    <>
      <Hero headline={settings.heroHeadlineAr} description={settings.heroDescriptionAr} />
      <WhyChooseUs />
      <ShopByPet categories={mainCategories} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading eyebrow="وصل حديثًا" title="أحدث المنتجات" action={{ href: "/products?sort=newest", label: "عرض الكل" }} />
        <ProductCarousel products={newArrivals} />
      </section>

      <section className="py-14" style={{ backgroundColor: "var(--color-white)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="عالم القطط"
            title="كل ما تحتاجه قطتك"
            description="اكتشف الأطعمة والمكافآت والألعاب ومستلزمات العناية المناسبة لقطتك."
            action={{ href: "/cats", label: "تسوق القطط" }}
          />
          <ProductCarousel products={catProducts} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="عالم الكلاب"
          title="كل ما يحتاجه كلبك"
          description="طعام، تدريب، نزهات، وراحة — كل ما يلزم كلبك في مكان واحد."
          action={{ href: "/dogs", label: "تسوق الكلاب" }}
        />
        <ProductCarousel products={dogProducts} />
      </section>

      {offers.length > 0 ? (
        <section className="py-14" style={{ backgroundColor: "var(--color-cream)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading eyebrow="لفترة محدودة" title="عروض مميزة" action={{ href: "/offers", label: "عرض كل العروض" }} />
            <ProductCarousel products={offers} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading eyebrow="Our Favorites" title="منتجاتنا المفضلة" description="Explore products selected to make every day better for your pets." />
        <ProductCarousel products={featured.length > 0 ? featured : bestsellers} />
      </section>

      <EditorialSection />
      <BrandsStrip brands={brands} />
      <NewsletterSection />
    </>
  );
}
