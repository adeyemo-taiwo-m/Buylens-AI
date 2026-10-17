import { NextRequest, NextResponse } from "next/server";
import { DEMO_EMAIL, DEMO_PASSWORD, ensureSupabaseDemoUser, getDemoSession, newVisitorId, setDemoCookies, signInWithSupabase } from "@/lib/server/demo-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) return NextResponse.json({ error: "Use the shared demo credentials to continue." }, { status: 401 });
    const existing = await getDemoSession();
    let identity: Awaited<ReturnType<typeof signInWithSupabase>>;
    try {
      identity = await signInWithSupabase(email, password);
    } catch {
      await ensureSupabaseDemoUser();
      identity = await signInWithSupabase(email, password);
    }
    const response = NextResponse.json({ ok: true });
    setDemoCookies(response, identity.userId, existing?.visitorId || newVisitorId(), identity.accessToken);
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to sign in." }, { status: 503 });
  }
}
