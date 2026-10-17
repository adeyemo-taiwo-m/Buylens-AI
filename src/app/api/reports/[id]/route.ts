import { NextResponse } from "next/server";
import { getDemoSession } from "@/lib/server/demo-auth";
import { getDemoReport } from "@/lib/server/demo-reports";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getDemoSession();
  if (!session) return NextResponse.json({ error: "Sign in to view this report." }, { status: 401 });
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Report not found." }, { status: 404 });
  const report = await getDemoReport(id, session);
  return report ? NextResponse.json({ report }) : NextResponse.json({ error: "Report not found." }, { status: 404 });
}
