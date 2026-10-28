import Image from "next/image";
import Link from "next/link";
import { PawPrint, Sparkles } from "lucide-react";

export function Hero({ headline, description }: { headline: string; description: string }) {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="pointer-events-none absolute -top-10 right-[8%] text-[var(--color-sage)] opacity-70">
        <PawPrint size={56} className="animate-float" />
      </div>
      <div className="pointer-events-none absolute bottom-10 left-[6%] text-[var(--color-rose)] opacity-60">
        <PawPrint size={38} className="animate-float-slower" />
      </div>
      <div className="pointer-events-none absolute top-1/3 left-[2%] text-[var(--color-primary)] opacity-40 hidden sm:block">
        <Sparkles size={30} className="animate-bob" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div className="order-2 text-center lg:order-1 lg:text-right">
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold"
            style={{ backgroundColor: "var(--color-sage)", color: "var(--color-dark-brown)" }}
          >
            Right Meow — Pet Supplies by Yarr
          </span>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--color-dark-brown)" }}>
            {headline}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-dark-brown/70 sm:text-lg lg:mx-0">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/products"
              className="w-full rounded-full px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              تسوق جميع المنتجات
            </Link>
            <Link
              href="/cats"
              className="w-full rounded-full border-2 px-7 py-3.5 text-center text-sm font-bold transition-colors hover:bg-white sm:w-auto"
              style={{ borderColor: "var(--color-dark-brown)", color: "var(--color-dark-brown)" }}
            >
              اكتشف الأقسام
            </Link>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4 sm:max-w-lg">
            <div className="relative col-span-1 h-56 overflow-hidden rounded-[2rem] shadow-xl sm:h-72">
              <Image
                src="https://images.pexels.com/photos/26612962/pexels-photo-26612962.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=560"
                alt="قطة هادئة تجلس في استوديو بخلفية دافئة"
                fill
                priority
                sizes="(max-width: 1024px) 45vw, 320px"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-1 mt-8 h-56 overflow-hidden rounded-[2rem] shadow-xl sm:h-72">
              <Image
                src="https://images.pexels.com/photos/17186345/pexels-photo-17186345.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=560"
                alt="كلاب ذهبية سعيدة في استوديو بخلفية دافئة"
                fill
                sizes="(max-width: 1024px) 45vw, 320px"
                className="object-cover"
              />
            </div>
          </div>
          <div
            className="animate-float absolute -bottom-6 right-1/2 flex translate-x-1/2 items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl sm:right-6 sm:translate-x-0"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-primary)" }}>
              <PawPrint size={18} className="text-white" />
            </span>
            <div className="text-right">
              <p className="text-xs font-bold text-dark-brown">منتجات مختارة</p>
              <p className="text-[11px] text-dark-brown/60">لكل أفراد العائلة الأليفة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
