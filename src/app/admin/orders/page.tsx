import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { AdminOrdersTable } from "@/components/admin/orders-table";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-dark-brown">الطلبات</h1>
      <p className="mb-6 text-sm text-dark-brown/55">راجع الطلبات الواردة وحدّث حالتها.</p>
      <AdminOrdersTable initialOrders={rows} />
    </div>
  );
}
