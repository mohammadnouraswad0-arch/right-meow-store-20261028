import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "rm_admin_session";

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "fallback-dev-secret";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  const payload = `admin:${Date.now()}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64");
}

function isValidToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [payload, signature] = decoded.split(".");
    if (!payload || !signature) return false;
    return sign(payload) === signature;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return isValidToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
