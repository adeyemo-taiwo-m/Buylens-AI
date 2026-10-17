import { NextResponse } from "next/server";
import { DEMO_ACCESS_COOKIE, DEMO_SESSION_COOKIE, DEMO_VISITOR_COOKIE } from "@/lib/server/demo-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  for (const name of [DEMO_SESSION_COOKIE, DEMO_VISITOR_COOKIE, DEMO_ACCESS_COOKIE]) response.cookies.set(name, "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
