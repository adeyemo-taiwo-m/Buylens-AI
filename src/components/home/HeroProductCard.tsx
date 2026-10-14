"use client";

import React from "react";
import Image from "next/image";

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
      {/* ── Left: Product Image Gallery ──────────────────── */}
      <div className="flex flex-col items-center gap-2.5 sm:w-[42%] shrink-0">
        {/* Main product visual */}
        <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#edf1f8] to-[#dde4ef] flex items-center justify-center overflow-hidden p-3">
          <Image
            src="/main-laptop.png"
            alt="Aero 14 Pro laptop with Windows display"
            width={480}
            height={360}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-1.5 w-full justify-center">
          {[
            { src: "/laptop-1.jpg", alt: "Laptop side view" },
            { src: "/laptop-2.jpg", alt: "Laptop dark display" },
            { src: "/laptop-3.jpg", alt: "Laptop front view" },
            { src: "/laptop-4.jpg", alt: "Laptop front and back" },
          ].map((thumb, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-lg border border-[#dbe4f0] bg-gradient-to-br from-[#f0f4fa] to-[#e4eaf4] overflow-hidden flex items-center justify-center"
            >
              <Image
                src={thumb.src}
                alt={thumb.alt}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
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
                fill="#f59e0b"
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

        {/* Old price (strikethrough) */}
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-[10px] text-[#98a2b3] line-through">
            $1,499.00
          </span>
        </div>

        {/* Current price + badge */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#101828]">$1,399.00</span>
          <span className="text-[9px] font-semibold text-[#3b72ea] bg-[#edf3ff] px-2 py-0.5 rounded-full">
            SAVE $100 | 7% OFF
          </span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-[#667085] leading-relaxed">
          Create without limits. A stunning 14&quot; OLED display,
          Intel Core Ultra 7 performance, and a slim 1.4 kg body
          built for work on the move.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mt-1">
          {/* Secure Checkout */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 20 20"
              className="w-4 h-4 text-[#667085]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="8" width="14" height="10" rx="2" />
              <path d="M6 8V5a4 4 0 018 0v3" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-[#101828] leading-tight">Secure</span>
              <span className="text-[8px] text-[#98a2b3] leading-tight">Checkout</span>
            </div>
          </div>

          {/* Free Fast Shipping */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 20 20"
              className="w-4 h-4 text-[#667085]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 3h11v10H1zM12 7h3l3 3v3h-6z" />
              <circle cx="5" cy="14.5" r="1.5" />
              <circle cx="15" cy="14.5" r="1.5" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-[#101828] leading-tight">Free Fast</span>
              <span className="text-[8px] text-[#98a2b3] leading-tight">Shipping</span>
            </div>
          </div>

          {/* 30-Day Money-Back */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 20 20"
              className="w-4 h-4 text-[#667085]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M10 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" />
              <path d="M5 15l-2 3h14l-2-3" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-[#101828] leading-tight">30-Day Money-Back</span>
              <span className="text-[8px] text-[#98a2b3] leading-tight">Guarantee</span>
            </div>
          </div>
        </div>

        {/* CTA buttons (decorative) */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="h-9 rounded-full bg-[#3B72EA] text-white text-xs font-semibold flex items-center justify-center">
            Add to Cart
          </div>
          <div className="h-9 rounded-full bg-[#edf3ff] border border-[#d4e0f7] text-[#3B72EA] text-xs font-semibold flex items-center justify-center">
            Buy Now
          </div>
        </div>
      </div>
    </div>
  );
}
