import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LogoLockup } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import type { GeneralSettings } from "@/db/settings";

const shopLinks = [
  { href: "/products", label: "جميع المنتجات" },
  { href: "/cats", label: "القطط" },
  { href: "/dogs", label: "الكلاب" },
  { href: "/small-pets", label: "الحيوانات الصغيرة" },
  { href: "/fish", label: "الأسماك" },
  { href: "/offers", label: "العروض" },
];

const serviceLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/wishlist", label: "المفضلة" },
  { href: "/cart", label: "سلة التسوق" },
];

const policyLinks = [
  { href: "/policies/shipping", label: "سياسة الشحن" },
  { href: "/policies/returns", label: "الاستبدال والاسترجاع" },
  { href: "/policies/privacy", label: "سياسة الخصوصية" },
  { href: "/policies/terms", label: "الشروط والأحكام" },
];

export function Footer({ settings }: { settings: GeneralSettings }) {
  return (
    <footer className="mt-20 border-t border-dark-brown/10 bg-[var(--color-white)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <LogoLockup />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-dark-brown/70">
              Right Meow متجر مستلزمات الحيوانات الأليفة — نقدم مجموعة مختارة من الطعام والألعاب ومستلزمات العناية
              لقططكم وكلابكم وحيواناتكم الأليفة الصغيرة وأسماككم.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold text-dark-brown">التسوق</h3>
            <ul className="flex flex-col gap-2">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dark-brown/70 hover:text-[var(--color-primary)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold text-dark-brown">خدمة العملاء</h3>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dark-brown/70 hover:text-[var(--color-primary)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold text-dark-brown">السياسات والتواصل</h3>
            <ul className="flex flex-col gap-2">
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dark-brown/70 hover:text-[var(--color-primary)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 text-sm text-dark-brown/60">
              <span className="flex items-center gap-2">
                <Mail size={15} /> {settings.email || "سيتم عرض البريد الإلكتروني بعد إضافته من لوحة التحكم"}
              </span>
              <span className="flex items-center gap-2">
                <Phone size={15} /> {settings.phone || "سيتم عرض رقم الهاتف بعد إضافته من لوحة التحكم"}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={15} /> {settings.address || "سيتم عرض العنوان بعد إضافته من لوحة التحكم"}
              </span>
            </div>
            <p className="mt-3 text-xs text-dark-brown/45">
              ستظهر روابط التواصل الاجتماعي هنا بعد ربطها من لوحة التحكم.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-dark-brown/10 pt-6 text-xs text-dark-brown/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Right Meow by Yarr. جميع الحقوق محفوظة.</p>
          <p>صُمم بعناية لمحبي الحيوانات الأليفة 🐾</p>
        </div>
      </div>
    </footer>
  );
}
