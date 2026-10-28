import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "من نحن — Right Meow" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold" style={{ backgroundColor: "var(--color-sage)", color: "var(--color-dark-brown)" }}>
            من نحن
          </span>
          <h1 className="text-3xl font-extrabold text-dark-brown sm:text-4xl">Right Meow — by Yarr</h1>
          <p className="mt-5 leading-relaxed text-dark-brown/75">
            Right Meow هو متجر متخصص في مستلزمات الحيوانات الأليفة، نسعى من خلاله لتوفير مجموعة مختارة بعناية من
            الأطعمة والألعاب ومستلزمات العناية التي تناسب القطط والكلاب والحيوانات الصغيرة والأسماك.
          </p>
          <p className="mt-4 leading-relaxed text-dark-brown/75">
            نؤمن بأن كل حيوان أليف يستحق اهتمامًا حقيقيًا، لذلك نحرص على تنظيم منتجاتنا بوضوح، وعرض معلومات دقيقة عن
            كل منتج، لتسهيل تجربة التسوق لأصحاب الحيوانات الأليفة.
          </p>
          <Link href="/products" className="mt-6 inline-block rounded-full px-7 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
            تسوق الآن
          </Link>
        </div>
        <div className="relative h-72 overflow-hidden rounded-[2rem] shadow-xl sm:h-96">
          <Image
            src="https://images.pexels.com/photos/37559533/pexels-photo-37559533.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=600"
            alt="عرض لمستلزمات الحيوانات الأليفة في متجر"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
