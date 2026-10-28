import type { Metadata } from "next";
import { PetTypePage } from "@/components/pet-type-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "الأسماك — Right Meow" };

export default function FishPage() {
  return (
    <PetTypePage
      petType="fish"
      titleAr="عالم مائي متكامل"
      descriptionAr="أحواض ومعدات وديكورات لإنشاء بيئة مائية صحية وجذابة لأسماكك."
      heroImage="https://images.pexels.com/photos/15330135/pexels-photo-15330135.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
      heroImageAlt="سمكة كوي ملونة تسبح في الماء"
    />
  );
}
