import Image from "next/image";
import Link from "next/link";
import type { CategoryDTO } from "@/lib/types";

export function CategoryCard({ category, href }: { category: CategoryDTO; href: string }) {
  return (
    <Link
      href={href}
      className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:h-72"
    >
      {category.image ? (
        <Image
          src={category.image}
          alt={category.nameAr}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-sage)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-brown)]/80 via-[var(--color-dark-brown)]/10 to-transparent" />
      <div className="relative z-10 p-4 sm:p-5">
        <h3 className="text-lg font-extrabold text-white sm:text-xl">{category.nameAr}</h3>
        {category.description ? (
          <p className="mt-1 line-clamp-1 text-xs text-white/85 sm:text-sm">{category.description}</p>
        ) : null}
        <span className="mt-2 inline-block text-xs font-bold text-white underline underline-offset-4">تسوق الآن</span>
      </div>
    </Link>
  );
}
