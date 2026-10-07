"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { DecisionReport } from "@/types/analysis";
import { getStoredReports, deleteStoredReport } from "@/lib/storage/reports";
import {
  Search,
  Trash2,
  PlusCircle,
  FileText,
  Filter,
} from "lucide-react";

export default function HistoryPage() {
  const [reports, setReports] = useState<DecisionReport[]>(() => getStoredReports());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this report?")) {
      deleteStoredReport(id);
      setReports(getStoredReports());
    }
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.verdictSummary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "STRONG_BUY":
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">Strong Buy</span>;
      case "BUY_WITH_CAUTION":
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">Buy With Caution</span>;
      case "REQUEST_MORE_INFO":
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800">Request More Info</span>;
      case "OVERPRICED":
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-800">Overpriced</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800">High Risk</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FA] text-[#111318]">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
              Analysis History & Reports
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Access and compare your previous purchase evaluations and seller checklists.
            </p>
          </div>

          <Link
            href="/analyze"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-sm shrink-0"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Analysis</span>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl border border-zinc-200 p-3 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports by product name..."
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm border border-zinc-200 rounded-lg px-3 py-1.5 bg-white text-zinc-800 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="solar_power">Solar & Power</option>
              <option value="generators">Generators</option>
              <option value="computing">Laptops & PC</option>
              <option value="smartphones">Smartphones</option>
              <option value="appliances">Appliances</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Reports Listing */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center">
            <FileText className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-900">No reports found</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-4">
              You haven&apos;t analyzed any products matching this search yet.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white hover:bg-zinc-800"
            >
              Start First Analysis
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Link
                key={report.id}
                href={`/report/${report.id}`}
                className="block bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-400 transition-all shadow-sm group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                        {report.category.replace("_", " ")}
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="text-xs text-zinc-400">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-zinc-950 group-hover:text-zinc-800 transition-colors">
                      {report.productName}
                    </h3>

                    <p className="text-xs text-zinc-500 line-clamp-2 max-w-2xl">
                      {report.verdictSummary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100">
                    <div className="text-right">
                      <div className="text-base font-bold text-zinc-900">
                        ₦{report.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-zinc-400">Score: {report.score}/100</div>
                    </div>

                    <div>{getVerdictBadge(report.verdict)}</div>

                    <button
                      onClick={(e) => handleDelete(report.id, e)}
                      className="p-2 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete report"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-500">
        BuyLens AI — Independent Purchase Decision Intelligence
      </footer>
    </div>
  );
}
