import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rows = await db.select().from(products).orderBy(products.id);
  return NextResponse.json({ products: rows });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...patch } = body;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  const allowed: Record<string, unknown> = {};
  for (const key of ["price", "compareAtPrice", "stock", "visible", "isBestseller", "isNew", "isFeatured", "isOffer"]) {
    if (key in patch) allowed[key] = typeof patch[key] === "number" ? String(patch[key]) : patch[key];
  }
  if (typeof patch.price === "number") allowed.price = String(patch.price);
  if (typeof patch.compareAtPrice === "number" || patch.compareAtPrice === null) {
    allowed.compareAtPrice = patch.compareAtPrice === null ? null : String(patch.compareAtPrice);
  }
  if (typeof patch.stock === "number") allowed.stock = patch.stock;

  await db.update(products).set(allowed).where(eq(products.id, id));
  return NextResponse.json({ ok: true });
}
