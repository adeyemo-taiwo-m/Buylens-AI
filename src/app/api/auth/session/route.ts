import { NextResponse } from "next/server";
import { getDemoSession } from "@/lib/server/demo-auth";

export async function GET() {
  const session = await getDemoSession();
  return NextResponse.json({ authenticated: Boolean(session), isDemo: Boolean(session), visitorId: session?.visitorId || null });
}
