import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const DEMO_SESSION_COOKIE = "buylens_demo_session";
export const DEMO_VISITOR_COOKIE = "buylens_visitor_id";
export const DEMO_ACCESS_COOKIE = "buylens_demo_access";
export const DEMO_EMAIL = process.env.DEMO_EMAIL || "demo@buylens.ai";
export const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "BuyLens-Demo-2026";

export type DemoSession = {
  userId: string;
  visitorId: string;
  accessToken?: string;
};

const sessionSecret = () => process.env.SESSION_SECRET || DEMO_PASSWORD;

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

function sessionValue(userId: string) {
  const value = `demo:${userId}`;
  return `${value}.${sign(value)}`;
}

function readSessionValue(value: string | undefined) {
  if (!value) return null;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const payload = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  if (!payload.startsWith("demo:")) return null;
  return payload.slice(5);
}

export function isValidVisitorId(value: string | undefined): value is string {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

export async function getDemoSession(): Promise<DemoSession | null> {
  const store = await cookies();
  const userId = readSessionValue(store.get(DEMO_SESSION_COOKIE)?.value);
  const visitorId = store.get(DEMO_VISITOR_COOKIE)?.value;
  if (!userId || !isValidVisitorId(visitorId)) return null;
  return { userId, visitorId, accessToken: store.get(DEMO_ACCESS_COOKIE)?.value };
}

export function setDemoCookies(response: Response, userId: string, visitorId: string, accessToken?: string) {
  const cookieResponse = response as Response & { cookies?: { set: (name: string, value: string, options: Record<string, unknown>) => void } };
  cookieResponse.cookies?.set(DEMO_SESSION_COOKIE, sessionValue(userId), cookieOptions());
  cookieResponse.cookies?.set(DEMO_VISITOR_COOKIE, visitorId, cookieOptions());
  if (accessToken) cookieResponse.cookies?.set(DEMO_ACCESS_COOKIE, accessToken, { ...cookieOptions(), maxAge: 60 * 60 * 24 });
}

export function cookieOptions() {
  return { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 };
}

export function newVisitorId() {
  return globalThis.crypto.randomUUID();
}

export async function signInWithSupabase(email: string, password: string) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return { userId: "demo-user", accessToken: undefined };

  const response = await fetch(`${url.replace(/\/$/, "")}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: anonKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) throw new Error(data.error_description || data.msg || "Unable to sign in with the demo account.");
  return { userId: data.user?.id || "demo-user", accessToken: data.access_token as string };
}

/**
 * Provision the shared account when a service-role key is available. This is
 * intentionally server-only; the browser only ever calls the demo login route.
 */
export async function ensureSupabaseDemoUser() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return;

  const response = await fetch(`${url.replace(/\/$/, "")}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { demo: true },
    }),
    cache: "no-store",
  });

  if (response.ok) return;
  const data = await response.json().catch(() => ({}));
  const message = String(data.msg || data.message || data.error || "");
  if (/already exists|already registered|duplicate|user_already_exists/i.test(message)) return;
  throw new Error("Unable to provision the shared demo account.");
}
