import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rows = await db.select().from(categories).orderBy(categories.sortOrder);
  return NextResponse.json({ categories: rows });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id, ...patch } = await req.json();
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
  const allowed: Record<string, unknown> = {};
  for (const key of ["visible", "sortOrder", "nameAr", "description"]) {
    if (key in patch) allowed[key] = patch[key];
  }
  await db.update(categories).set(allowed).where(eq(categories.id, id));
  return NextResponse.json({ ok: true });
}
