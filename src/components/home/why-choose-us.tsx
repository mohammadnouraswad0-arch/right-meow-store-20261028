import { PackageCheck, PawPrint, ShieldCheck, Smile } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const items = [
  {
    icon: PackageCheck,
    title: "توصيل واضح",
    description: "خيارات توصيل واضحة لتسهيل استلام طلباتك.",
  },
  {
    icon: PawPrint,
    title: "تنوع المنتجات",
    description: "مستلزمات متنوعة للقطط والكلاب والحيوانات الأليفة الأخرى.",
  },
  {
    icon: ShieldCheck,
    title: "تسوق موثوق",
    description: "معلومات واضحة عن المنتجات والأسعار والطلبات.",
  },
  {
    icon: Smile,
    title: "سهولة التسوق",
    description: "تصفح المنتجات واختر ما يناسب حيوانك الأليف بسهولة.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal className="mb-10 text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-dark-brown)" }}>
          لماذا تختار Right Meow؟
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} className={`[animation-delay:${i * 80}ms]`}>
            <div className="flex h-full flex-col items-center gap-3 rounded-[var(--radius-card)] bg-[var(--color-white)] p-5 text-center shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 sm:p-7">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14"
                style={{ backgroundColor: "var(--color-cream)" }}
              >
                <item.icon size={24} style={{ color: "var(--color-primary)" }} />
              </span>
              <h3 className="text-sm font-extrabold text-dark-brown sm:text-base">{item.title}</h3>
              <p className="text-xs text-dark-brown/65 sm:text-sm">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
