import type { DecisionReport, ProductCategory } from "@/types/analysis";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";
import type { Sample } from "@/lib/samples";

const sample1Questions = [
  "What is the battery's cycle life rating at 80% Depth of Discharge?",
  "What exactly does the warranty cover, and where is the physical service center located in Nigeria?",
  "Is professional installation, testing, and cabling included in the ₦850,000 quote?",
  "What exact model number is the inverter, and does it support closed-loop CAN/RS485 BMS communication?",
  "Is the seller an authorised dealer, and can you provide a receipt and warranty card?",
];

const sample2Questions = [
  "Can you share your verified business registration and physical shop address?",
  "What are the exact brand, model numbers and serial numbers of every component?",
  "Can I inspect and test the system before making any payment?",
  "What written warranty and refund terms will be included on the invoice?",
  "Can delivery and installation happen before the balance is paid?",
];

const sample3Questions = [
  "Can you provide the Felicity Solar inverter and battery model numbers before purchase?",
  "Will the 5-year warranty cards be issued and stamped at the time of purchase?",
  "Does the quoted installation include all cabling, mounting and commissioning?",
  "Can I inspect the showroom stock and test the system before paying?",
  "Can you share the battery's cycle-life test report and service process?",
];

const nextSteps = [
  { title: "Confirm the exact products", description: "Get the inverter and battery model numbers and their specifications." },
  { title: "Get the full costs in writing", description: "Request an itemized quote covering installation, cabling and mounting." },
  { title: "Confirm warranty terms", description: "Get the warranty terms in writing, including what it covers and for how long." },
];

function evidence(note: string): PurchaseReport["evidence"] {
  return [
    { label: "Product details and quoted price", source: "User-provided quote", note: "Information supplied for this analysis." },
    { label: "Market price benchmark", source: "BuyLens market baseline", note },
    { label: "Seller and warranty checks", source: "Decision analysis", note: "Open items are based on details supplied in the listing." },
  ];
}

export const SAMPLE_REPORTS: Record<string, PurchaseReport> = {
  "inverter-5kva": {
    id: "inverter-5kva",
    title: "5kVA Hybrid Inverter + 5kWh Lithium Battery",
    category: "Solar & Power",
    imageUrl: "/analysis/solar.png",
    analyzedAt: "2026-10-11T00:00:00.000Z",
    quotedPrice: 850000,
    currency: "NGN",
    buyScore: 82,
    scoreLabel: "Worth considering",
    scoreTone: "positive",
    risk: { level: "Medium", note: "More information needed" },
    verdict: { title: "Promising, but verify key details first.", body: "Warranty and installation costs need confirmation before you pay." },
    promising: ["Specific inverter and battery system quoted", "Stated capacity fits your description"],
    verifyFirst: ["Warranty coverage unconfirmed", "Installation cost unclear"],
    sellerQuestions: sample1Questions,
    evidence: evidence("The quoted amount sits within the expected competitive range for this type of setup."),
    nextSteps,
  },
  "solar-kit-too-good": {
    id: "solar-kit-too-good",
    title: "Complete 10kVA Solar Power System, Brand New, Original",
    category: "Solar & Power",
    imageUrl: "/analysis/solar.png",
    analyzedAt: "2026-10-17T00:00:00.000Z",
    quotedPrice: 450000,
    currency: "NGN",
    buyScore: 28,
    scoreLabel: "High risk, avoid for now",
    scoreTone: "negative",
    risk: { level: "High", note: "Multiple red flags" },
    verdict: { title: "Pause before you pay.", body: "The price and payment terms create too much avoidable risk." },
    promising: ["Product type matches your description"],
    verifyFirst: ["Price is far below typical market range", "Seller is new and has no verifiable address", "Full upfront payment with no refund", "No brand, model or warranty stated"],
    sellerQuestions: sample2Questions,
    evidence: evidence("The quote is materially below the market baseline and asks for irreversible upfront payment."),
    nextSteps,
  },
  "inverter-documented": {
    id: "inverter-documented",
    title: "Felicity Solar 5kVA 48V Hybrid Inverter with 10kWh LiFePO4 Battery",
    category: "Solar & Power",
    imageUrl: "/analysis/solar.png",
    analyzedAt: "2026-10-17T00:00:00.000Z",
    quotedPrice: 1650000,
    currency: "NGN",
    buyScore: 90,
    scoreLabel: "Strong buy",
    scoreTone: "positive",
    risk: { level: "Low", note: "Key details confirmed" },
    verdict: { title: "A well-documented listing.", body: "The key purchase details are clear; complete the final checks before paying." },
    promising: ["Brand and model clearly stated", "5-year written warranty on both units", "Installation included in price", "Physical showroom for inspection"],
    verifyFirst: ["Confirm the warranty card is issued at purchase", "Check the battery's cycle-life test report"],
    sellerQuestions: sample3Questions,
    evidence: evidence("The listing includes a named product, showroom, written warranty and installation scope."),
    nextSteps,
  },
};

export function getSampleReport(id: string | undefined): PurchaseReport | undefined {
  return id ? SAMPLE_REPORTS[id] : undefined;
}

export function sampleReportToDecisionReport(sample: Sample, id = createReportId()): DecisionReport {
  const cached = SAMPLE_REPORTS[sample.id];
  const category: ProductCategory = "solar_power";
  return {
    id,
    sampleId: sample.id,
    createdAt: new Date().toISOString(),
    productName: sample.title,
    category,
    price: sample.price,
    currency: sample.currency,
    score: cached.buyScore,
    verdict: cached.scoreTone === "negative" ? "HIGH_RISK" : cached.buyScore >= 88 ? "STRONG_BUY" : "BUY_WITH_CAUTION",
    verdictSummary: cached.verdict.body,
    confidenceScore: cached.scoreTone === "negative" ? 91 : 88,
    infoCompletenessScore: cached.scoreTone === "negative" ? 42 : cached.buyScore >= 88 ? 96 : 64,
    priceAssessment: {
      marketAverage: sample.id === "solar-kit-too-good" ? 4800000 : sample.id === "inverter-documented" ? 1750000 : 920000,
      differencePercent: sample.id === "solar-kit-too-good" ? -90.6 : sample.id === "inverter-documented" ? -5.7 : -7.6,
      fairPriceRange: sample.id === "solar-kit-too-good" ? [4000000, 5400000] : sample.id === "inverter-documented" ? [1500000, 2000000] : [780000, 950000],
      verdict: sample.id === "solar-kit-too-good" ? "underpriced" : "fair",
      commentary: cached.evidence[1]?.note ?? "Market comparison based on the supplied purchase details.",
    },
    valueAssessment: {
      durabilityScore: cached.buyScore,
      afterSaleSupportScore: cached.risk.level === "Low" ? 94 : cached.risk.level === "High" ? 22 : 72,
      overallValueRating: cached.risk.level === "High" ? "poor" : cached.risk.level === "Low" ? "excellent" : "good",
      summary: cached.verdict.body,
    },
    positiveFindings: cached.promising,
    concerns: cached.verifyFirst,
    missingInformation: cached.verifyFirst,
    risks: [{ id: `${sample.id}-risk`, severity: cached.risk.level === "High" ? "high" : cached.risk.level === "Medium" ? "medium" : "low", title: cached.risk.note, explanation: cached.verdict.body }],
    sellerQuestions: cached.sellerQuestions.map((question, index) => ({ id: `${sample.id}-question-${index + 1}`, priority: index < 3 ? "essential" : "recommended", question, reason: "Confirm this detail before releasing payment." })),
    alternatives: [],
    finalRecommendation: cached.verdict.body,
  };
}

function createReportId() {
  return globalThis.crypto?.randomUUID?.() ?? `report-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
