import type { Metadata } from "next";
import { Suspense } from "react";
import { AnalyzeExperience } from "@/components/analyze/AnalyzeExperience";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Analyze a purchase | BuyLens AI" };

function AnalyzeFormFallback() {
  return <div aria-hidden="true" className="analyze-form-card min-h-[788px] rounded-[24px] bg-white" />;
}

export default function AnalyzePage() {
  return (
    <DashboardShell>
      <div className="-mt-2 pb-0 max-[1023px]:mt-0">
        <Reveal trigger="load" delay={0}>
          <Suspense fallback={<AnalyzeFormFallback />}>
            <AnalyzeExperience />
          </Suspense>
        </Reveal>
      </div>
    </DashboardShell>
  );
}
