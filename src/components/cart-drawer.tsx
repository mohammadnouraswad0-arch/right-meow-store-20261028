"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useUIStore } from "@/lib/ui-store";
import { Price } from "@/components/ui/price";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const cartOpen = useUIStore((s) => s.cartOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const lines = useCartStore((s) => s.lines);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const subtotal = useCartStore((s) => s.subtotal());

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-dark-brown/40 transition-opacity ${cartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-[var(--color-white)] shadow-2xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-dark-brown/10 p-4">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-dark-brown">
            <ShoppingBag size={20} /> سلة التسوق
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="إغلاق السلة">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-dark-brown/60">
              <ShoppingBag size={40} />
              <p>سلتك فارغة حاليًا</p>
              <Link
                href="/products"
                onClick={() => setCartOpen(false)}
                className="rounded-full px-5 py-2 text-sm font-bold text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.variant ?? ""}`} className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--color-cream)]">
                    {line.image ? <Image src={line.image} alt={line.nameAr} fill className="object-cover" /> : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <Link href={`/products/${line.slug}`} onClick={() => setCartOpen(false)} className="line-clamp-1 text-sm font-bold text-dark-brown">
                      {line.nameAr}
                    </Link>
                    {line.variant ? <span className="text-xs text-dark-brown/50">{line.variant}</span> : null}
                    <Price price={line.price} compareAtPrice={line.compareAtPrice} size="sm" />
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-dark-brown/15">
                        <button
                          className="p-1.5"
                          onClick={() => setQuantity(line.productId, line.quantity - 1, line.variant)}
                          aria-label="إنقاص الكمية"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-semibold">{line.quantity}</span>
                        <button
                          className="p-1.5"
                          onClick={() => setQuantity(line.productId, line.quantity + 1, line.variant)}
                          aria-label="زيادة الكمية"
                          disabled={line.quantity >= line.stock}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(line.productId, line.variant)}
                        aria-label="حذف المنتج"
                        className="text-dark-brown/40 hover:text-[var(--color-primary)]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="border-t border-dark-brown/10 p-4">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-dark-brown">
              <span>المجموع الفرعي</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-3 text-xs text-dark-brown/50">يتم احتساب الشحن والضريبة عند إتمام الطلب.</p>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full rounded-full py-3 text-center text-sm font-bold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              إتمام الطلب
            </Link>
            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className="mt-2 block w-full rounded-full border border-dark-brown/15 py-3 text-center text-sm font-bold text-dark-brown"
            >
              عرض السلة
            </Link>
          </div>
        ) : null}
      </aside>
    </>
  );
}
