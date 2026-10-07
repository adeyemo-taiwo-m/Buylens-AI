"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { saveStoredReport } from "@/lib/storage/reports";
import { ProductCategory } from "@/types/analysis";
import {
  ArrowRight,
  Sparkles,
  AlertCircle,
  UploadCloud,
  FileText,
  Info,
} from "lucide-react";

export default function AnalyzePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("solar_power");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("whatsapp");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide the product or quotation title.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category,
          price: price ? parseFloat(price) : undefined,
          sellerPlatform: platform,
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please check inputs and try again.");
      }

      const report = await response.json();
      saveStoredReport(report);
      router.push(`/report/${report.id}`);
    } catch (err: unknown) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to run analysis. Please try again."
      );
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setName("Felicity Solar 5kVA 48V Inverter + 10kWh LiFePO4 Battery");
    setCategory("solar_power");
    setPrice("4850000");
    setPlatform("whatsapp");
    setDescription(
      "Seller quoted ₦4.85M via WhatsApp including 48V 200Ah battery, pure sine wave inverter, and cables. Claims 5-year warranty."
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FA] text-[#111318]">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">
              New Purchase Analysis
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-zinc-900 hover:text-zinc-700 font-semibold underline"
            >
              Fill sample solar quotation
            </button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
            Analyze a Proposed Purchase
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Provide the details or quotation from your seller. BuyLens will evaluate market pricing,
            risks, and missing specs before you pay.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
              Product / System Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Felicity Solar 5kVA 48V + 10kWh Lithium Battery"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:border-zinc-900"
              >
                <option value="solar_power">Solar & Power Systems</option>
                <option value="generators">Generators & Fuel Systems</option>
                <option value="computing">Laptops & Workstations</option>
                <option value="smartphones">Smartphones & Tablets</option>
                <option value="appliances">Home & Office Appliances</option>
                <option value="other">Other High-Value Item</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Quoted Price (₦ NGN)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 4850000"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Seller Platform / Channel
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:border-zinc-900"
              >
                <option value="whatsapp">WhatsApp Quotation</option>
                <option value="jiji">Jiji Listing</option>
                <option value="instagram">Instagram Vendor</option>
                <option value="physical_store">Alaba / Computer Village / Physical Store</option>
                <option value="other">Other Direct Seller</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Quotation Attachment
              </label>
              <div className="border border-dashed border-zinc-300 rounded-xl px-4 py-2 text-center text-xs text-zinc-500 hover:border-zinc-400 cursor-pointer flex items-center justify-center gap-2">
                <UploadCloud className="h-4 w-4 text-zinc-400" />
                <span>Upload quotation / screenshot</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
              Quotation Description / Specifications
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the seller's text, warranty promise, included cables, model numbers, or installation commitments..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 text-sm"
            />
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs text-zinc-600 flex items-start gap-2">
            <Info className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
            <span>
              BuyLens AI does not share your quotation with sellers or third-party stores. Your analysis is evaluated against independent market benchmarks.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Analyzing Pricing, Risks & Questions...</span>
              </>
            ) : (
              <>
                <span>Run Decision Intelligence Report</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-500">
        BuyLens AI — Independent Purchase Decision Intelligence
      </footer>
    </div>
  );
}
