import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/db";
import { products } from "@/db/schema";
import { AdminProductsTable } from "@/components/admin/products-table";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const rows = await db.select().from(products).orderBy(products.id);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-dark-brown">إدارة المنتجات</h1>
      <p className="mb-6 text-sm text-dark-brown/55">عدّل الأسعار والمخزون وحالة الظهور مباشرة، يتم الحفظ تلقائيًا.</p>
      <AdminProductsTable initialProducts={rows} />
    </div>
  );
}
