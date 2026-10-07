import { Header } from "@/components/layout/Header";
import { ReportView } from "@/components/report/ReportView";
import { DEMO_SOLAR_REPORT } from "@/data/demo";

export const metadata = {
  title: "Sample Purchase Report — BuyLens AI",
  description: "Live interactive sample purchase intelligence report for a 5kVA Solar & Lithium Battery setup.",
};

export default function DemoReportPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FA] text-[#111318]">
      <Header />
      <main className="flex-1">
        <ReportView report={DEMO_SOLAR_REPORT} />
      </main>
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-500">
        BuyLens AI — Independent Purchase Decision Intelligence
      </footer>
    </div>
  );
}
