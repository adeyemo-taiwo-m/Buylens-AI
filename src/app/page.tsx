import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { InteractiveLensExperience } from "@/components/home/InteractiveLensExperience";
import { DecisionFeaturesSection } from "@/components/home/DecisionFeaturesSection";
import { AnalysisPreviewSection } from "@/components/home/AnalysisPreviewSection";
import { FaqSection } from "@/components/home/FaqSection";
import { BuyWithClaritySection } from "@/components/home/BuyWithClaritySection";
import { Footer } from "@/components/home/Footer";
import {
  ArrowRight,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#101828]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="buyhero relative px-5 pt-12 sm:pt-[90px] pb-10 text-center">
          <div className="buyhero-bg" aria-hidden="true" />
          <RevealGroup className="relative z-10 mx-auto max-w-[1000px]" trigger="load">
            <Reveal grouped className="inline-flex h-[43px] items-center gap-2 rounded-full border border-[var(--border-blue)] bg-white/90 px-2.5 mb-7 shadow-sm">
              <span className="inline-flex h-[26px] items-center gap-1 rounded-full bg-[#E3EEFF] px-2 text-[11px] font-medium text-[var(--blue-600)]"><span className="text-sm">⟳</span>New</span>
              <span className="pr-2 text-[12px] font-medium tracking-[0.02em] text-[var(--blue-600)]">AI-POWERED PURCHASE INTELLIGENCE</span>
            </Reveal>
            <Reveal as="h1" grouped className="text-hero-title buyhero-title text-[var(--hero-text-heading)]">
              <span className="block font-medium">Know What You&apos;re Buying</span>
              <span className="block font-bold text-[var(--blue-600)]">Before You Pay.</span>
            </Reveal>
            <Reveal as="p" grouped className="mx-auto mt-6 max-w-[830px] text-title-1 text-[var(--hero-text-body)]">
              Make smarter purchase decisions with AI that helps you evaluate products, uncover trade-offs, and understand whether something is truly worth your money.
            </Reveal>
            <Reveal grouped className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#how-it-works" className="buyhero-secondary-cta inline-flex h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-[var(--blue-100)] px-6 text-title-4-medium text-[var(--blue-500)] transition sm:w-[200px]">See how it works <span aria-hidden="true" className="text-lg">↓</span></Link>
              <Link href="/app/analyze" className="buyhero-primary-cta inline-flex h-[50px] w-full max-w-[240px] items-center justify-center gap-2 rounded-full bg-[var(--blue-500)] px-6 text-title-4-medium text-white shadow-[0_8px_22px_-8px_rgba(47,111,235,.55)] transition sm:w-[220px]">Analyze a purchase <ArrowRight className="h-[18px] w-[18px]" /></Link>
            </Reveal>
          </RevealGroup>
        </section>

        <InteractiveLensExperience />

        <HowItWorksSection />

        <DecisionFeaturesSection />
        <AnalysisPreviewSection />
        <FaqSection />
        <BuyWithClaritySection />
      </main>

      <Footer />
    </div>
  );
}



