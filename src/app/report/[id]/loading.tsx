import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function LoadingReportPage() {
  return (
    <DashboardShell>
      <div className="mx-auto w-full max-w-[1060px] space-y-6 pb-8" aria-label="Loading purchase report" role="status">
        <div className="h-9 w-36 animate-pulse rounded-full bg-primary-100" />
        <div className="flex items-center gap-6">
          <div className="h-[132px] w-[132px] animate-pulse rounded-[20px] bg-primary-100" />
          <div className="space-y-3">
            <div className="h-10 w-[min(70vw,720px)] animate-pulse rounded-lg bg-primary-100" />
            <div className="h-5 w-64 animate-pulse rounded-lg bg-primary-100" />
          </div>
        </div>
        <div className="h-[520px] animate-pulse rounded-[16px] bg-surface" />
      </div>
    </DashboardShell>
  );
}
