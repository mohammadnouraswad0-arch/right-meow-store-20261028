"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="بريدك الإلكتروني"
        className="w-full rounded-full border border-dark-brown/15 bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="اشترك"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-60"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <Send size={16} />
      </button>
      {status === "done" ? <span className="sr-only">تم الاشتراك بنجاح</span> : null}
    </form>
  );
}
