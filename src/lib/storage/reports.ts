import { DecisionReport } from "@/types/analysis";
import { DEMO_SOLAR_REPORT } from "@/data/demo";

const STORAGE_KEY = "buylens_reports";

export function getStoredReports(): DecisionReport[] {
  if (typeof window === "undefined") {
    return [DEMO_SOLAR_REPORT];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with demo report on initial run
      localStorage.setItem(STORAGE_KEY, JSON.stringify([DEMO_SOLAR_REPORT]));
      return [DEMO_SOLAR_REPORT];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [DEMO_SOLAR_REPORT];
  } catch (err) {
    console.error("Failed to load reports from localStorage", err);
    return [DEMO_SOLAR_REPORT];
  }
}

export function getStoredReportById(id: string): DecisionReport | undefined {
  const reports = getStoredReports();
  return reports.find((r) => r.id === id);
}

export function saveStoredReport(report: DecisionReport): void {
  if (typeof window === "undefined") return;

  try {
    const reports = getStoredReports();
    const existingIndex = reports.findIndex((r) => r.id === report.id);
    let updated: DecisionReport[];

    if (existingIndex >= 0) {
      updated = [...reports];
      updated[existingIndex] = report;
    } else {
      updated = [report, ...reports];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save report to localStorage", err);
  }
}

export function deleteStoredReport(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const reports = getStoredReports();
    const filtered = reports.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("Failed to delete report from localStorage", err);
  }
}
