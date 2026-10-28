import type { Metadata } from "next";

export const metadata: Metadata = { title: "الأسئلة الشائعة — Right Meow" };

const faqs = [
  {
    q: "كيف يمكنني تتبع طلبي؟",
    a: "بعد تأكيد الطلب سيتم التواصل معك عبر رقم الهاتف أو البريد الإلكتروني المسجل لمتابعة حالة الشحن.",
  },
  {
    q: "هل يمكنني تعديل طلبي بعد إرساله؟",
    a: "يمكنك التواصل معنا في أقرب وقت ممكن بعد إرسال الطلب لمحاولة تعديله قبل تجهيزه للشحن.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "تتوفر حاليًا خيارات الدفع عند الاستلام والتحويل البنكي. سيتم إضافة بوابات دفع إلكتروني إضافية لاحقًا.",
  },
  {
    q: "هل المنتجات المعروضة متوفرة دائمًا؟",
    a: "نعرض حالة المخزون على كل صفحة منتج مباشرة، وإذا نفدت الكمية سيظهر ذلك بوضوح على المنتج.",
  },
  {
    q: "كيف أعرف أن صورة المنتج مطابقة للمنتج الفعلي؟",
    a: "نحرص على مطابقة كل صورة منتج لاسمه ووصفه، وفي حال وجود أي ملاحظة حول صورة منتج نرجو التواصل معنا لتصحيحها فورًا.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-extrabold text-dark-brown">الأسئلة الشائعة</h1>
      <div className="flex flex-col gap-3">
        {faqs.map((item) => (
          <details key={item.q} className="group rounded-2xl bg-[var(--color-white)] p-5 shadow-[var(--shadow-card)]">
            <summary className="cursor-pointer list-none text-base font-bold text-dark-brown marker:content-none">
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-dark-brown/70">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
