"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-dark-brown">الاسم</label>
          <input name="name" required className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-dark-brown">البريد الإلكتروني</label>
          <input name="email" type="email" required className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-brown">الموضوع</label>
        <input name="subject" required className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-brown">الرسالة</label>
        <textarea name="message" required rows={5} className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-fit rounded-full px-7 py-3 text-sm font-bold text-white disabled:opacity-60"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {status === "loading" ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </button>
      {status === "done" ? <p className="text-sm font-semibold text-green-700">تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا.</p> : null}
      {status === "error" ? <p className="text-sm font-semibold text-red-600">حدث خطأ أثناء الإرسال، حاول مرة أخرى.</p> : null}
    </form>
  );
}
