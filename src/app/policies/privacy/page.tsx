import { PolicyLayout } from "@/components/policy-layout";

export const metadata = { title: "سياسة الخصوصية — Right Meow" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="سياسة الخصوصية">
      <p>
        نحترم خصوصية زوار وعملاء متجر Right Meow. تُستخدم البيانات التي تقدمونها (مثل الاسم، رقم الهاتف، والعنوان)
        فقط لغرض معالجة طلباتكم والتواصل معكم بشأنها.
      </p>
      <ul>
        <li>لا نقوم ببيع أو مشاركة بياناتكم الشخصية مع أي جهة خارجية لأغراض تسويقية.</li>
        <li>لا يتم تخزين أي بيانات بطاقات بنكية داخل المتجر.</li>
        <li>يمكنكم طلب حذف بياناتكم من سجلاتنا بالتواصل معنا مباشرة.</li>
      </ul>
      <p>سيتم تحديث هذه السياسة عند إضافة خدمات دفع أو تحليلات إضافية للمتجر.</p>
    </PolicyLayout>
  );
}
