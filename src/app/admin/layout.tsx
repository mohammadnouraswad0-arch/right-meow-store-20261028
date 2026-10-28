import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Tags } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminLogoutButton } from "@/components/admin/logout-button";

const links = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/categories", label: "الفئات", icon: Tags },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/settings", label: "إعدادات المتجر", icon: Settings },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row">
      <aside className="shrink-0 lg:w-56">
        <div className="mb-4 rounded-2xl bg-[var(--color-white)] p-4 shadow-[var(--shadow-card)]">
          <p className="text-sm font-extrabold text-dark-brown">لوحة تحكم Right Meow</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto rounded-2xl bg-[var(--color-white)] p-2 shadow-[var(--shadow-card)] lg:flex-col lg:overflow-visible">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-dark-brown/80 hover:bg-[var(--color-cream)]">
              <l.icon size={16} />
              {l.label}
            </Link>
          ))}
          <AdminLogoutButton />
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
