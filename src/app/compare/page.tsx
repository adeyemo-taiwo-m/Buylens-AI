"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { DecisionReport } from "@/types/analysis";
import { getStoredReports } from "@/lib/storage/reports";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { ArrowLeft, CheckCircle2, ShieldAlert, TrendingDown } from "lucide-react";

export default function ComparePage() {
  const [reports, setReports] = useState<DecisionReport[]>([]);
  const [leftId, setLeftId] = useState<string>("");
  const [rightId, setRightId] = useState<string>("");

  useEffect(() => {
    const list = getStoredReports();
    setReports(list);
    if (list.length > 0) {
      setLeftId(list[0].id);
      if (list.length > 1) {
        setRightId(list[1].id);
      } else {
        setRightId(list[0].id);
      }
    }
  }, []);

  const leftReport = reports.find((r) => r.id === leftId) || DEMO_SOLAR_REPORT;
  const rightReport = reports.find((r) => r.id === rightId) || DEMO_SOLAR_REPORT;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FA] text-[#111318]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <Link
            href="/history"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
            Side-by-Side Purchase Comparison
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Compare two purchase quotations or models to determine which delivers superior value and lower risk.
          </p>
        </div>

        {/* Selection Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 rounded-xl border border-zinc-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
              Select Option A
            </label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full text-sm border border-zinc-200 rounded-lg p-2.5 bg-white text-zinc-900"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.productName} (₦{r.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl border border-zinc-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
              Select Option B
            </label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full text-sm border border-zinc-200 rounded-lg p-2.5 bg-white text-zinc-900"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.productName} (₦{r.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-side comparison table */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-zinc-200 border-b border-zinc-200 p-6 sm:p-8 bg-zinc-50">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Option A
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-950">{leftReport.productName}</h2>
              <div className="mt-2 text-2xl font-extrabold text-zinc-900">
                ₦{leftReport.price.toLocaleString()}
              </div>
            </div>

            <div className="pl-6">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Option B
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-950">{rightReport.productName}</h2>
              <div className="mt-2 text-2xl font-extrabold text-zinc-900">
                ₦{rightReport.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Decision Score & Verdict */}
          <div className="grid grid-cols-2 divide-x divide-zinc-200 border-b border-zinc-200 p-6 text-sm">
            <div>
              <span className="text-xs text-zinc-500 block mb-1">Decision Score & Verdict</span>
              <div className="text-2xl font-black text-zinc-900">{leftReport.score} / 100</div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 mt-1 inline-block">
                {leftReport.verdict.replace("_", " ")}
              </span>
            </div>

            <div className="pl-6">
              <span className="text-xs text-zinc-500 block mb-1">Decision Score & Verdict</span>
              <div className="text-2xl font-black text-zinc-900">{rightReport.score} / 100</div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 mt-1 inline-block">
                {rightReport.verdict.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Price & Market Assessment */}
          <div className="grid grid-cols-2 divide-x divide-zinc-200 border-b border-zinc-200 p-6 text-sm">
            <div>
              <span className="text-xs text-zinc-500 block mb-1">Fair Price Range</span>
              <div className="font-semibold text-zinc-800">
                ₦{leftReport.priceAssessment.fairPriceRange[0].toLocaleString()} – ₦
                {leftReport.priceAssessment.fairPriceRange[1].toLocaleString()}
              </div>
              <p className="text-xs text-zinc-500 mt-2">{leftReport.priceAssessment.commentary}</p>
            </div>

            <div className="pl-6">
              <span className="text-xs text-zinc-500 block mb-1">Fair Price Range</span>
              <div className="font-semibold text-zinc-800">
                ₦{rightReport.priceAssessment.fairPriceRange[0].toLocaleString()} – ₦
                {rightReport.priceAssessment.fairPriceRange[1].toLocaleString()}
              </div>
              <p className="text-xs text-zinc-500 mt-2">{rightReport.priceAssessment.commentary}</p>
            </div>
          </div>

          {/* Key Risks */}
          <div className="grid grid-cols-2 divide-x divide-zinc-200 border-b border-zinc-200 p-6 text-sm">
            <div>
              <span className="text-xs text-zinc-500 block mb-2 font-semibold">Identified Risks</span>
              <ul className="space-y-2 text-xs text-zinc-700">
                {leftReport.risks.map((r) => (
                  <li key={r.id} className="flex items-start gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>{r.title}:</strong> {r.explanation}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pl-6">
              <span className="text-xs text-zinc-500 block mb-2 font-semibold">Identified Risks</span>
              <ul className="space-y-2 text-xs text-zinc-700">
                {rightReport.risks.map((r) => (
                  <li key={r.id} className="flex items-start gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>{r.title}:</strong> {r.explanation}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Final Recommendation */}
          <div className="grid grid-cols-2 divide-x divide-zinc-200 p-6 text-sm bg-zinc-50">
            <div>
              <span className="text-xs text-zinc-500 uppercase font-semibold block mb-1">
                Recommendation A
              </span>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                {leftReport.finalRecommendation}
              </p>
            </div>

            <div className="pl-6">
              <span className="text-xs text-zinc-500 uppercase font-semibold block mb-1">
                Recommendation B
              </span>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                {rightReport.finalRecommendation}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-500">
        BuyLens AI — Independent Purchase Decision Support
      </footer>
    </div>
  );
}
