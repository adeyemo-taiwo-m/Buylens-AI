"use client";

import React from "react";

/**
 * HeroProductCard — the shared inner content of the magnifier hero.
 *
 * Rendered twice inside MagnifierCard (blurred base + sharp magnified copy).
 * Both copies must produce identical DOM so the clip-path alignment stays
 * pixel-perfect. All interactive elements are inert because this entire
 * card is decorative; real CTAs live outside.
 */
export function HeroProductCard() {
  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 p-5 sm:p-7">
      {/* ── Left: Product Image ──────────────────────────── */}
      <div className="flex flex-col items-center gap-2.5 sm:w-[42%] shrink-0">
        {/* Main product visual */}
        <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[#e8ecf4] to-[#d0d8e8] flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 300 210"
            className="w-[82%] h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Laptop lid */}
            <rect
              x="35"
              y="20"
              width="230"
              height="140"
              rx="8"
              fill="#303540"
            />
            <rect
              x="43"
              y="28"
              width="214"
              height="120"
              rx="4"
              fill="#1c1f28"
            />
            {/* Screen — blue gradient wallpaper */}
            <rect
              x="47"
              y="32"
              width="206"
              height="112"
              rx="2"
              fill="url(#scrn)"
            />
            {/* Desktop window */}
            <rect
              x="80"
              y="44"
              width="140"
              height="80"
              rx="4"
              fill="#f0f4ff"
              opacity="0.88"
            />
            <rect x="80" y="44" width="140" height="14" rx="4" fill="#dce4f5" />
            <circle cx="92" cy="51" r="3" fill="#f87171" />
            <circle cx="102" cy="51" r="3" fill="#fbbf24" />
            <circle cx="112" cy="51" r="3" fill="#34d399" />
            {/* Window body lines */}
            <rect
              x="90"
              y="68"
              width="90"
              height="4"
              rx="2"
              fill="#c7d2fe"
              opacity="0.6"
            />
            <rect
              x="90"
              y="78"
              width="120"
              height="4"
              rx="2"
              fill="#c7d2fe"
              opacity="0.4"
            />
            <rect
              x="90"
              y="88"
              width="70"
              height="4"
              rx="2"
              fill="#c7d2fe"
              opacity="0.3"
            />
            <rect
              x="90"
              y="98"
              width="100"
              height="4"
              rx="2"
              fill="#c7d2fe"
              opacity="0.3"
            />
            {/* Taskbar */}
            <rect x="47" y="126" width="206" height="18" fill="#0c1a36" />
            <rect x="56" y="130" width="10" height="10" rx="2" fill="#3b82f6" />
            <rect x="72" y="130" width="10" height="10" rx="2" fill="#60a5fa" />
            <rect x="88" y="130" width="10" height="10" rx="2" fill="#93c5fd" />
            {/* Keyboard base */}
            <rect
              x="28"
              y="160"
              width="244"
              height="10"
              rx="5"
              fill="#4a4e58"
            />
            <rect x="55" y="170" width="190" height="4" rx="2" fill="#3a3e48" />
            {/* Trackpad */}
            <rect x="115" y="175" width="70" height="6" rx="3" fill="#555a64" />
            <defs>
              <linearGradient id="scrn" x1="47" y1="32" x2="253" y2="144">
                <stop offset="0%" stopColor="#0078d4" />
                <stop offset="60%" stopColor="#0098ff" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-1.5 w-full justify-center">
          {[
            "from-[#dde4f0] to-[#c4cedf]",
            "from-[#d5dded] to-[#b9c5d8]",
            "from-[#e0e6ef] to-[#ccd4e1]",
            "from-[#d8e0ec] to-[#bfc9da]",
          ].map((grad, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${grad} border border-[#e4e8f0]`}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Product Info ──────────────────────────── */}
      <div className="flex-1 flex flex-col gap-2.5 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-[#101828] leading-snug">
          Aero 14 Pro:{"\u00A0"}
          <br className="hidden sm:inline" />
          Brilliant Display
        </h3>

        {/* Stars + rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-px">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                viewBox="0 0 16 16"
                className="w-3 h-3"
                fill={s <= 4 ? "#f59e0b" : "#e5e7eb"}
              >
                <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.9 5L8 12.4 3.5 14.7l.9-5L.8 6.2l5-.7L8 1z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] font-semibold text-[#f59e0b]">4.9</span>
          <span className="text-[10px] text-[#98a2b3]">
            Based on 1,250 Reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[10px] text-[#98a2b3] line-through">
            $299.00
          </span>
          <span className="text-lg font-bold text-[#101828]">$1,399.00</span>
        </div>

        {/* Strikethrough promo marker */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-semibold text-[#dc2626] bg-[#fee2e2] px-1.5 py-0.5 rounded">
            SAVE $100.00 OFF
          </span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-[#667085] leading-relaxed">
          Create without limits. A stunning 14&quot; 3K&thinsp;OLED display,
          Intel Core Ultra 7 performance, and a sleek body built for work on the
          go.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {["Best\nDisplay", "3K OLED\nDisplay", "8.2 kg\nBuild Quality"].map(
            (label, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#eff6ff] border border-[#dbeafe] text-[9px] text-[#3b82f6] font-medium whitespace-pre-line leading-tight"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                <span>{label}</span>
              </div>
            ),
          )}
        </div>

        {/* CTA buttons (decorative) */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="h-9 rounded-full bg-[#2563eb] text-white text-xs font-semibold flex items-center justify-center">
            Add to Cart
          </div>
          <div className="h-9 rounded-full bg-[#1d4ed8] text-white text-xs font-semibold flex items-center justify-center">
            Buy Now
          </div>
        </div>
      </div>
    </div>
  );
}
