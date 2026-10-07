"use client";

import { useState } from "react";
import Link from "next/link";
import { getStoredReports, deleteStoredReport } from "@/lib/storage/reports";
import { DecisionReport } from "@/types/analysis";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  Search,
  Trash2,
  Plus,
  FileText,
  ChevronRight,
} from "lucide-react";

type FilterType = "ALL" | "BUY" | "WORTH_CONSIDERING" | "WAIT" | "AVOID";

export default function AppHistoryPage() {
  const { toast } = useToast();
  const [reports, setReports] = useState<DecisionReport[]>(() => getStoredReports());
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [search, setSearch] = useState("");

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Remove this analysis report from your history?")) {
      deleteStoredReport(id);
      setReports(getStoredReports());
      toast("Report removed from history", "info");
    }
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.verdictSummary.toLowerCase().includes(search.toLowerCase());

    let matchesFilter = true;
    if (activeFilter === "BUY") {
      matchesFilter = r.verdict === "STRONG_BUY";
    } else if (activeFilter === "WORTH_CONSIDERING") {
      matchesFilter = r.verdict === "BUY_WITH_CAUTION";
    } else if (activeFilter === "WAIT") {
      matchesFilter = r.verdict === "OVERPRICED" || r.verdict === "REQUEST_MORE_INFO";
    } else if (activeFilter === "AVOID") {
      matchesFilter = r.verdict === "HIGH_RISK" || r.verdict === "DO_NOT_BUY";
    }

    return matchesSearch && matchesFilter;
  });

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "STRONG_BUY":
        return <Badge variant="success" dot>Buy</Badge>;
      case "BUY_WITH_CAUTION":
        return <Badge variant="consider" dot>Worth Considering</Badge>;
      case "REQUEST_MORE_INFO":
        return <Badge variant="neutral" dot>Investigate</Badge>;
      case "OVERPRICED":
        return <Badge variant="warning" dot>Wait</Badge>;
      default:
        return <Badge variant="danger" dot>Avoid</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & New Analysis Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EC] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
            Your analyses
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Access previous decision reports, compare alternatives, and manage your audit history.
          </p>
        </div>

        <Link href="/app/analyze">
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4 text-[#B8F34A]" />
            <span>New Analysis</span>
          </Button>
        </Link>
      </div>

      {/* Filter Tabs and Search Bar per Section 42 */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: "ALL", label: "All" },
              { id: "BUY", label: "Buy" },
              { id: "WORTH_CONSIDERING", label: "Worth considering" },
              { id: "WAIT", label: "Wait" },
              { id: "AVOID", label: "Avoid" },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                activeFilter === f.id
                  ? "bg-[#0B1220] text-white"
                  : "bg-white text-[#667085] hover:bg-[#F2F4F0] border border-[#E4E7EC]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative flex-1 sm:max-w-xs ml-auto">
          <Search className="h-4 w-4 text-[#98A2B3] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search analyses..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-[10px] border border-[#E4E7EC] bg-white text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#0B1220]"
          />
        </div>
      </div>

      {/* Analyses List */}
      {filteredReports.length === 0 ? (
        <Card
          variant="default"
          padding="lg"
          className="border-dashed border-1.5 border-[#D0D5DD] bg-transparent text-center py-16"
        >
          <div className="w-12 h-12 rounded-full bg-[#F2F4F0] flex items-center justify-center text-[#667085] mx-auto mb-3">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-[#101828]">No matching analyses found</h3>
          <p className="text-xs text-[#667085] mt-1 mb-5">
            Try adjusting your search query or verdict filter.
          </p>
          <Button variant="secondary" size="sm" onClick={() => { setSearch(""); setActiveFilter("ALL"); }}>
            Reset Filters
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((r) => (
            <Link key={r.id} href={`/app/report/${r.id}`}>
              <Card
                variant="interactive"
                padding="md"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                      {r.category.replace("_", " ")}
                    </span>
                    <span className="text-[#E4E7EC]">•</span>
                    <span className="text-xs text-[#667085]">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#101828]">{r.productName}</h3>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-sm font-extrabold text-[#101828]">
                      ₦{r.price.toLocaleString()}
                    </span>
                    {getVerdictBadge(r.verdict)}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E4E7EC]">
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#0B1220]">{r.score}</div>
                    <div className="text-[10px] font-semibold text-[#667085]">BUY SCORE</div>
                  </div>

                  <button
                    onClick={(e) => handleDelete(r.id, e)}
                    className="p-2 text-[#98A2B3] hover:text-[#DC2626] rounded-[8px] hover:bg-[#FEF3F2] transition-colors"
                    title="Delete report"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <ChevronRight className="h-5 w-5 text-[#98A2B3] hidden sm:block" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
