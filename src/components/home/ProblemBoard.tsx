"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Headphones,
  MessagesSquare,
  ReceiptText,
  Search,
  SlidersHorizontal,
  Star,
  Tag,
} from "lucide-react";
import { PROBLEM_ASSETS } from "./problemData";

type ProblemBoardProps = {
  showChrome?: boolean;
};

const SPECIFICATIONS = [
  "40mm Driver",
  "ANC",
  "30h battery",
  "32 ohms",
  "Bluetooth 5.3",
  "aptX",
  "20Hz - 20kHz",
  "IPX4",
  "Hi-Res Audio",
];

const BOARD_CONCERNS = [
  "Fear of wasting money",
  "Hidden drawbacks",
  "Too many specifications",
  "Conflicting reviews",
  "Which one should I pick?",
  "Is it really a good deal?",
  "Surprise costs at checkout",
];

function CardHeader({ icon: Icon, children, plain = false }: { icon: LucideIcon; children: string; plain?: boolean }) {
  return (
    <div className="problem-board-header">
      <span className={`problem-board-icon-tile${plain ? " problem-board-icon-plain" : ""}`}>
        <Icon aria-hidden="true" />
      </span>
      <h3>{children}</h3>
    </div>
  );
}

function HeadphoneImage({ variant = "blue", className = "" }: { variant?: "blue" | "cream" | "navy"; className?: string }) {
  return (
    <Image
      src={PROBLEM_ASSETS.headphone}
      alt=""
      aria-hidden="true"
      width={210}
      height={210}
      className={`problem-board-headphone problem-board-headphone-${variant} ${className}`}
    />
  );
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <span className="problem-board-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={index < rating ? "is-filled" : ""} />
      ))}
    </span>
  );
}

export function ProblemBoard({ showChrome = false }: ProblemBoardProps) {
  return (
    <div className={`problem-board${showChrome ? " problem-board-with-chrome" : ""}`}>
      {showChrome ? (
        <>
          <div className="problem-board-chrome-top">
            <span>THE HEADPHONE DECISION</span>
            <span>7 concerns. One purchase.</span>
          </div>
          <div className="problem-board-chrome-heading">
            <h2>
              <span>Great headphones.</span>
              <span>A harder decision.</span>
            </h2>
            <p>The specs, the reviews, the price. Why choosing a pair can feel like more than just choosing a sound.</p>
          </div>
          <div className="problem-board-chrome-divider" />
        </>
      ) : null}

      <div className="problem-board-canvas">
        <article className="problem-board-card problem-board-card-wide">
          <CardHeader icon={AlertCircle}>Fear of wasting money</CardHeader>
          <div className="problem-board-product-row">
            <div className="problem-board-product-tile">
              <HeadphoneImage />
            </div>
            <div className="problem-board-product-copy">
              <p className="problem-board-eyebrow">THE PAIR YOU&apos;RE CONSIDERING</p>
              <p className="problem-board-product-title">Wireless headphones</p>
              <div className="problem-board-price-row">
                <strong>$199</strong>
                <del>$249</del>
              </div>
              <button type="button" className="problem-board-pay-button">Pay now</button>
            </div>
          </div>
        </article>

        <article className="problem-board-card problem-board-card-hidden">
          <CardHeader icon={Search} plain>Hidden drawbacks</CardHeader>
          <p className="problem-board-hidden-title">What if there&apos;s a drawback?</p>
          <div className="problem-board-short-divider" />
          <p className="problem-board-hidden-copy">You don&apos;t want to discover an important drawback after buying.</p>
        </article>

        <article className="problem-board-card problem-board-card-specs">
          <CardHeader icon={SlidersHorizontal}>Too many specifications</CardHeader>
          <div className="problem-board-spec-grid">
            {SPECIFICATIONS.map((specification) => <span key={specification}>{specification}</span>)}
          </div>
        </article>

        <article className="problem-board-card problem-board-card-reviews">
          <CardHeader icon={MessagesSquare}>Conflicting reviews</CardHeader>
          <div className="problem-board-review-grid">
            <div className="problem-board-review problem-board-review-positive">
              <ReviewStars rating={5} />
              <p>&ldquo;Best purchase ever!&rdquo;</p>
            </div>
            <div className="problem-board-review problem-board-review-negative">
              <ReviewStars rating={1} />
              <p>&ldquo;Stopped working after two weeks&rdquo;</p>
            </div>
          </div>
          <p className="problem-board-review-summary">One person recommends it. Another warns you to stay away.</p>
        </article>

        <article className="problem-board-card problem-board-card-picks">
          <CardHeader icon={Headphones}>Which one should I pick?</CardHeader>
          <div className="problem-board-pick-grid">
            {(["A", "B", "C"] as const).map((model, index) => (
              <div className="problem-board-pick" key={model}>
                <div className="problem-board-pick-tile"><HeadphoneImage variant={index === 0 ? "blue" : index === 1 ? "cream" : "navy"} /></div>
                <span>Model {model}</span>
                <strong>{index === 0 ? "$179" : index === 1 ? "$199" : "$229"}</strong>
              </div>
            ))}
          </div>
          <p className="problem-board-caption">Similar specs, different prices</p>
        </article>

        <article className="problem-board-card problem-board-card-deal">
          <CardHeader icon={Tag}>Is it really a good deal?</CardHeader>
          <div className="problem-board-deal-price-row">
            <strong>$199</strong>
            <del>$249</del>
            <span>-20%</span>
          </div>
          <svg className="problem-board-chart" viewBox="0 0 365 100" aria-hidden="true">
            <path className="problem-board-chart-grid" d="M0 12H365M0 52H365M0 92H365" />
            <polyline className="problem-board-chart-line" points="0,37 48,9 96,46 145,16 243,92 365,61" />
            {[[48, 9], [96, 46], [145, 16], [243, 92], [365, 61]].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" className="problem-board-chart-dot" />
            ))}
          </svg>
          <p className="problem-board-caption">Price changed 3 times this month</p>
        </article>

        <article className="problem-board-card problem-board-card-cost">
          <CardHeader icon={ReceiptText}>Surprise costs at checkout</CardHeader>
          <div className="problem-board-cost-rows">
            <div><span>Item</span><strong>$199</strong></div>
            <div><span>Shipping</span><strong>$15</strong></div>
            <div><span>Tax</span><strong>$16</strong></div>
          </div>
          <div className="problem-board-cost-divider" />
          <div className="problem-board-total"><strong>Total</strong><strong>$230</strong></div>
        </article>
      </div>

      {showChrome ? (
        <div className="problem-board-chrome-footer">
          <span>Similar specs. Different prices. More questions than answers.</span>
          <strong>BUYING, BEFORE THE BUY</strong>
        </div>
      ) : null}
    </div>
  );
}

export function ProblemBoardConcernList() {
  return (
    <ul className="sr-only">
      {BOARD_CONCERNS.map((concern) => <li key={concern}>{concern}</li>)}
    </ul>
  );
}
