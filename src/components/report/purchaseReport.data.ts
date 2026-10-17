import type { DecisionReport } from "@/types/analysis";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { PurchaseReportSchema, type PurchaseReport } from "@/lib/validation/purchaseReport";
import { getSampleReport } from "@/lib/sample-reports";

export const REPORT_COPY = {
  badge: "PURCHASE REPORT",
  quotedPrice: "Quoted Price",
  quotedPriceNote: "Price provided for this analysis",
  buyScore: "BUY SCORE",
  riskAssessment: "Risk Assessment",
  verdictFallbackTitle: "Review the details before you pay.",
  verdictFallbackBody: "Verify the information that could change the final purchase decision.",
  promisingTitle: "Looks promising",
  verifyTitle: "Verify first",
  questionsTitle: "Questions to ask the seller",
  questionsSubtitle: "Get clear answers before you commit to this purchase.",
  copyQuestions: "Copy seller questions",
  copyQuestionsAction: "Copy Seller Questions",
  evidenceTitle: "Evidence & Sources",
  evidenceSubtitle: "See what this report is based on",
  finalTitle: "Don't commit until the key details are confirmed.",
  finalSubtitle: "It looks promising, but a few key details need verification.",
  analyzeNewPurchase: "Analyze new purchase",
  finalCta: "Get the answers you need before you make your decision",
  verdict: {
    positiveTitle: "Promising, but verify key details first.",
    positiveBody: "Warranty and installation costs need confirmation before you pay.",
  },
} as const;

export const SCORE_TONE_STYLES = {
  positive: {
    pill: "success" as const,
    banner: "bg-status-success-bg",
    bannerIcon: "bg-status-success text-white",
    gauge: "positive" as const,
  },
  neutral: {
    pill: "caution" as const,
    banner: "bg-status-warning-bg",
    bannerIcon: "bg-status-warning text-white",
    gauge: "neutral" as const,
  },
  negative: {
    pill: "risk" as const,
    banner: "bg-status-danger-bg",
    bannerIcon: "bg-status-danger text-white",
    gauge: "negative" as const,
  },
} satisfies Record<PurchaseReport["scoreTone"], { pill: "success" | "caution" | "risk"; banner: string; bannerIcon: string; gauge: "positive" | "neutral" | "negative" }>;

export const RISK_STYLES = {
  Low: {
    card: "bg-status-success-bg border-status-success-border",
    icon: "bg-status-success-bg text-status-success-text",
    pill: "bg-status-success-bg text-status-success-text",
  },
  Medium: {
    card: "bg-status-warning-bg border-status-warning-border",
    icon: "bg-status-warning-bg text-status-warning-text",
    pill: "bg-status-warning-bg text-status-warning-text",
  },
  High: {
    card: "bg-status-danger-bg border-status-danger-border",
    icon: "bg-status-danger-bg text-status-danger-text",
    pill: "bg-status-danger-bg text-status-danger-text",
  },
} satisfies Record<PurchaseReport["risk"]["level"], { card: string; icon: string; pill: string }>;

export const CATEGORY_IMAGE_FALLBACKS: Record<DecisionReport["category"], string> = {
  solar_power: "/analysis/solar.png",
  computing: "/laptop-1.jpg",
  smartphones: "/samsung-a56-hd.webp",
  appliances: "/logo-icon.svg",
  generators: "/logo-icon.svg",
  other: "/logo-icon.svg",
};

export const SELLER_QUESTIONS = [
  "What are the exact inverter & battery models?",
  "What is the battery's cycle-life rating and test conditions?",
  "What does the written warranty cover?",
  "Does the price include installation, cabling and mounting?",
  "Is the seller an authorised dealer, and can you provide a receipt and warranty card?",
] as const;

export const NEXT_STEPS = [
  {
    title: "Confirm the exact products",
    description: "Get the inverter and battery model numbers and their specifications.",
  },
  {
    title: "Get the full costs in writing",
    description: "Request an itemized quote covering installation, cabling and mounting.",
  },
  {
    title: "Confirm warranty terms",
    description: "Get the warranty terms in writing, including what it covers and for how long.",
  },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  solar_power: "Solar & Power",
  computing: "Computing",
  smartphones: "Phones & Tablets",
  appliances: "Home Appliances",
  generators: "Generators",
  other: "Other Purchase",
};

const SCORE_TONES: Record<DecisionReport["verdict"], PurchaseReport["scoreTone"]> = {
  STRONG_BUY: "positive",
  BUY_WITH_CAUTION: "positive",
  REQUEST_MORE_INFO: "neutral",
  OVERPRICED: "neutral",
  HIGH_RISK: "negative",
  DO_NOT_BUY: "negative",
};

function getScoreLabel(report: DecisionReport) {
  if (report.verdict === "BUY_WITH_CAUTION") return "Worth considering";
  if (report.verdict === "STRONG_BUY") return "Strong buy";
  if (report.verdict === "REQUEST_MORE_INFO") return "More information needed";
  if (report.verdict === "OVERPRICED") return "Wait before buying";
  return "Avoid for now";
}

function getRiskLevel(report: DecisionReport): PurchaseReport["risk"]["level"] {
  if (report.risks.some((risk) => risk.severity === "high" || risk.severity === "critical")) return "High";
  if (report.risks.some((risk) => risk.severity === "medium")) return "Medium";
  return "Low";
}

function getVerdict(report: DecisionReport, tone: PurchaseReport["scoreTone"]) {
  if (tone === "positive") return { title: REPORT_COPY.verdict.positiveTitle, body: REPORT_COPY.verdict.positiveBody };
  if (tone === "neutral") return { title: "More information is needed before you decide.", body: report.verdictSummary };
  return { title: "Pause before you pay.", body: report.verdictSummary };
}

export function toPurchaseReport(report: DecisionReport): PurchaseReport {
  const cachedSample = getSampleReport(report.sampleId);
  if (cachedSample) return PurchaseReportSchema.parse({ ...cachedSample, id: report.id, analyzedAt: report.createdAt });

  const tone = SCORE_TONES[report.verdict];
  const isDemoSolar = report.id === DEMO_SOLAR_REPORT.id || report.productName.includes("Hybrid Inverter");
  const promising = isDemoSolar
    ? ["Specific inverter and battery system quoted", "Stated capacity fits your description"]
    : report.positiveFindings.slice(0, 2);
  const verifyFirst = isDemoSolar
    ? ["Warranty coverage unconfirmed", "Installation cost unclear"]
    : (report.concerns.length > 0 ? report.concerns : report.missingInformation).slice(0, 2);
  const riskLevel = getRiskLevel(report);

  return PurchaseReportSchema.parse({
    id: report.id,
    title: isDemoSolar ? "5kVA Hybrid Inverter + 5kWh Lithium Battery" : report.productName,
    category: CATEGORY_LABELS[report.category] ?? report.category,
    imageUrl: CATEGORY_IMAGE_FALLBACKS[report.category] ?? CATEGORY_IMAGE_FALLBACKS.other,
    analyzedAt: isDemoSolar ? "2026-10-11T00:00:00.000Z" : report.createdAt,
    quotedPrice: report.price,
    currency: "NGN",
    buyScore: report.score,
    scoreLabel: getScoreLabel(report),
    scoreTone: tone,
    risk: {
      level: riskLevel,
      note: riskLevel === "Low" ? "Low risk profile" : riskLevel === "High" ? "High risk detected" : "More information needed",
    },
    verdict: getVerdict(report, tone),
    promising,
    verifyFirst,
    sellerQuestions: [...SELLER_QUESTIONS],
    evidence: [
      { label: "Product details and quoted price", source: "User-provided quote", note: "Information supplied for this analysis." },
      { label: "Market price benchmark", source: "BuyLens market baseline", note: report.priceAssessment.commentary },
      { label: "Warranty and installation checks", source: "Decision analysis", note: "Open items are based on details missing from the quote." },
    ],
    nextSteps: NEXT_STEPS.map((step) => ({ title: step.title, description: step.description })),
  });
}
