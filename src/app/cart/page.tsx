"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Price } from "@/components/ui/price";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-2xl font-extrabold text-dark-brown sm:text-3xl">سلة التسوق</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-[var(--color-white)] py-20 text-center">
          <ShoppingBag size={44} className="text-dark-brown/40" />
          <p className="text-dark-brown/70">سلتك فارغة حاليًا</p>
          <Link href="/products" className="rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="flex flex-col gap-4">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.variant ?? ""}`} className="flex gap-4 rounded-2xl bg-[var(--color-white)] p-4 shadow-[var(--shadow-card)]">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-cream)] sm:h-28 sm:w-28">
                  {line.image ? <Image src={line.image} alt={line.nameAr} fill className="object-cover" /> : null}
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <Link href={`/products/${line.slug}`} className="font-bold text-dark-brown hover:underline">
                    {line.nameAr}
                  </Link>
                  {line.variant ? <span className="text-xs text-dark-brown/50">{line.variant}</span> : null}
                  <Price price={line.price} compareAtPrice={line.compareAtPrice} size="sm" />
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-dark-brown/15">
                      <button className="p-2" onClick={() => setQuantity(line.productId, line.quantity - 1, line.variant)} aria-label="إنقاص">
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[1.75rem] text-center text-sm font-bold">{line.quantity}</span>
                      <button
                        className="p-2"
                        onClick={() => setQuantity(line.productId, line.quantity + 1, line.variant)}
                        disabled={line.quantity >= line.stock}
                        aria-label="زيادة"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(line.productId, line.variant)} className="flex items-center gap-1 text-sm text-dark-brown/50 hover:text-[var(--color-primary)]">
                      <Trash2 size={15} /> حذف
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-lg font-extrabold text-dark-brown">ملخص الطلب</h2>
            <div className="flex items-center justify-between text-sm text-dark-brown/70">
              <span>المجموع الفرعي</span>
              <span className="font-bold text-dark-brown">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-dark-brown/50">يتم احتساب الشحن عند إتمام الطلب حسب المدينة وطريقة الشحن.</p>
            <Link
              href="/checkout"
              className="mt-5 block w-full rounded-full py-3.5 text-center text-sm font-bold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              متابعة الدفع
            </Link>
            <Link href="/products" className="mt-3 block w-full text-center text-sm font-semibold text-dark-brown/60 hover:text-[var(--color-primary)]">
              متابعة التسوق
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
