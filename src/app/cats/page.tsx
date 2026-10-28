import type { Metadata } from "next";
import { PetTypePage } from "@/components/pet-type-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "القطط — Right Meow" };

export default function CatsPage() {
  return (
    <PetTypePage
      petType="cats"
      titleAr="كل ما تحتاجه قطتك"
      descriptionAr="اكتشف الأطعمة والمكافآت والألعاب ومستلزمات العناية المناسبة لقطتك."
      heroImage="https://images.pexels.com/photos/38747760/pexels-photo-38747760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
      heroImageAlt="قطة برتقالية بين أوراق الشجر الخضراء"
    />
  );
}
