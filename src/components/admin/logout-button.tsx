"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.push("/admin");
        router.refresh();
      }}
      className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-dark-brown/70 hover:bg-[var(--color-cream)]"
    >
      <LogOut size={16} />
      تسجيل الخروج
    </button>
  );
}
