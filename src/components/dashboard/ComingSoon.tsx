import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "./DashboardShell";

export function ComingSoon({ title }: { title: string }) {
  return <DashboardShell><div className="flex min-h-[520px] items-center justify-center"><div className="rounded-[24px] bg-white px-8 py-12 text-center"><h1 className="text-3xl font-semibold text-[#0F1B33]">{title}</h1><p className="mt-3 text-[#5F6B7A]">This BuyLens workspace is coming soon.</p><Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E3ECFC] px-5 py-3 text-sm font-medium text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"><ArrowLeft className="h-4 w-4" />Back to dashboard</Link></div></div></DashboardShell>;
}
