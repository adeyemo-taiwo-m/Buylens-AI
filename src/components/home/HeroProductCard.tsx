"use client";

import React from "react";

/**
 * HeroProductCard — the inner card content shared between both layers
 * of the magnifier. This must be a purely visual / static component so
 * both copies render pixel-identical DOM, keeping the magnification
 * alignment perfect.
 *
 * All interactive elements (buttons, links) are disabled here because
 * the entire card is decorative; real CTAs live outside the magnifier.
 */
export function HeroProductCard() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
      {/* ── Left: Product Image Gallery ─────────────────────── */}
      <div className="flex flex-col items-center gap-3 sm:w-[44%] shrink-0">
        {/* Main product image placeholder */}
        <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[#e8ecf3] to-[#d1d8e5] flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 320 220"
            className="w-[85%] h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Laptop base */}
            <rect x="40" y="30" width="240" height="150" rx="8" fill="#2a2d35" />
            {/* Screen bezel */}
            <rect x="48" y="38" width="224" height="130" rx="4" fill="#1a1d25" />
            {/* Screen content - blue gradient */}
            <rect x="52" y="42" width="216" height="122" rx="2" fill="url(#screenGrad)" />
            {/* Taskbar */}
            <rect x="52" y="142" width="216" height="22" fill="#0c1b3a" />
            {/* Taskbar icons */}
            <rect x="60" y="148" width="10" height="10" rx="2" fill="#3b82f6" />
            <rect x="76" y="148" width="10" height="10" rx="2" fill="#60a5fa" />
            <rect x="92" y="148" width="10" height="10" rx="2" fill="#93c5fd" />
            <rect x="108" y="148" width="10" height="10" rx="2" fill="#38bdf8" />
            {/* Search bar on taskbar */}
            <rect x="140" y="150" width="80" height="6" rx="3" fill="#1e3a5f" />
            {/* Desktop icons */}
            <rect x="70" y="60" width="40" height="30" rx="4" fill="#dbeafe" />
            <rect x="70" y="95" width="40" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="130" y="60" width="40" height="30" rx="4" fill="#bfdbfe" />
            <rect x="130" y="95" width="40" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="190" y="60" width="40" height="30" rx="4" fill="#93c5fd" />
            <rect x="190" y="95" width="40" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
            {/* Window */}
            <rect x="90" y="52" width="140" height="85" rx="4" fill="#f0f4ff" opacity="0.85" />
            <rect x="90" y="52" width="140" height="12" rx="4" fill="#e0e7ff" />
            <circle cx="100" cy="58" r="3" fill="#f87171" />
            <circle cx="110" cy="58" r="3" fill="#fbbf24" />
            <circle cx="120" cy="58" r="3" fill="#34d399" />
            {/* Keyboard / base */}
            <path d="M20 180 L40 180 L40 186 Q40 190 36 190 L4 190 Q0 190 2 186 Z" fill="#3a3d45" opacity="0" />
            <rect x="30" y="180" width="260" height="8" rx="4" fill="#4a4d55" />
            <rect x="60" y="190" width="200" height="3" rx="1.5" fill="#3a3d45" />
            {/* Trackpad */}
            <rect x="120" y="192" width="80" height="4" rx="2" fill="#555860" />
            <defs>
              <linearGradient id="screenGrad" x1="52" y1="42" x2="268" y2="164">
                <stop offset="0%" stopColor="#0078d4" />
                <stop offset="50%" stopColor="#0098ff" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Thumbnail row */}
        <div className="flex gap-2 w-full justify-center">
          {[
            "from-[#dce3ed] to-[#c0c9d9]",
            "from-[#d1dae8] to-[#b5c1d5]",
            "from-[#e2e8f0] to-[#cbd5e1]",
            "from-[#d6dfe9] to-[#bcc8d8]",
          ].map((grad, i) => (
            <div
              key={i}
              className={`w-14 h-14 rounded-lg bg-gradient-to-br ${grad} border border-[#e2e6ec] flex items-center justify-center`}
            >
              <svg
                viewBox="0 0 40 28"
                className="w-[70%] h-auto"
                fill="none"
              >
                <rect x="4" y="2" width="32" height="20" rx="2" fill="#5b6577" opacity="0.3" />
                <rect x="10" y="22" width="20" height="2" rx="1" fill="#5b6577" opacity="0.2" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Product Details ───────────────────────────── */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[#101828] leading-snug">
          Aero 14 Pro:
          <br />
          Brilliant Display
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5"
                fill={star <= 4 ? "#f59e0b" : "#e5e7eb"}
              >
                <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.9 5L8 12.4 3.5 14.7l.9-5L.8 6.2l5-.7L8 1z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold text-[#f59e0b]">4.9</span>
          <span className="text-[11px] text-[#98a2b3]">
            Based on 1,250 Reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] text-[#98a2b3] line-through">
            $299.00
          </span>
          <span className="text-xl font-bold text-[#101828]">$1,399.00</span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#667085] leading-relaxed">
          Create without limits. A stunning 14&quot; 3K&thinsp;OLED display,
          Intel Core Ultra 7 performance, and a sleek body built for work on
          the go.
        </p>

        {/* Spec Pills */}
        <div className="flex flex-wrap gap-2 mt-1">
          {[
            { icon: "▲", label: "Best\nDisplay" },
            { icon: "◉", label: "3K OLED\nDisplay" },
            { icon: "◆", label: "8.2 kg\nBuild Quality" },
          ].map((spec, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#f0f4ff] border border-[#dbeafe] text-[10px] text-[#3b82f6] font-medium whitespace-pre-line leading-tight"
            >
              <span className="text-[#3b82f6]">{spec.icon}</span>
              <span>{spec.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <div
            className="h-10 rounded-full bg-[#2563eb] text-white text-sm font-semibold flex items-center justify-center"
            aria-hidden="true"
          >
            Add to Cart
          </div>
          <div
            className="h-10 rounded-full bg-[#1d4ed8] text-white text-sm font-semibold flex items-center justify-center"
            aria-hidden="true"
          >
            Buy Now
          </div>
        </div>
      </div>
    </div>
  );
}
