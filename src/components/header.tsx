"use client";

import Link from "next/link";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { LogoLockup } from "@/components/logo";
import { SearchBar } from "@/components/search-bar";
import { navLinks } from "@/lib/site-config";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useUIStore } from "@/lib/ui-store";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const wishCount = useWishlistStore((s) => s.items.length);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const menuOpen = useUIStore((s) => s.menuOpen);
  const setMenuOpen = useUIStore((s) => s.setMenuOpen);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-dark-brown/10 bg-[var(--color-cream)]/95">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          className="lg:hidden"
          aria-label="فتح القائمة"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} style={{ color: "var(--color-dark-brown)" }} />
        </button>

        <LogoLockup />

        <nav className="mr-4 hidden flex-1 items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-dark-brown/80 transition-colors hover:text-[var(--color-primary)]">
              {link.labelAr}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 md:block lg:max-w-xs">
          <SearchBar />
        </div>

        <div className="mr-auto flex items-center gap-1 sm:gap-2">
          <Link href="/wishlist" aria-label="المفضلة" className="relative rounded-full p-2 hover:bg-dark-brown/5">
            <Heart size={22} style={{ color: "var(--color-dark-brown)" }} />
            {wishCount > 0 ? (
              <span className="absolute -left-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                {wishCount}
              </span>
            ) : null}
          </Link>
          <button aria-label="سلة التسوق" className="relative rounded-full p-2 hover:bg-dark-brown/5" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={22} style={{ color: "var(--color-dark-brown)" }} />
            {totalItems > 0 ? (
              <span className="animate-pop absolute -left-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                {totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>

      {/* Mobile menu */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-dark-brown/45 transition-opacity lg:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
        onClick={(event) => event.stopPropagation()}
        style={{ backgroundColor: "var(--color-white)", opacity: 1 }}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(86vw,24rem)] flex-col overflow-y-auto border-l border-dark-brown/10 p-5 shadow-2xl transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex shrink-0 items-center justify-between">
          <LogoLockup />
          <button aria-label="إغلاق القائمة" onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex shrink-0 flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-bold text-dark-brown hover:bg-[var(--color-cream)]"
            >
              {link.labelAr}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
