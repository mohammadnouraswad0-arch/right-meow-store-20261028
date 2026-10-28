"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "transfer">("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shippingFee = shippingMethod === "express" ? 25 : subtotal > 200 ? 0 : 15;
  const total = subtotal + shippingFee;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0) return;
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          country: formData.get("country"),
          city: formData.get("city"),
          address: formData.get("address"),
          notes: formData.get("notes"),
          shippingMethod,
          paymentMethod,
          items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity, variant: l.variant })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "تعذر إتمام الطلب");
        setLoading(false);
        return;
      }
      clear();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch {
      setError("تعذر الاتصال بالخادم، حاول مرة أخرى");
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="mb-4 text-dark-brown/70">سلتك فارغة، أضف بعض المنتجات أولًا.</p>
        <Link href="/products" className="rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-2xl font-extrabold text-dark-brown sm:text-3xl">إتمام الطلب</h1>
      <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl bg-[var(--color-white)] p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-base font-extrabold text-dark-brown">بيانات التواصل والتوصيل</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="الاسم الكامل" name="name" required />
              <Field label="رقم الهاتف" name="phone" required type="tel" />
              <Field label="البريد الإلكتروني (اختياري)" name="email" type="email" />
              <Field label="الدولة" name="country" required />
              <Field label="المدينة" name="city" required />
              <Field label="العنوان التفصيلي" name="address" required className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-dark-brown">ملاحظات إضافية (اختياري)</label>
                <textarea name="notes" rows={3} className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-[var(--color-white)] p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-base font-extrabold text-dark-brown">طريقة الشحن</h2>
            <div className="flex flex-col gap-2">
              <ShippingOption
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
                title="شحن عادي"
                description={subtotal > 200 ? "مجاني للطلبات فوق 200 ر.س" : "15 ر.س"}
              />
              <ShippingOption checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} title="شحن سريع" description="25 ر.س" />
            </div>
          </section>

          <section className="rounded-2xl bg-[var(--color-white)] p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-base font-extrabold text-dark-brown">طريقة الدفع</h2>
            <div className="flex flex-col gap-2">
              <ShippingOption checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} title="الدفع عند الاستلام" description="ادفع نقدًا عند استلام الطلب" />
              <ShippingOption checked={paymentMethod === "transfer"} onChange={() => setPaymentMethod("transfer")} title="تحويل بنكي" description="سيتم التواصل معك لتأكيد التحويل" />
            </div>
            <p className="mt-3 text-xs text-dark-brown/45">
              ملاحظة: بوابة الدفع الإلكتروني غير مفعّلة بعد في هذه النسخة؛ لا يتم تخزين أي بيانات بطاقات بنكية.
            </p>
          </section>
        </div>

        <div className="h-fit rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="mb-4 text-lg font-extrabold text-dark-brown">ملخص الطلب</h2>
          <ul className="mb-4 flex flex-col gap-3 border-b border-dark-brown/10 pb-4">
            {lines.map((l) => (
              <li key={`${l.productId}-${l.variant ?? ""}`} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-cream)]">
                  {l.image ? <Image src={l.image} alt={l.nameAr} fill className="object-cover" /> : null}
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-1 font-semibold text-dark-brown">{l.nameAr}</p>
                  <p className="text-xs text-dark-brown/50">الكمية: {l.quantity}</p>
                </div>
                <span className="text-sm font-bold text-dark-brown">{formatPrice(l.price * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-dark-brown/70">
              <span>المجموع الفرعي</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-dark-brown/70">
              <span>الشحن</span>
              <span>{shippingFee === 0 ? "مجاني" : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between border-t border-dark-brown/10 pt-2 text-base font-extrabold text-dark-brown">
              <span>الإجمالي</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          {error ? <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full py-3.5 text-sm font-bold text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {loading ? "جارٍ إرسال الطلب..." : "تأكيد الطلب"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-semibold text-dark-brown">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
      />
    </div>
  );
}

function ShippingOption({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
}) {
  return (
    <label
      className="flex cursor-pointer items-center justify-between rounded-xl border-2 p-3.5 transition-colors"
      style={checked ? { borderColor: "var(--color-primary)", backgroundColor: "var(--color-cream)" } : { borderColor: "color-mix(in srgb, var(--color-dark-brown) 12%, transparent)" }}
    >
      <div className="flex items-center gap-3">
        <input type="radio" checked={checked} onChange={onChange} />
        <div>
          <p className="text-sm font-bold text-dark-brown">{title}</p>
          <p className="text-xs text-dark-brown/55">{description}</p>
        </div>
      </div>
    </label>
  );
}
