import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { AdminCategoriesTable } from "@/components/admin/categories-table";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const rows = await db.select().from(categories).orderBy(categories.sortOrder);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-dark-brown">إدارة الفئات</h1>
      <p className="mb-6 text-sm text-dark-brown/55">تحكم بترتيب وظهور فئات المنتجات في المتجر.</p>
      <AdminCategoriesTable initialCategories={rows} />
    </div>
  );
}
