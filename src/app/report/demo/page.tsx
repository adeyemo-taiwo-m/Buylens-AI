import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ReportView } from "@/components/report/ReportView";
import { toPurchaseReport } from "@/components/report/purchaseReport.data";
import { DEMO_SOLAR_REPORT } from "@/data/demo";

export const metadata = {
  title: "Sample Purchase Report — BuyLens AI",
  description: "Live interactive sample purchase intelligence report for a 5kVA Solar & Lithium Battery setup.",
};

export default function DemoReportPage() {
  return (
    <DashboardShell>
      <ReportView report={toPurchaseReport(DEMO_SOLAR_REPORT)} />
    </DashboardShell>
  );
}
