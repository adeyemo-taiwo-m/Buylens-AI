"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Info, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { getStoredReportById } from "@/lib/storage/reports";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import type { DecisionReport } from "@/types/analysis";

export default function QuestionsForSellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { toast } = useToast();
  const [report] = useState<DecisionReport>(() => getStoredReportById(id) || DEMO_SOLAR_REPORT);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyQuestion = (questionId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(questionId);
    toast("Question copied to clipboard", "success");
    setTimeout(() => setCopiedId(null), 1200);
  };

  const handleCopyAll = () => {
    const questions = report.sellerQuestions.map((question, index) => `${index + 1}. ${question.question}`).join("\n\n");
    navigator.clipboard.writeText(`Hello, concerning the quotation for ${report.productName}:\n\n${questions}\n\nKindly clarify these details so we can proceed. Thanks!`);
    setCopiedId("all");
    toast("All questions copied formatted for WhatsApp", "success");
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#111318]">
      <Header />
      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <Link href={`/report/${report.id}`} className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#101828]">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Decision Report</span>
            </Link>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-[#101828] sm:text-3xl">Ask before you pay</h1>
                <p className="mt-1 text-xs text-[#667085] sm:text-sm">Critical questions generated from identified specification gaps and seller omissions.</p>
              </div>
              <Button variant="secondary" size="md" onClick={handleCopyAll} className="shrink-0">
                {copiedId === "all" ? <><Check className="h-4 w-4 text-[#16A34A]" /><span>All Copied ✓</span></> : <><MessageSquare className="h-4 w-4 text-[#0B1220]" /><span>Copy All for WhatsApp</span></>}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {report.sellerQuestions.map((question, index) => (
              <Card key={question.id} variant="default" padding="md" className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#0B1220] text-xs font-bold text-[#B8F34A]">0{index + 1}</span>
                    <div>
                      <h2 className="text-sm font-semibold text-[#101828] sm:text-base">{question.question}</h2>
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#667085]"><Info className="h-3.5 w-3.5 shrink-0 text-[#98A2B3]" /><span>Why ask: {question.reason}</span></div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyQuestion(question.id, question.question)} className="h-8 shrink-0 px-3 text-xs">
                    {copiedId === question.id ? <><Check className="h-3.5 w-3.5 text-[#16A34A]" /><span className="text-[#15803D]">Copied ✓</span></> : <><Copy className="h-3.5 w-3.5 text-[#667085]" /><span>Copy</span></>}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500">BuyLens AI — Independent Purchase Decision Support</footer>
    </div>
  );
}
