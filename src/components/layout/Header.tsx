"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ScanSearch,
  History,
  Scale,
  FileText,
  ArrowUpRight,
  Menu,
  X,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Analyze Purchase", href: "/app/analyze", icon: ScanSearch },
    { label: "Analysis History", href: "/app/history", icon: History },
    { label: "Compare Alternatives", href: "/compare", icon: Scale },
    { label: "Sample Report", href: "/report/demo", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="h-8 w-8 rounded-[8px] bg-[#0B1220] flex items-center justify-center text-white font-bold text-sm shadow-xs">
            B
          </div>
          <span className="text-base font-bold tracking-tight text-[#101828]">
            BuyLens <span className="text-[#667085] font-normal">AI</span>
          </span>
        </Link>

        {/* 1. Desktop & Laptop: Full Text Navigation (lg and xl screens) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#667085]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors duration-150 py-1 border-b-2",
                  isActive
                    ? "text-[#0B1220] border-[#0B1220]"
                    : "border-transparent hover:text-[#101828]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 2. Tablet & Mobile: Icons Denote Sub-Navs (md and below) */}
        <nav className="flex lg:hidden items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                aria-label={link.label}
                className={cn(
                  "p-2 rounded-[8px] transition-all duration-150 relative group flex items-center justify-center",
                  isActive
                    ? "bg-[#0B1220] text-white"
                    : "text-[#667085] hover:bg-[#F2F4F0] hover:text-[#101828]"
                )}
              >
                <Icon className={cn("h-4 w-4 sm:h-4.5 sm:w-4.5", isActive && "text-[#B8F34A]")} />
                <span className="sr-only sm:not-sr-only sm:text-[11px] sm:font-semibold sm:ml-1 hidden sm:inline">
                  {link.label.split(" ")[0]}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-[#667085] hover:text-[#101828] px-2 py-1.5 rounded-[8px] hover:bg-[#F2F4F0] transition-colors"
          >
            <span className="hidden sm:inline">Sign In</span>
            <User className="h-4 w-4 sm:hidden text-[#101828]" />
          </Link>

          <Link
            href="/app/analyze"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-[10px] bg-[#0B1220] text-white hover:bg-[#111A2B] transition-colors shadow-xs shrink-0"
          >
            <span>Analyze</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#B8F34A]" />
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#667085] hover:text-[#101828] rounded-[8px] hover:bg-[#F2F4F0]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (When hamburger clicked on mobile/tablet) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E4E7EC] bg-white px-4 py-4 space-y-2 shadow-md animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] px-2 mb-1">
            Navigation
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-[#0B1220] text-white"
                    : "text-[#101828] hover:bg-[#F2F4F0]"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-[#B8F34A]" : "text-[#667085]")} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-[#E4E7EC] flex items-center justify-between px-2 text-xs">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-[#0B1220]"
            >
              Sign In to Account
            </Link>
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#667085]"
            >
              Go to App Home →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
