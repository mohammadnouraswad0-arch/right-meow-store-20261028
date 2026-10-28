"use client";

import { useState } from "react";
import type { GeneralSettings } from "@/db/settings";

export function AdminSettingsForm({ initialSettings }: { initialSettings: GeneralSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function field(key: keyof GeneralSettings, label: string, textarea = false) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-brown">{label}</label>
        {textarea ? (
          <textarea
            rows={3}
            value={settings[key]}
            onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
            className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        ) : (
          <input
            value={settings[key]}
            onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
            className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)]">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("storeNameAr", "اسم المتجر")}
        {field("tagline", "التوقيع")}
        {field("currency", "رمز العملة")}
        {field("country", "الدولة المستهدفة")}
        {field("email", "البريد الإلكتروني للتواصل")}
        {field("phone", "رقم الهاتف")}
      </div>
      {field("address", "العنوان")}
      {field("announcementAr", "رسالة الشريط العلوي")}
      {field("heroHeadlineAr", "عنوان الواجهة الرئيسية")}
      {field("heroDescriptionAr", "وصف الواجهة الرئيسية", true)}
      <button type="submit" className="w-fit rounded-full px-7 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
        حفظ التغييرات
      </button>
      {saved ? <p className="text-sm font-semibold text-green-700">تم الحفظ بنجاح</p> : null}
    </form>
  );
}
