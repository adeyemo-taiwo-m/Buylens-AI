"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InteractiveExampleReport } from "@/components/home/InteractiveExampleReport";
import {
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  CheckCircle2,
  FileText,
  ThumbsUp,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8F5] text-[#101828]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E4E7EC] bg-white text-xs font-semibold text-[#101828] mb-8 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
            <span>Independent Purchase Intelligence for High-Value Buys</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#101828] mb-6 leading-tight">
            Know what you&apos;re buying <br className="hidden sm:inline" />
            <span className="text-[#667085]">before you pay.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#667085] mb-10 leading-relaxed font-normal">
            BuyLens AI analyzes product information, highlights risks, and helps you make a more informed purchase decision before spending significant money.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/app/analyze">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <span>Analyze a purchase</span>
                <ArrowRight className="h-4 w-4 text-[#B8F34A]" />
              </Button>
            </Link>

            <Link href="#how-it-works">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <span>See how it works</span>
              </Button>
            </Link>

            <Link href="/app/report/demo">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                <FileText className="h-4 w-4 text-[#667085]" />
                <span>Try a sample analysis</span>
              </Button>
            </Link>
          </div>

          {/* Micro Trust Strip */}
          <div className="mt-12 pt-8 border-t border-[#E4E7EC] flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-[#667085]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              100% Independent & Unbiased
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              Tailored for Nigerian Market Realities
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              No Seller Kickbacks or Affiliates
            </span>
          </div>
        </section>

        {/* Interactive Example Report Section per PRD Section 20 & INTERACTIONS.md Section 1.4 */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="text-center mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#667085]">
              Explore an Interactive Decision Report
            </h2>
          </div>
          <InteractiveExampleReport />
        </section>

        {/* How It Works: 3 Steps per PRD Section 19 */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-16 border-t border-[#E4E7EC]">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
              How it works
            </h2>
            <p className="mt-2 text-sm text-[#667085]">
              Three simple steps to protect your capital before making any significant payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="lg" className="space-y-3">
              <div className="text-xs font-bold text-[#0B1220] bg-[#F2F4F0] w-7 h-7 rounded-[8px] flex items-center justify-center">
                01
              </div>
              <h3 className="text-base font-bold text-[#101828]">Give us the listing</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Paste information or upload an image from WhatsApp, Jiji, or an in-store quotation.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3">
              <div className="text-xs font-bold text-[#0B1220] bg-[#F2F4F0] w-7 h-7 rounded-[8px] flex items-center justify-center">
                02
              </div>
              <h3 className="text-base font-bold text-[#101828]">BuyLens analyzes it</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                AI evaluates price, value, risks, and missing information against real market data.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3">
              <div className="text-xs font-bold text-[#0B1220] bg-[#F2F4F0] w-7 h-7 rounded-[8px] flex items-center justify-center">
                03
              </div>
              <h3 className="text-base font-bold text-[#101828]">Make a smarter decision</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Understand what to verify before paying, with ready questions to ask the merchant.
              </p>
            </Card>
          </div>
        </section>

        {/* The Decision Framework */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[#E4E7EC]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
              The decision framework
            </h2>
            <p className="mt-2 text-sm text-[#667085]">
              Every analysis directly answers the core question: &ldquo;Should I buy this?&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="lg" className="space-y-3">
              <div className="h-10 w-10 rounded-[10px] bg-[#F2F4F0] flex items-center justify-center text-[#101828]">
                <TrendingDown className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#101828]">Fair Price Corridor</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Identify if a quotation is overpriced, fair, or suspiciously cheap compared to current retail averages.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3">
              <div className="h-10 w-10 rounded-[10px] bg-[#F2F4F0] flex items-center justify-center text-[#101828]">
                <ShieldAlert className="h-5 w-5 text-[#DC2626]" />
              </div>
              <h3 className="text-base font-bold text-[#101828]">Hidden Risk Detection</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Spot parallel imports, grey-market warranties, and costly unquoted installation accessories.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3">
              <div className="h-10 w-10 rounded-[10px] bg-[#F2F4F0] flex items-center justify-center text-[#101828]">
                <HelpCircle className="h-5 w-5 text-[#0B1220]" />
              </div>
              <h3 className="text-base font-bold text-[#101828]">Seller Interrogation Checklist</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Get exact, prioritized questions to send directly to the seller to ensure you don&apos;t get shortchanged.
              </p>
            </Card>
          </div>
        </section>

        {/* Final CTA Band per PRD Section 21 */}
        <section className="bg-[#0B1220] text-white py-16 px-6 text-center border-t border-[rgba(255,255,255,0.08)]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Don&apos;t just buy. Understand first.
            </h2>
            <p className="text-sm text-[#A8B3C7] leading-relaxed">
              Don&apos;t risk your capital on unverified claims. Run a free instant decision report now.
            </p>
            <div className="pt-2">
              <Link href="/app/analyze">
                <Button variant="accent" size="lg">
                  <span>Analyze a purchase</span>
                  <ArrowRight className="h-4 w-4 text-[#0B1220]" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E4E7EC] bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085]">
          <p>© {new Date().getFullYear()} BuyLens AI. Know what you&apos;re buying before you pay.</p>
          <div className="flex items-center gap-6">
            <Link href="/app" className="hover:text-[#101828] transition-colors">
              App Home
            </Link>
            <Link href="/app/analyze" className="hover:text-[#101828] transition-colors">
              Analyze
            </Link>
            <Link href="/app/history" className="hover:text-[#101828] transition-colors">
              History
            </Link>
            <Link href="/compare" className="hover:text-[#101828] transition-colors">
              Compare
            </Link>
            <Link href="/app/report/demo" className="hover:text-[#101828] transition-colors">
              Sample Report
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
