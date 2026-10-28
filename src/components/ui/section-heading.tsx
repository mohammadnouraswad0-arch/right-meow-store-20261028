import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold tracking-wide" style={{ color: "var(--color-primary)" }}>
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-dark-brown)" }}>
          {title}
        </h2>
        {description ? <p className="mt-2 max-w-xl text-sm text-dark-brown/70 sm:text-base">{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          {action.label}
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        </Link>
      ) : null}
    </Reveal>
  );
}

export function Badge({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "sage" | "rose" | "dark" }) {
  const tones: Record<string, string> = {
    primary: "bg-[var(--color-primary)] text-white",
    sage: "bg-[var(--color-sage)] text-[var(--color-dark-brown)]",
    rose: "bg-[var(--color-rose)] text-white",
    dark: "bg-[var(--color-dark-brown)] text-white",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${tones[tone]}`}>{children}</span>;
}
