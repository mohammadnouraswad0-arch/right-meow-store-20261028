import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { getGeneralSettings } from "@/db/settings";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Right Meow — متجر مستلزمات الحيوانات الأليفة",
  description:
    "Right Meow by Yarr: متجر متخصص في مستلزمات القطط والكلاب والحيوانات الصغيرة والأسماك، طعام وألعاب ومستلزمات عناية مختارة بعناية.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getGeneralSettings();
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-[var(--color-cream)] font-sans text-[var(--color-dark-brown)] antialiased">
        <AnnouncementBar message={`🐾 ${settings.announcementAr}`} />
        <Header />
        <CartDrawer />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
