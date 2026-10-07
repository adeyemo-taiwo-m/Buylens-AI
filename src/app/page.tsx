"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
            Turn informal WhatsApp quotations, social media vendor listings, and complex technical specs into an objective decision report. Uncover fair market prices, unstated risks, and critical questions to ask the merchant.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/analyze">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <span>Analyze a Purchase</span>
                <ArrowRight className="h-4 w-4 text-[#B8F34A]" />
              </Button>
            </Link>

            <Link href="/report/demo">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <FileText className="h-4 w-4 text-[#667085]" />
                <span>View Sample Solar Report</span>
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

        {/* Featured Live Sample Teaser: Signature Decision Card */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
              Live Sample Analysis Preview
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[18px] bg-[#0B1220] text-white p-6 sm:p-8 border border-[rgba(255,255,255,0.08)] shadow-[0_20px_40px_-16px_rgba(11,18,32,0.35)]">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8F34A]/50 to-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[rgba(255,255,255,0.10)]">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] mb-1 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Solar & Power System Evaluation</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Felicity Solar 5kVA Inverter + 10kWh LiFePO4 Battery Pack
                </h3>
                <p className="text-sm text-[#A8B3C7] mt-1">
                  Quoted Price: ₦4,850,000 via WhatsApp
                </p>
              </div>

              <div className="flex items-center gap-4 bg-[rgba(255,255,255,0.06)] px-4 py-2.5 rounded-[12px] border border-[rgba(255,255,255,0.10)] shrink-0">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">84</div>
                  <div className="text-[10px] text-[#A8B3C7] uppercase font-semibold">BUY SCORE</div>
                </div>
                <div className="h-8 w-px bg-[rgba(255,255,255,0.15)]" />
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8F34A]">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Worth Considering</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#E4E9F2] pt-6 leading-relaxed">
              &ldquo;Competitive pricing at 6% below Alaba market averages with authentic Grade-A cells. Proceed once written confirmation is secured regarding certified installer sign-off and local warranty servicing.&rdquo;
            </p>

            <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <span className="text-xs text-[#A8B3C7]">
                Full 4-tier risk & specification breakdown available
              </span>
              <Link
                href="/report/demo"
                className="text-xs font-semibold text-[#B8F34A] hover:underline inline-flex items-center gap-1"
              >
                <span>Inspect full report</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works: 3 Steps */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[#E4E7EC]">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
              How BuyLens AI Works
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
              <h3 className="text-base font-bold text-[#101828]">Provide Quotation Details</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Paste the vendor&apos;s WhatsApp quotation, Jiji listing, or spec sheet. Enter the quoted price and platform.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3">
              <div className="text-xs font-bold text-[#0B1220] bg-[#F2F4F0] w-7 h-7 rounded-[8px] flex items-center justify-center">
                02
              </div>
              <h3 className="text-base font-bold text-[#101828]">AI Market & Risk Audit</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                We benchmark against real market data in Lagos and Abuja, scanning for missing accessories, parallel imports, and durability risks.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3">
              <div className="text-xs font-bold text-[#0B1220] bg-[#F2F4F0] w-7 h-7 rounded-[8px] flex items-center justify-center">
                03
              </div>
              <h3 className="text-base font-bold text-[#101828]">Receive Decision Report</h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Get an instant Buy Score, clear verdict, and a copyable WhatsApp checklist of questions to send the seller before paying.
              </p>
            </Card>
          </div>
        </section>

        {/* The Decision Framework */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[#E4E7EC]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
              The Decision Framework
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

        {/* Final CTA Band */}
        <section className="bg-[#0B1220] text-white py-16 px-6 text-center border-t border-[rgba(255,255,255,0.08)]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ready to verify your next major purchase?
            </h2>
            <p className="text-sm text-[#A8B3C7] leading-relaxed">
              Don&apos;t risk millions of Naira on unverified seller claims. Run a free instant intelligence report now.
            </p>
            <div className="pt-2">
              <Link href="/analyze">
                <Button variant="accent" size="lg">
                  <span>Start Free Analysis</span>
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
            <Link href="/analyze" className="hover:text-[#101828] transition-colors">
              Analyze
            </Link>
            <Link href="/history" className="hover:text-[#101828] transition-colors">
              History
            </Link>
            <Link href="/compare" className="hover:text-[#101828] transition-colors">
              Compare
            </Link>
            <Link href="/report/demo" className="hover:text-[#101828] transition-colors">
              Sample Report
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
