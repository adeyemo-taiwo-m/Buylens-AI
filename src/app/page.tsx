"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import {
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  FileText,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FA] text-[#111318]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 pt-16 sm:pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-xs font-medium text-zinc-600 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span>AI Purchase Intelligence for High-Value Buys</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 mb-6 leading-tight">
            Know what you&apos;re buying <br className="hidden sm:inline" />
            <span className="text-zinc-600">before you pay.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-zinc-600 mb-10 leading-relaxed">
            Turn messy WhatsApp quotations, Jiji listings, and technical specs into an objective,
            structured decision report. Uncover hidden risks, fair market prices, and critical questions to ask the seller.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/analyze"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <span>Analyze a Purchase</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/report/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-xl bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50 transition-colors shadow-sm"
            >
              <FileText className="h-4 w-4 text-zinc-500" />
              <span>View Sample Solar Report</span>
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-12 pt-8 border-t border-zinc-200/80 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-zinc-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Objective & independent
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Built for Nigerian market conditions
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              No seller kickbacks or sponsored bias
            </span>
          </div>
        </section>

        {/* What BuyLens Solves */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
              The purchase decision framework
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Before paying millions of Naira for solar systems, generators, or tech, get answers to what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">Price & Value Benchmark</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Evaluates whether the quotation is fair, overpriced, or suspiciously low compared to real prevailing market averages in Lagos and Abuja.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">Hidden Risk Detection</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Identifies missing accessories, parallel import vulnerabilities, non-transferable warranties, and unrealistic vendor claims.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">Seller Interrogation Checklist</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Generates exact questions you should send to the merchant or installer on WhatsApp before making any commitment or deposit.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Sample Card Preview */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                  Example Case Study: Solar / Power
                </span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-700">
                Verified Model
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-zinc-950">
                    Felicity Solar 5kVA 48V Inverter + 10kWh LiFePO4 Battery Pack
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">Quoted price: ₦4,850,000</p>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                    Buy With Caution
                  </span>
                  <span className="text-xs text-zinc-500 mt-1">Decision Score: 84 / 100</span>
                </div>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                &ldquo;Strong technical configuration with Grade-A prismatic cells, priced 6% below prevailing Alaba market rates. Proceed only after obtaining written confirmation that installer certification and local warranty service are included.&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs text-zinc-500">
                  Full 12-point decision breakdown available
                </span>
                <Link
                  href="/report/demo"
                  className="text-xs font-semibold text-zinc-900 hover:text-zinc-700 inline-flex items-center gap-1"
                >
                  Inspect complete report <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} BuyLens AI. Know what you&apos;re buying before you pay.</p>
          <div className="flex items-center gap-6">
            <Link href="/analyze" className="hover:text-zinc-900 transition-colors">
              Analyze
            </Link>
            <Link href="/report/demo" className="hover:text-zinc-900 transition-colors">
              Sample Report
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
