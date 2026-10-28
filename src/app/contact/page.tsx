import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { getGeneralSettings } from "@/db/settings";
import { ContactForm } from "@/components/contact-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "اتصل بنا — Right Meow" };

export default async function ContactPage() {
  const settings = await getGeneralSettings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-3xl font-extrabold text-dark-brown">اتصل بنا</h1>
      <p className="mb-10 text-dark-brown/65">يسعدنا تواصلك معنا لأي استفسار أو اقتراح.</p>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <ContactForm />
        <div className="flex flex-col gap-4 rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)] text-sm text-dark-brown/70">
          <p className="flex items-center gap-2">
            <Mail size={17} style={{ color: "var(--color-primary)" }} /> {settings.email || "سيتم عرض البريد الإلكتروني الرسمي هنا بعد إضافته من لوحة التحكم"}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={17} style={{ color: "var(--color-primary)" }} /> {settings.phone || "سيتم عرض رقم الهاتف هنا بعد إضافته من لوحة التحكم"}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={17} style={{ color: "var(--color-primary)" }} /> {settings.address || "سيتم عرض العنوان هنا بعد إضافته من لوحة التحكم"}
          </p>
        </div>
      </div>
    </div>
  );
}
