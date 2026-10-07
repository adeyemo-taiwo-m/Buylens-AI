"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getStoredReportById } from "@/lib/storage/reports";
import { DecisionReport } from "@/types/analysis";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ArrowLeft, Copy, Check, Info, MessageSquare } from "lucide-react";

export default function QuestionsForSellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { toast } = useToast();
  const [report, setReport] = useState<DecisionReport>(DEMO_SOLAR_REPORT);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const found = getStoredReportById(id);
    if (found) setReport(found);
  }, [id]);

  const handleCopyQuestion = (qid: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(qid);
    toast("Question copied to clipboard", "success");
    setTimeout(() => setCopiedId(null), 1200);
  };

  const handleCopyAll = () => {
    const formatted = report.sellerQuestions
      .map((q, i) => `${i + 1}. ${q.question}`)
      .join("\n\n");
    const fullMessage = `Hello, concerning the quotation for ${report.productName}:\n\n${formatted}\n\nKindly clarify these details so we can proceed. Thanks!`;
    navigator.clipboard.writeText(fullMessage);
    setCopiedId("all");
    toast("All questions copied formatted for WhatsApp", "success");
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link
          href={`/app/report/${report.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#101828] mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Decision Report</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
              Ask before you pay
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              Critical questions generated from identified specification gaps and seller omissions.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={handleCopyAll}
            className="shrink-0"
          >
            {copiedId === "all" ? (
              <>
                <Check className="h-4 w-4 text-[#16A34A]" />
                <span>All Copied ✓</span>
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 text-[#0B1220]" />
                <span>Copy All for WhatsApp</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {report.sellerQuestions.map((q, idx) => (
          <Card key={q.id} variant="default" padding="md" className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-[8px] bg-[#0B1220] text-[#B8F34A] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[#101828]">
                    {q.question}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#667085] mt-1.5">
                    <Info className="h-3.5 w-3.5 text-[#98A2B3] shrink-0" />
                    <span>Why ask: {q.reason}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyQuestion(q.id, q.question)}
                className="shrink-0 h-8 px-3 text-xs"
              >
                {copiedId === q.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                    <span className="text-[#15803D]">Copied ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#667085]" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
