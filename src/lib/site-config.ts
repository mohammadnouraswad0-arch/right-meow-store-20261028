// Centralized, editable store configuration. Values here are safe fallback
// defaults; real values are meant to be managed from /admin (store_settings
// table) once an operator fills them in. We never invent fake contact data.
export const siteConfig = {
  storeNameAr: "Right Meow",
  tagline: "by Yarr",
  descriptionAr: "متجر Right Meow لمستلزمات الحيوانات الأليفة",
  currency: "SAR",
};

export const navLinks = [
  { href: "/", labelAr: "الرئيسية" },
  { href: "/products", labelAr: "جميع المنتجات" },
  { href: "/cats", labelAr: "القطط" },
  { href: "/dogs", labelAr: "الكلاب" },
  { href: "/small-pets", labelAr: "الحيوانات الصغيرة" },
  { href: "/fish", labelAr: "الأسماك" },
  { href: "/offers", labelAr: "العروض" },
  { href: "/about", labelAr: "من نحن" },
];
