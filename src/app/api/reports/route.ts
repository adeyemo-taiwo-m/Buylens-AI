import { NextResponse } from "next/server";
import { getDemoSession } from "@/lib/server/demo-auth";
import { deleteDemoReport, getDemoReports } from "@/lib/server/demo-reports";

export async function GET() {
  const session = await getDemoSession();
  if (!session) return NextResponse.json({ error: "Sign in to view your reports." }, { status: 401 });
  return NextResponse.json({ reports: await getDemoReports(session) });
}

export async function DELETE(request: Request) {
  const session = await getDemoSession();
  if (!session) return NextResponse.json({ error: "Sign in to manage your reports." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Report not found." }, { status: 404 });
  await deleteDemoReport(id, session);
  return NextResponse.json({ ok: true });
}
