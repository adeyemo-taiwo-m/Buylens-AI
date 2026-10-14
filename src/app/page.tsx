"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InteractiveExampleReport } from "@/components/home/InteractiveExampleReport";
import { HeroMagnifier } from "@/components/home/HeroMagnifier";
import {
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  CheckCircle2,
  FileText,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#101828]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="buyhero relative px-5 pt-12 sm:pt-[90px] pb-10 text-center">
          <div className="buyhero-bg" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="inline-flex h-[43px] items-center gap-2 rounded-full border border-[var(--border-blue)] bg-white/90 px-2.5 mb-7 shadow-sm">
              <span className="inline-flex h-[26px] items-center gap-1 rounded-full bg-[#E3EEFF] px-2 text-[11px] font-medium text-[var(--blue-600)]"><span className="text-sm">⟳</span>New</span>
              <span className="pr-2 text-[12px] font-medium tracking-[0.02em] text-[var(--blue-600)]">AI-POWERED PURCHASE INTELLIGENCE</span>
            </div>
            <h1 className="animate-fade-up text-hero-title buyhero-title text-[var(--hero-text-heading)]">
              <span className="block font-medium">Know What You&apos;re Buying</span>
              <span className="block font-bold text-[var(--blue-600)]">Before You Pay.</span>
            </h1>
            <p className="animate-fade-up stagger-1 mx-auto mt-6 max-w-[830px] text-title-1 text-[var(--hero-text-body)]">
              Make smarter purchase decisions with AI that helps you evaluate products, uncover trade-offs, and understand whether something is truly worth your money.
            </p>
            <div className="animate-fade-up stagger-2 mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#how-it-works" className="inline-flex h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-[var(--blue-100)] px-6 text-title-4-medium text-[var(--blue-500)] transition hover:bg-[#cfe0fb] sm:w-[200px]">See how it works <span aria-hidden="true" className="text-lg">↓</span></Link>
              <Link href="/app/analyze" className="inline-flex h-[50px] w-full max-w-[240px] items-center justify-center gap-2 rounded-full bg-[var(--blue-500)] px-6 text-title-4-medium text-white shadow-[0_8px_22px_-8px_rgba(47,111,235,.55)] transition hover:bg-[#2563eb] sm:w-[220px]">Analyze a purchase <ArrowRight className="h-[18px] w-[18px]" /></Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-10 w-full px-5 pb-16">
          <HeroMagnifier />
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

        {/* The Decision Framework / Features */}
        <section id="features" className="max-w-5xl mx-auto px-6 py-16 border-t border-[#E4E7EC]">
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

        {/* FAQ Section */}
        <section id="faq" className="max-w-4xl mx-auto px-6 py-16 border-t border-[#E4E7EC]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-[#667085]">
              Everything you need to know about independent purchase intelligence with BuyLens AI.
            </p>
          </div>

          <div className="space-y-4">
            <Card variant="default" padding="md" className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#101828]">
                How does BuyLens evaluate fair market pricing?
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                BuyLens benchmarks your quotation against live and verified price corridors across major Nigerian trade hubs including Computer Village, Alaba International, and authorized distributors.
              </p>
            </Card>

            <Card variant="default" padding="md" className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#101828]">
                Does BuyLens earn commission from merchants?
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                No. BuyLens is 100% independent. We take zero merchant kickbacks, affiliate fees, or sponsored listings. Our only allegiance is to you the buyer.
              </p>
            </Card>

            <Card variant="default" padding="md" className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#101828]">
                Can I analyze informal quotes from WhatsApp or Instagram?
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Yes! You can paste raw text messages, bulleted quotes, or upload screenshots. BuyLens extracts specifications, detects omitted accessories, and creates an actionable question checklist to send back to the vendor.
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
          <p>Â© {new Date().getFullYear()} BuyLens AI. Know what you&apos;re buying before you pay.</p>
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



