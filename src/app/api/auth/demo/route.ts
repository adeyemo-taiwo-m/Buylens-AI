import { NextResponse } from "next/server";
import { DEMO_EMAIL, DEMO_PASSWORD, ensureSupabaseDemoUser, getDemoSession, newVisitorId, setDemoCookies, signInWithSupabase } from "@/lib/server/demo-auth";

export async function POST() {
  try {
    const existing = await getDemoSession();
    let identity: Awaited<ReturnType<typeof signInWithSupabase>>;
    try {
      identity = await signInWithSupabase(DEMO_EMAIL, DEMO_PASSWORD);
    } catch {
      await ensureSupabaseDemoUser();
      identity = await signInWithSupabase(DEMO_EMAIL, DEMO_PASSWORD);
    }
    const response = NextResponse.json({ ok: true });
    setDemoCookies(response, identity.userId, existing?.visitorId || newVisitorId(), identity.accessToken);
    return response;
  } catch (error) {
    console.error("Demo login failed", error);
    return NextResponse.json({ error: "Demo login is temporarily unavailable. Please use the credentials shown below." }, { status: 503 });
  }
}
