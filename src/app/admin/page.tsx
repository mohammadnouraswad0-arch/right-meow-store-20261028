import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminLoginForm } from "@/components/admin/login-form";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { Package, ShoppingCart, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const authed = await isAdminAuthenticated();
  if (!authed) return <AdminLoginForm />;

  const [allProducts, allOrders] = await Promise.all([db.select().from(products), db.select().from(orders)]);
  const totalRevenue = allOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const lowStock = allProducts.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStock = allProducts.filter((p) => p.stock <= 0).length;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-dark-brown">نظرة عامة</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Package} label="إجمالي المنتجات" value={allProducts.length} />
        <StatCard icon={ShoppingCart} label="إجمالي الطلبات" value={allOrders.length} />
        <StatCard icon={TrendingUp} label="إجمالي المبيعات" value={`${totalRevenue.toFixed(0)} ر.س`} />
        <StatCard icon={Package} label="منتجات منخفضة المخزون" value={lowStock} highlight={lowStock > 0} />
      </div>
      {outOfStock > 0 ? (
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
          يوجد {outOfStock} منتج نفدت كميته بالكامل، يمكنك مراجعتها من صفحة المنتجات.
        </p>
      ) : null}
      <p className="mt-6 text-sm text-dark-brown/55">
        من هنا يمكنك إدارة المنتجات (الأسعار، المخزون، الظهور)، الفئات، الطلبات، وإعدادات المتجر العامة.
      </p>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="rounded-2xl bg-[var(--color-white)] p-5 shadow-[var(--shadow-card)]">
      <Icon size={20} style={{ color: highlight ? "var(--color-rose)" : "var(--color-primary)" }} />
      <p className="mt-3 text-2xl font-extrabold text-dark-brown">{value}</p>
      <p className="text-xs text-dark-brown/55">{label}</p>
    </div>
  );
}
