"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Layers,
  Cpu,
  BarChart3,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#090b10] text-zinc-100">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-transparent blur-[120px]" />
        <div className="absolute top-20 right-10 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090b10]/70 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              BuyLens<span className="text-indigo-400">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-zinc-100 transition-colors">
              Features
            </a>
            <a href="#intelligence" className="hover:text-zinc-100 transition-colors">
              AI Intelligence
            </a>
            <a href="#pricing" className="hover:text-zinc-100 transition-colors">
              Solutions
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 mb-8 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen Autonomous Product Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            See Through The Noise. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
              Buy With Certainty.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-zinc-400 mb-10 leading-relaxed">
            BuyLens AI scans prices, filters manipulated reviews, predicts historical discounts,
            and synthesizes unbiased purchase recommendations in seconds.
          </p>

          {/* Interactive Search / URL Input Preview */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300" />
            <div className="relative flex items-center bg-zinc-900/90 border border-zinc-700/80 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
              <Search className="h-5 w-5 text-zinc-400 ml-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Paste product link (Amazon, BestBuy...) or search any gadget..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shrink-0">
                <span>Analyze</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Micro badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Fake review filtering</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Price drop forecast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Instant cross-store comparison</span>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section id="features" className="w-full max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Review Authenticity Lens</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Detect bot clusters, incentivized reviews, and deceptive ratings with natural language truth analysis.
              </p>
            </div>

            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <TrendingDown className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Deal & Price Radar</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Track full price history, spot fake markdowns, and get predictive timing recommendations on when to buy.
              </p>
            </div>

            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Specification Synthesis</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Side-by-side technical teardowns comparing real user pain points across competing alternatives.
              </p>
            </div>
          </div>
        </section>

        {/* Live Preview Demo Mockup */}
        <section id="intelligence" className="w-full max-w-5xl mx-auto px-6 py-12">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-zinc-500 font-mono ml-2">buylens.ai/analysis-preview</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Confidence: 94%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Analyzed Product</span>
                  <span className="text-xs text-indigo-400 flex items-center gap-1 cursor-pointer hover:underline">
                    Source Link <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white">Sony WH-1000XM5 Wireless Headphones</h4>
                <p className="text-sm text-zinc-400">
                  Analyzed 4,280 verified customer reviews across 6 major retailers.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <div className="text-2xl font-bold text-emerald-400">$298.00</div>
                  <div className="text-sm text-zinc-500 line-through">$399.99</div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                    25% Off (All-Time Low)
                  </span>
                </div>
              </div>

              <div className="space-y-3 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 text-sm">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Verdict Summary</div>
                <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                  <strong className="text-white">Recommended Buy.</strong> Market pricing is at the 90-day floor. Top positive consensus highlights industry-leading ANC and battery life. 8% of reviews flagged for build rigidity concerns.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80 text-xs text-zinc-400">
                  <span>Authenticity Score: <strong className="text-emerald-400">92/100</strong></span>
                  <span>Buy Urgency: <strong className="text-indigo-400">High</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/80 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} BuyLens AI. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
