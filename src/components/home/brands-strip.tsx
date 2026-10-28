import Link from "next/link";
import type { BrandDTO } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";

export function BrandsStrip({ brands }: { brands: BrandDTO[] }) {
  const loop = [...brands, ...brands];
  return (
    <section className="py-12" style={{ backgroundColor: "var(--color-white)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-6 text-center">
          <h2 className="text-xl font-extrabold sm:text-2xl" style={{ color: "var(--color-dark-brown)" }}>
            خطوط منتجاتنا الخاصة
          </h2>
          <p className="mt-1 text-sm text-dark-brown/60">علامات Right Meow الداخلية المصممة لتلبية احتياجات حيوانك الأليف</p>
        </Reveal>
      </div>
      <div className="no-scrollbar overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 px-4 hover:[animation-play-state:paused]">
          {loop.map((b, i) => (
            <Link
              key={`${b.id}-${i}`}
              href={`/products?brand=${b.slug}`}
              className="flex w-56 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-dark-brown/10 bg-[var(--color-cream)] px-5 py-6 text-center transition-colors hover:border-[var(--color-primary)]"
            >
              <span className="text-sm font-extrabold text-dark-brown">{b.name}</span>
              {b.description ? <span className="text-[11px] text-dark-brown/55">{b.description}</span> : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
