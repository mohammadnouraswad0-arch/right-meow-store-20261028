import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const products = await getProducts({
    petType: sp.get("petType") ?? undefined,
    categorySlug: sp.get("category") ?? undefined,
    brandSlug: sp.get("brand") ?? undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    onSale: sp.get("onSale") === "1",
    inStock: sp.get("inStock") === "1",
    search: sp.get("search") ?? undefined,
    sort: (sp.get("sort") as any) ?? undefined,
  });
  return NextResponse.json({ products });
}
