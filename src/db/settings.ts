import { eq } from "drizzle-orm";
import { db } from "@/db";
import { storeSettings } from "@/db/schema";

export type GeneralSettings = {
  storeNameAr: string;
  tagline: string;
  descriptionAr: string;
  currency: string;
  country: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  twitter: string;
  announcementAr: string;
  heroHeadlineAr: string;
  heroDescriptionAr: string;
};

const defaults: GeneralSettings = {
  storeNameAr: "Right Meow",
  tagline: "by Yarr",
  descriptionAr: "متجر Right Meow لمستلزمات الحيوانات الأليفة",
  currency: "SAR",
  country: "",
  email: "",
  phone: "",
  address: "",
  instagram: "",
  twitter: "",
  announcementAr: "كل ما يحبه حيوانك الأليف في مكان واحد",
  heroHeadlineAr: "كل ما يحبه صديقك الأليف",
  heroDescriptionAr: "اكتشف مجموعة مختارة من مستلزمات الحيوانات الأليفة، من الطعام والمكافآت إلى الألعاب والإكسسوارات.",
};

export async function getGeneralSettings(): Promise<GeneralSettings> {
  try {
    const rows = await db.select().from(storeSettings).where(eq(storeSettings.key, "general")).limit(1);
    if (rows.length === 0) return defaults;
    return { ...defaults, ...(rows[0].value as Partial<GeneralSettings>) };
  } catch {
    return defaults;
  }
}

export async function updateGeneralSettings(patch: Partial<GeneralSettings>): Promise<GeneralSettings> {
  const current = await getGeneralSettings();
  const next = { ...current, ...patch };
  const existing = await db.select().from(storeSettings).where(eq(storeSettings.key, "general")).limit(1);
  if (existing.length === 0) {
    await db.insert(storeSettings).values({ key: "general", value: next });
  } else {
    await db.update(storeSettings).set({ value: next }).where(eq(storeSettings.key, "general"));
  }
  return next;
}
