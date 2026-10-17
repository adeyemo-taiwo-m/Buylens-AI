import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default async function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  return <ComingSoon title="Analysis details" />;
}
