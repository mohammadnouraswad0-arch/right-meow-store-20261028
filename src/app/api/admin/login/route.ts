import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
