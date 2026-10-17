import { NextResponse } from "next/server";
import { cleanupDemoReports } from "@/lib/server/demo-reports";

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  if (secret && authorization !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await cleanupDemoReports();
  return NextResponse.json({ ok: true, message: "Demo reports older than 7 days were removed." });
}
