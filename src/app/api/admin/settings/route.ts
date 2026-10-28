import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getGeneralSettings, updateGeneralSettings } from "@/db/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const settings = await getGeneralSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const patch = await req.json();
  const settings = await updateGeneralSettings(patch);
  return NextResponse.json({ settings });
}
