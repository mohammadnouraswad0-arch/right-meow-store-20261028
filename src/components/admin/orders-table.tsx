"use client";

import { useState } from "react";
import type { orders as ordersTable } from "@/db/schema";
import { formatPrice } from "@/lib/format";

type OrderRow = typeof ordersTable.$inferSelect;

const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const statusLabels: Record<string, string> = {
  pending: "قيد المراجعة",
  confirmed: "مؤكد",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

export function AdminOrdersTable({ initialOrders }: { initialOrders: OrderRow[] }) {
  const [rows, setRows] = useState(initialOrders);

  async function updateStatus(id: number, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  if (rows.length === 0) {
    return <p className="rounded-2xl bg-[var(--color-white)] p-8 text-center text-sm text-dark-brown/55">لا توجد طلبات حتى الآن.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {rows.map((order) => (
        <div key={order.id} className="rounded-2xl bg-[var(--color-white)] p-4 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dark-brown/10 pb-3">
            <div>
              <p className="font-extrabold text-dark-brown">طلب #{order.id}</p>
              <p className="text-xs text-dark-brown/55">{new Date(order.createdAt).toLocaleString("ar-SA")}</p>
            </div>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
              className="rounded-full border border-dark-brown/15 px-3 py-1.5 text-xs font-bold"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 grid gap-2 text-sm text-dark-brown/70 sm:grid-cols-2">
            <p><span className="font-semibold text-dark-brown">العميل:</span> {order.customerName}</p>
            <p><span className="font-semibold text-dark-brown">الهاتف:</span> {order.phone}</p>
            <p><span className="font-semibold text-dark-brown">المدينة:</span> {order.city}, {order.country}</p>
            <p><span className="font-semibold text-dark-brown">الإجمالي:</span> {formatPrice(order.total)}</p>
          </div>
          <ul className="mt-3 flex flex-col gap-1 border-t border-dark-brown/10 pt-3 text-xs text-dark-brown/60">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.nameAr} × {item.quantity} — {formatPrice(item.price * item.quantity)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
