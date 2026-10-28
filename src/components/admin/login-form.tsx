"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoLockup } from "@/components/logo";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("كلمة المرور غير صحيحة");
      setLoading(false);
      return;
    }
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-4 text-center">
      <LogoLockup className="mb-6" />
      <h1 className="mb-1 text-xl font-extrabold text-dark-brown">تسجيل دخول لوحة التحكم</h1>
      <p className="mb-6 text-sm text-dark-brown/60">هذه المنطقة مخصصة لإدارة المتجر فقط</p>
      <form onSubmit={onSubmit} className="w-full rounded-2xl bg-[var(--color-white)] p-6 text-right shadow-[var(--shadow-card)]">
        <label className="mb-1.5 block text-sm font-semibold text-dark-brown">كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-xl border border-dark-brown/15 bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
        />
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full py-3 text-sm font-bold text-white disabled:opacity-60"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
