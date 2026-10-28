import type { Metadata } from "next";
import { PetTypePage } from "@/components/pet-type-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "الكلاب — Right Meow" };

export default function DogsPage() {
  return (
    <PetTypePage
      petType="dogs"
      titleAr="كل ما يحتاجه كلبك"
      descriptionAr="طعام، تدريب، نزهات، وراحة — جهّز كل ما يحتاجه كلبك في مكان واحد."
      heroImage="https://images.pexels.com/photos/17414483/pexels-photo-17414483.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
      heroImageAlt="كلاب ذهبية سعيدة في استوديو"
    />
  );
}
