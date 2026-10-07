import Link from "next/link";
import { ArrowUpRight, BarChart2, History, Scale } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center text-white font-bold text-sm">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-zinc-950">
              BuyLens <span className="text-zinc-500 font-normal">AI</span>
            </span>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-600">
          <Link href="/analyze" className="hover:text-zinc-950 transition-colors">
            Analyze Purchase
          </Link>
          <Link href="/history" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
            <History className="h-3.5 w-3.5" />
            <span>History</span>
          </Link>
          <Link href="/compare" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
            <Scale className="h-3.5 w-3.5" />
            <span>Compare</span>
          </Link>
          <Link href="/report/demo" className="hover:text-zinc-950 transition-colors">
            Sample Report
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 px-2 py-1"
          >
            Sign In
          </Link>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
          >
            <span>Analyze</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
