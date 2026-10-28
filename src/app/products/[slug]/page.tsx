import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ShieldCheck, Truck } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/db/queries";
import { Price } from "@/components/ui/price";
import { RatingStars } from "@/components/ui/rating-stars";
import { Badge } from "@/components/ui/section-heading";
import { ProductDetailActions } from "@/components/products/product-detail-actions";
import { ProductCarousel } from "@/components/product-carousel";
import { SectionHeading } from "@/components/ui/section-heading";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود — Right Meow" };
  return {
    title: `${product.nameAr} — Right Meow`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.visible) notFound();

  const related = await getRelatedProducts(product, 8);
  const image = product.images[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-dark-brown/55">
        <Link href="/" className="hover:text-[var(--color-primary)]">الرئيسية</Link>
        <ChevronLeft size={13} />
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-[var(--color-primary)]">
          {product.categoryNameAr}
        </Link>
        <ChevronLeft size={13} />
        <span className="text-dark-brown">{product.nameAr}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-white)] shadow-[var(--shadow-card)]">
          {image ? (
            <Image src={image.url} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
          ) : (
            <div className="flex h-full items-center justify-center text-dark-brown/40">الصورة غير متوفرة حاليًا</div>
          )}
          <div className="absolute right-4 top-4 flex flex-col gap-1.5">
            {product.isNew ? <Badge tone="sage">جديد</Badge> : null}
            {product.isBestseller ? <Badge tone="primary">الأكثر مبيعًا</Badge> : null}
            {product.isOffer ? <Badge tone="rose">عرض</Badge> : null}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {product.brandName ? (
            <Link href={`/products?brand=${product.brandName}`} className="w-fit text-sm font-bold" style={{ color: "var(--color-primary)" }}>
              {product.brandName}
            </Link>
          ) : null}
          <h1 className="text-2xl font-extrabold text-dark-brown sm:text-3xl">{product.nameAr}</h1>
          <p className="text-sm text-dark-brown/50">{product.nameEn}</p>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          <Price price={product.price} compareAtPrice={product.compareAtPrice} currency={product.currency} size="lg" />
          <p className="leading-relaxed text-dark-brown/75">{product.description}</p>

          {product.weight ? (
            <p className="text-sm text-dark-brown/60">
              <span className="font-bold text-dark-brown">الوزن/الحجم: </span>
              {product.weight}
            </p>
          ) : null}

          <hr className="border-dark-brown/10" />

          <ProductDetailActions product={product} />

          {product.details.length > 0 ? (
            <div className="mt-2">
              <h3 className="mb-2 text-sm font-extrabold text-dark-brown">تفاصيل المنتج</h3>
              <ul className="flex flex-col gap-1.5">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-dark-brown/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-2 flex flex-col gap-3 rounded-2xl bg-[var(--color-white)] p-4 text-sm text-dark-brown/70">
            <div className="flex items-center gap-2">
              <Truck size={17} style={{ color: "var(--color-primary)" }} />
              يتم تحديد خيار الشحن ومدته عند إتمام الطلب.
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} style={{ color: "var(--color-primary)" }} />
              يمكن مراجعة سياسة الاستبدال والاسترجاع قبل الشراء.
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <SectionHeading title="قد يعجبك أيضًا" />
          <ProductCarousel products={related} />
        </section>
      ) : null}
    </div>
  );
}
