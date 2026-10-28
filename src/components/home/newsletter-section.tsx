import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/ui/reveal";

export function NewsletterSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <Reveal
        className="flex flex-col items-center gap-4 rounded-[2rem] px-6 py-12 text-center sm:px-12"
        >
        <div
          className="flex w-full flex-col items-center gap-4 rounded-[2rem] px-4 py-12 sm:px-10"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Mail size={22} className="text-white" />
          </span>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">A Little More Love in Your Inbox</h2>
          <p className="max-w-md text-sm text-white/85 sm:text-base">
            Get updates on new arrivals, useful finds, and special offers.
          </p>
          <div className="mt-2 w-full max-w-sm [&_input]:bg-white [&_input]:text-dark-brown [&_button]:bg-[var(--color-dark-brown)]">
            <NewsletterForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
