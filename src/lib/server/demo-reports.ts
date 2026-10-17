import type { DecisionReport } from "@/types/analysis";
import { DecisionReportSchema } from "@/lib/validation/analysis";
import type { DemoSession } from "@/lib/server/demo-auth";

type StoredReport = { id: string; userId: string; visitorId: string; report: DecisionReport; createdAt: string };
type DemoReportStore = Map<string, StoredReport>;

const globalStore = globalThis as typeof globalThis & { __buylensDemoReports?: DemoReportStore };
const memoryReports = globalStore.__buylensDemoReports ?? new Map<string, StoredReport>();
globalStore.__buylensDemoReports = memoryReports;

function config() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_REPORTS_TABLE || "buylens_demo_reports";
  if (!url || !key || !/^[a-zA-Z0-9_]+$/.test(table)) return null;
  return { url: url.replace(/\/$/, ""), key, table };
}

function headers(key: string, extra?: Record<string, string>) {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...extra };
}

function memoryKey(userId: string, visitorId: string, reportId: string) {
  return `${userId}:${visitorId}:${reportId}`;
}

function parseReport(value: unknown): DecisionReport | null {
  const parsed = DecisionReportSchema.safeParse(value);
  return parsed.success ? (parsed.data as DecisionReport) : null;
}

export async function saveDemoReport(report: DecisionReport, session: DemoSession) {
  const createdAt = report.createdAt || new Date().toISOString();
  memoryReports.set(memoryKey(session.userId, session.visitorId, report.id), {
    id: report.id,
    userId: session.userId,
    visitorId: session.visitorId,
    report: { ...report, createdAt },
    createdAt,
  });

  const supabase = config();
  if (!supabase) return;
  try {
    await fetch(`${supabase.url}/rest/v1/${supabase.table}`, {
      method: "POST",
      headers: headers(supabase.key, { Prefer: "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify({ id: report.id, user_id: session.userId, visitor_id: session.visitorId, report: { ...report, createdAt }, created_at: createdAt }),
      cache: "no-store",
    });
  } catch (error) {
    console.warn("Demo report persistence unavailable; using the server fallback.", error);
  }
}

export async function getDemoReports(session: DemoSession): Promise<DecisionReport[]> {
  const supabase = config();
  if (supabase) {
    try {
      const query = new URLSearchParams({
        select: "id,report,created_at",
        user_id: `eq.${session.userId}`,
        visitor_id: `eq.${session.visitorId}`,
        order: "created_at.desc",
        limit: "100",
      });
      const response = await fetch(`${supabase.url}/rest/v1/${supabase.table}?${query.toString()}`, { headers: headers(supabase.key), cache: "no-store" });
      if (response.ok) {
        const rows = (await response.json()) as Array<{ report?: unknown }>;
        const reports = rows.map((row) => parseReport(row.report)).filter((report): report is DecisionReport => Boolean(report));
        if (reports.length > 0) return reports;
      }
    } catch (error) {
      console.warn("Demo report query unavailable; using the server fallback.", error);
    }
  }

  return [...memoryReports.values()]
    .filter((row) => row.userId === session.userId && row.visitorId === session.visitorId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .map((row) => row.report);
}

export async function getDemoReport(id: string, session: DemoSession): Promise<DecisionReport | null> {
  const supabase = config();
  if (supabase) {
    try {
      const query = new URLSearchParams({
        select: "report",
        id: `eq.${id}`,
        user_id: `eq.${session.userId}`,
        visitor_id: `eq.${session.visitorId}`,
        limit: "1",
      });
      const response = await fetch(`${supabase.url}/rest/v1/${supabase.table}?${query.toString()}`, { headers: headers(supabase.key), cache: "no-store" });
      if (response.ok) {
        const rows = (await response.json()) as Array<{ report?: unknown }>;
        const report = parseReport(rows[0]?.report);
        if (report) return report;
      }
    } catch (error) {
      console.warn("Demo report lookup unavailable; using the server fallback.", error);
    }
  }

  return memoryReports.get(memoryKey(session.userId, session.visitorId, id))?.report ?? null;
}

export async function deleteDemoReport(id: string, session: DemoSession) {
  memoryReports.delete(memoryKey(session.userId, session.visitorId, id));
  const supabase = config();
  if (!supabase) return;
  try {
    const query = new URLSearchParams({ id: `eq.${id}`, user_id: `eq.${session.userId}`, visitor_id: `eq.${session.visitorId}` });
    await fetch(`${supabase.url}/rest/v1/${supabase.table}?${query.toString()}`, { method: "DELETE", headers: headers(supabase.key), cache: "no-store" });
  } catch (error) {
    console.warn("Demo report delete unavailable; using the server fallback.", error);
  }
}

export async function cleanupDemoReports() {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  for (const [key, row] of memoryReports) if (Date.parse(row.createdAt) < cutoff) memoryReports.delete(key);

  const supabase = config();
  if (!supabase) return;
  const query = new URLSearchParams({ created_at: `lt.${new Date(cutoff).toISOString()}` });
  try {
    await fetch(`${supabase.url}/rest/v1/${supabase.table}?${query.toString()}`, { method: "DELETE", headers: headers(supabase.key), cache: "no-store" });
  } catch (error) {
    console.warn("Demo report cleanup unavailable.", error);
  }
}
