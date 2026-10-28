"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ابحث عن منتج، فئة، أو علامة..."
        className="w-full rounded-full border border-dark-brown/15 bg-[var(--color-cream)] py-2.5 pr-10 pl-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
      />
      <button type="submit" aria-label="بحث" className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-brown/50">
        <Search size={17} />
      </button>
    </form>
  );
}
