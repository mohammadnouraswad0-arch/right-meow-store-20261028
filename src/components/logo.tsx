import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="34" r="22" fill="var(--color-primary)" />
      <path d="M14 20 L22 8 L26 22 Z" fill="var(--color-primary)" />
      <path d="M50 20 L42 8 L38 22 Z" fill="var(--color-primary)" />
      <path d="M17 21 L23 11 L25 22 Z" fill="var(--color-rose)" />
      <path d="M47 21 L41 11 L39 22 Z" fill="var(--color-rose)" />
      <ellipse cx="24" cy="33" rx="3.2" ry="4" fill="var(--color-cream)" />
      <ellipse cx="40" cy="33" rx="3.2" ry="4" fill="var(--color-cream)" />
      <path d="M32 39 L29 43 Q32 46 35 43 Z" fill="var(--color-rose)" />
      <path d="M32 43 Q28 48 20 46" stroke="var(--color-cream)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M32 43 Q36 48 44 46" stroke="var(--color-cream)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M32 41 Q28 37 19 38" stroke="var(--color-cream)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M32 41 Q36 37 45 38" stroke="var(--color-cream)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function LogoLockup({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className ?? ""}`} aria-label="Right Meow – الصفحة الرئيسية">
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className="text-xl font-extrabold tracking-tight"
          style={{ color: dark ? "var(--color-white)" : "var(--color-dark-brown)" }}
        >
          Right Meow
        </span>
        <span
          className="text-[11px] font-medium tracking-wide"
          style={{ color: dark ? "var(--color-rose)" : "var(--color-primary)" }}
        >
          by Yarr
        </span>
      </span>
    </Link>
  );
}
