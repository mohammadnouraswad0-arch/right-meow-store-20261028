import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

export function EditorialSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal className="grid items-center gap-8 overflow-hidden rounded-[2rem] lg:grid-cols-2" >
        <div
          className="order-2 flex flex-col justify-center gap-4 rounded-[2rem] p-8 sm:p-12 lg:order-1"
          style={{ backgroundColor: "var(--color-sage)" }}
        >
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: "var(--color-dark-brown)" }}>
            Little Things. Happier Pets.
          </h2>
          <p className="text-sm leading-relaxed text-dark-brown/75 sm:text-base">
            From everyday essentials to playful discoveries, find thoughtful picks for the pets who make life special.
          </p>
          <Link
            href="/products"
            className="mt-2 inline-block w-fit rounded-full px-6 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: "var(--color-dark-brown)" }}
          >
            اكتشف المجموعة
          </Link>
        </div>
        <div className="relative order-1 h-72 overflow-hidden rounded-[2rem] sm:h-96 lg:order-2">
          <Image
            src="https://images.pexels.com/photos/6001393/pexels-photo-6001393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1000"
            alt="سيدة تداعب قطتها بحنان في جلسة منزلية دافئة"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
