import { DecisionReport } from "@/types/analysis";
import { DEMO_SOLAR_REPORT, INITIAL_DEMO_REPORTS } from "@/data/demo";

const STORAGE_KEY = "buylens_reports";

export function getStoredReports(): DecisionReport[] {
  if (typeof window === "undefined") {
    return INITIAL_DEMO_REPORTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REPORTS));
      return INITIAL_DEMO_REPORTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error("Failed to load reports from localStorage", err);
    return [];
  }
}

export function mergeReports(...reportLists: DecisionReport[][]): DecisionReport[] {
  const unique = new Map<string, DecisionReport>();

  for (const report of reportLists.flat()) {
    const key = report.sampleId ? `sample:${report.sampleId}` : `report:${report.id}`;
    const existing = unique.get(key);
    if (!existing || Date.parse(report.createdAt) >= Date.parse(existing.createdAt)) {
      unique.set(key, report);
    }
  }

  return [...unique.values()].sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
}

export function getStoredReportById(id: string): DecisionReport | undefined {
  const reports = getStoredReports();
  const match = reports.find((r) => r.id === id);
  if (match) return match;
  // The public sample report is the only safe fallback. Never return an
  // arbitrary first report for an unknown id.
  if (id === "demo" || id === "demo-solar") return DEMO_SOLAR_REPORT;
  return undefined;
}

export function saveStoredReport(report: DecisionReport): void {
  if (typeof window === "undefined") return;

  try {
    const reports = getStoredReports();
    const existingIndex = reports.findIndex((r) => r.id === report.id || (report.sampleId && r.sampleId === report.sampleId));
    const nextReport = {
      ...report,
      createdAt: new Date().toISOString(),
    };
    const updated = [nextReport, ...reports.filter((_, index) => index !== existingIndex)];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save report to localStorage", err);
  }
}

export function deleteStoredReport(id: string, sampleId?: string): void {
  if (typeof window === "undefined") return;

  try {
    const reports = getStoredReports();
    const filtered = reports.filter((r) => r.id !== id && (!sampleId || r.sampleId !== sampleId));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("Failed to delete report from localStorage", err);
  }
}
