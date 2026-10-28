import type { ReactNode } from "react";

export function PolicyLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-3xl font-extrabold text-dark-brown">{title}</h1>
      <div className="flex flex-col gap-4 rounded-2xl bg-[var(--color-white)] p-6 text-sm leading-relaxed text-dark-brown/75 shadow-[var(--shadow-card)] [&_ul]:list-disc [&_ul]:pr-5 [&_li]:mb-1.5">
        {children}
      </div>
    </div>
  );
}
