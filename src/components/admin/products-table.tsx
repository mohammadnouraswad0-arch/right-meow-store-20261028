"use client";

import { useState } from "react";
import Image from "next/image";
import type { products as productsTable } from "@/db/schema";

type ProductRow = typeof productsTable.$inferSelect;

export function AdminProductsTable({ initialProducts }: { initialProducts: ProductRow[] }) {
  const [rows, setRows] = useState(initialProducts);
  const [savingId, setSavingId] = useState<number | null>(null);

  async function patch(id: number, patch: Record<string, unknown>) {
    setSavingId(id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } as ProductRow : r)));
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    setSavingId(null);
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-[var(--color-white)] shadow-[var(--shadow-card)]">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-dark-brown/10 text-right text-xs text-dark-brown/55">
            <th className="p-3">المنتج</th>
            <th className="p-3">السعر</th>
            <th className="p-3">سعر العرض</th>
            <th className="p-3">المخزون</th>
            <th className="p-3">ظاهر</th>
            <th className="p-3">جديد</th>
            <th className="p-3">الأكثر مبيعًا</th>
            <th className="p-3">مميز</th>
            <th className="p-3">عرض</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className={`border-b border-dark-brown/5 ${savingId === p.id ? "opacity-60" : ""}`}>
              <td className="flex items-center gap-2 p-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[var(--color-cream)]">
                  {p.images?.[0]?.url ? <Image src={p.images[0].url} alt={p.nameAr} fill className="object-cover" /> : null}
                </div>
                <span className="line-clamp-1 max-w-[160px] font-semibold text-dark-brown">{p.nameAr}</span>
              </td>
              <td className="p-3">
                <input
                  type="number"
                  defaultValue={p.price}
                  onBlur={(e) => patch(p.id, { price: Number(e.target.value) })}
                  className="w-20 rounded-lg border border-dark-brown/15 px-2 py-1"
                />
              </td>
              <td className="p-3">
                <input
                  type="number"
                  defaultValue={p.compareAtPrice ?? ""}
                  onBlur={(e) => patch(p.id, { compareAtPrice: e.target.value ? Number(e.target.value) : null })}
                  className="w-20 rounded-lg border border-dark-brown/15 px-2 py-1"
                />
              </td>
              <td className="p-3">
                <input
                  type="number"
                  defaultValue={p.stock}
                  onBlur={(e) => patch(p.id, { stock: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-dark-brown/15 px-2 py-1"
                />
              </td>
              <td className="p-3">
                <input type="checkbox" checked={p.visible} onChange={(e) => patch(p.id, { visible: e.target.checked })} />
              </td>
              <td className="p-3">
                <input type="checkbox" checked={p.isNew} onChange={(e) => patch(p.id, { isNew: e.target.checked })} />
              </td>
              <td className="p-3">
                <input type="checkbox" checked={p.isBestseller} onChange={(e) => patch(p.id, { isBestseller: e.target.checked })} />
              </td>
              <td className="p-3">
                <input type="checkbox" checked={p.isFeatured} onChange={(e) => patch(p.id, { isFeatured: e.target.checked })} />
              </td>
              <td className="p-3">
                <input type="checkbox" checked={p.isOffer} onChange={(e) => patch(p.id, { isOffer: e.target.checked })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
