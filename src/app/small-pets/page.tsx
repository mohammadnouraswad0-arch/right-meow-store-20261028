import type { Metadata } from "next";
import { PetTypePage } from "@/components/pet-type-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "الحيوانات الصغيرة — Right Meow" };

export default function SmallPetsPage() {
  return (
    <PetTypePage
      petType="small-pets"
      titleAr="رفاهية صغيرة لأصدقاء صغار"
      descriptionAr="طعام ومساكن ومستلزمات مختارة للأرانب وخنازير غينيا وبقية الحيوانات الصغيرة."
      heroImage="https://images.pexels.com/photos/13816977/pexels-photo-13816977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
      heroImageAlt="أرنب بني يقف في الهواء الطلق"
    />
  );
}
