"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavigationProps {
  className?: string;
}

export function TopNavigation({ className }: TopNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Features", href: "/#features" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      className={cn(
        "w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-50",
        className,
      )}
    >
      {/* Floating Pill Container */}
      <div className="w-full bg-[#EDF5FF] border border-[#D4E4FC] rounded-full h-14 sm:h-16 px-4 sm:px-7 flex items-center justify-between shadow-[0_4px_24px_-4px_rgba(37,99,235,0.08)] backdrop-blur-md">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 hover:opacity-90 transition-opacity"
        >
          <BrandLogo size="header" priority />
        </Link>

        {/* Center: Navigation Links (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px] sm:text-sm font-medium text-[#334155]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#2563EB] transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="px-2 text-[13px] font-medium text-ink-muted transition-colors hover:text-primary-600">Log in</Link>
          <CtaButton href="/login" trailingIcon={<ArrowRight className="h-4 w-4" />} className="h-9 px-4 text-[13px]">Analyze a purchase</CtaButton>
        </div>

        {/* Mobile Action & Hamburger Toggle (< 640px) */}
        <div className="flex sm:hidden items-center gap-2">
          <CtaButton href="/login" trailingIcon={<ArrowRight className="h-4 w-4" />} className="h-8 px-3 text-[13px]">Analyze a purchase</CtaButton>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#334155] hover:text-[#2563EB] rounded-full hover:bg-[#DDEBFE] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Expanded when hamburger clicked) */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 rounded-2xl bg-white border border-[#D4E4FC] p-4 shadow-lg animate-fade-up space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#334155]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#EDF5FF] hover:text-[#2563EB] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-ink-muted">Log in</Link>
            <CtaButton href="/login" trailingIcon={<ArrowRight className="h-4 w-4" />} className="h-9 w-full">Analyze a purchase</CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}
