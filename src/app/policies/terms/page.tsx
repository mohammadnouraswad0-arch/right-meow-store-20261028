import { PolicyLayout } from "@/components/policy-layout";

export const metadata = { title: "الشروط والأحكام — Right Meow" };

export default function TermsPage() {
  return (
    <PolicyLayout title="الشروط والأحكام">
      <p>باستخدامك لمتجر Right Meow فإنك توافق على الشروط التالية:</p>
      <ul>
        <li>المعلومات المعروضة عن المنتجات (الأسعار، المخزون، الأوصاف) قابلة للتحديث دون إشعار مسبق.</li>
        <li>يتم تأكيد الطلبات بعد التحقق من توفر المنتج والسعر الفعلي في قاعدة البيانات.</li>
        <li>يُمنع استخدام المتجر لأي غرض غير قانوني أو مخالف للأنظمة المعمول بها.</li>
      </ul>
      <p>لأي استفسار حول هذه الشروط، يمكنكم التواصل معنا عبر صفحة اتصل بنا.</p>
    </PolicyLayout>
  );
}
