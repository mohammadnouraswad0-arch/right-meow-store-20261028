import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getGeneralSettings } from "@/db/settings";
import { AdminSettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const settings = await getGeneralSettings();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-dark-brown">إعدادات المتجر</h1>
      <p className="mb-6 text-sm text-dark-brown/55">
        عدّل بيانات المتجر العامة. الحقول الفارغة (مثل البريد والهاتف) لن تظهر في الموقع حتى تُعبّأ هنا.
      </p>
      <AdminSettingsForm initialSettings={settings} />
    </div>
  );
}
