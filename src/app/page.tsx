import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { InteractiveLensExperience } from "@/components/home/InteractiveLensExperience";
import { DecisionFeaturesSection } from "@/components/home/DecisionFeaturesSection";
import { AnalysisPreviewSection } from "@/components/home/AnalysisPreviewSection";
import { FaqSection } from "@/components/home/FaqSection";
import { BuyWithClaritySection } from "@/components/home/BuyWithClaritySection";
import { Footer } from "@/components/home/Footer";
import { DemoLoginButton } from "@/components/auth/DemoLoginButton";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-white text-ink">
      <Header />
      <main className="flex-1">
        <section className="buyhero relative px-5 pb-10 pt-12 text-center sm:pt-[90px]">
          <div className="buyhero-bg" aria-hidden="true" />
          <RevealGroup className="relative z-10 mx-auto max-w-[1000px]" trigger="load">
            <Reveal grouped className="mb-7 inline-flex h-[43px] items-center gap-2 rounded-full border border-[var(--border-blue)] bg-white/90 px-2.5 shadow-sm">
              <span className="inline-flex h-[26px] items-center gap-1 rounded-full bg-primary-100 px-2 text-[11px] font-medium text-primary-600"><span className="text-sm">✦</span>New</span>
              <span className="pr-2 text-[12px] font-medium tracking-[0.02em] text-primary-600">AI-POWERED PURCHASE INTELLIGENCE</span>
            </Reveal>
            <Reveal as="h1" grouped className="text-hero-title buyhero-title text-[var(--hero-text-heading)]">
              <span className="block font-medium">Know What You&apos;re Buying</span>
              <span className="block font-bold text-primary-600">Before You Pay.</span>
            </Reveal>
            <Reveal as="p" grouped className="mx-auto mt-6 max-w-[830px] text-title-1 text-[var(--hero-text-body)]">
              Make smarter purchase decisions with AI that helps you evaluate products, uncover trade-offs, and understand whether something is truly worth your money.
            </Reveal>
            <Reveal grouped className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex w-full max-w-[240px] flex-col items-center gap-1.5 sm:w-[220px]">
                <DemoLoginButton className="buyhero-primary-cta h-[50px] w-full px-6 text-title-4-medium" />
                <span className="text-xs text-ink-muted">No sign-up needed.</span>
              </div>
              <Link href="#how-it-works" className="buyhero-secondary-cta inline-flex h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full border border-primary-200 bg-white px-6 text-title-4-medium text-primary-600 shadow-none transition-colors hover:bg-primary-50 active:scale-[0.98] sm:w-[200px]">See how it works <span aria-hidden="true" className="text-lg">↓</span></Link>
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
