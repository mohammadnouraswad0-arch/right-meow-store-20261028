"use client";

import { useState } from "react";
import type { categories as categoriesTable } from "@/db/schema";

type CategoryRow = typeof categoriesTable.$inferSelect;

export function AdminCategoriesTable({ initialCategories }: { initialCategories: CategoryRow[] }) {
  const [rows, setRows] = useState(initialCategories);

  async function patch(id: number, patch: Record<string, unknown>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } as CategoryRow : r)));
    await fetch("/api/admin/categories", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-[var(--color-white)] shadow-[var(--shadow-card)]">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-dark-brown/10 text-right text-xs text-dark-brown/55">
            <th className="p-3">الفئة</th>
            <th className="p-3">نوع الحيوان</th>
            <th className="p-3">الترتيب</th>
            <th className="p-3">ظاهرة</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="border-b border-dark-brown/5">
              <td className="p-3 font-semibold text-dark-brown">{c.nameAr}</td>
              <td className="p-3 text-dark-brown/60">{c.petType}</td>
              <td className="p-3">
                <input
                  type="number"
                  defaultValue={c.sortOrder}
                  onBlur={(e) => patch(c.id, { sortOrder: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-dark-brown/15 px-2 py-1"
                />
              </td>
              <td className="p-3">
                <input type="checkbox" checked={c.visible} onChange={(e) => patch(c.id, { visible: e.target.checked })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
