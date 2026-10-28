import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-sage)" }}>
        <CheckCircle2 size={32} style={{ color: "var(--color-dark-brown)" }} />
      </span>
      <h1 className="text-2xl font-extrabold text-dark-brown sm:text-3xl">تم استلام طلبك بنجاح 🎉</h1>
      {orderId ? <p className="text-dark-brown/70">رقم الطلب: <span className="font-bold">#{orderId}</span></p> : null}
      <p className="max-w-sm text-sm text-dark-brown/60">
        سيتم التواصل معك لتأكيد تفاصيل التوصيل. يمكنك متابعة تسوق المزيد من المنتجات في الوقت نفسه.
      </p>
      <Link href="/products" className="mt-2 rounded-full px-7 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
        متابعة التسوق
      </Link>
    </div>
  );
}
