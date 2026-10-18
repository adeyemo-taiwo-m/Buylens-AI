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
  "Can you confirm the exact ProBook model number and processor generation?",
  "What is the battery health, and can I test it unplugged before paying?",
  "Is the laptop brand new, refurbished or locally used?",
  "What warranty is included, and where can I get support if there is a fault?",
  "Can I inspect the screen, keyboard, ports and charger before delivery?",
];

const sample3Questions = [
  "What is the exact TV model number and panel type?",
  "Can I inspect the screen for dead pixels, lines or backlight issues before delivery?",
  "Does the warranty cover the panel, and how are claims handled?",
  "Are wall mounting, delivery and setup included in the quoted price?",
  "Can you provide a receipt and confirm the return policy for a damaged unit?",
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
  "laptop-probook": {
    id: "laptop-probook",
    title: "HP ProBook 440 G10 Core i5, 16GB RAM, 512GB SSD",
    category: "Laptops & Computers",
    imageUrl: "/main-laptop.webp",
    analyzedAt: "2026-10-17T00:00:00.000Z",
    quotedPrice: 780000,
    currency: "NGN",
    buyScore: 78,
    scoreLabel: "Worth considering",
    scoreTone: "positive",
    risk: { level: "Medium", note: "More information needed" },
    verdict: { title: "A capable laptop, with a few checks first.", body: "Confirm battery health, condition and warranty coverage before you pay." },
    promising: ["Processor, memory and SSD are clearly listed", "Configuration suits everyday work and study"],
    verifyFirst: ["Battery health is not stated", "Warranty coverage is unclear"],
    sellerQuestions: sample2Questions,
    evidence: evidence("The quoted amount is plausible for a mid-range business laptop with these specifications."),
    nextSteps,
  },
  "smart-tv-55": {
    id: "smart-tv-55",
    title: "55-inch 4K UHD Smart LED TV with 3-Year Warranty",
    category: "TVs & Electronics",
    imageUrl: "/analysis/solar.png",
    analyzedAt: "2026-10-17T00:00:00.000Z",
    quotedPrice: 650000,
    currency: "NGN",
    buyScore: 74,
    scoreLabel: "Worth considering",
    scoreTone: "neutral",
    risk: { level: "Medium", note: "Check the details" },
    verdict: { title: "Check the panel before you pay.", body: "The feature set looks good, but inspect the screen and confirm warranty terms." },
    promising: ["4K resolution and smart features are listed", "Screen size fits a typical living room"],
    verifyFirst: ["Panel condition and inspection policy are unclear", "Warranty claim process is not stated"],
    sellerQuestions: sample3Questions,
    evidence: evidence("The listed features are clear, but the screen condition and after-sales terms need confirmation."),
    nextSteps,
  },
};

export function getSampleReport(id: string | undefined): PurchaseReport | undefined {
  return id ? SAMPLE_REPORTS[id] : undefined;
}

export function sampleReportToDecisionReport(sample: Sample, id = createReportId()): DecisionReport {
  const cached = SAMPLE_REPORTS[sample.id];
  const category: ProductCategory = sample.id === "laptop-probook" ? "computing" : sample.id === "smart-tv-55" ? "other" : "solar_power";
  const marketAverage = sample.id === "laptop-probook" ? 850000 : sample.id === "smart-tv-55" ? 700000 : 920000;
  const differencePercent = sample.id === "laptop-probook" ? -8.2 : sample.id === "smart-tv-55" ? -7.1 : -7.6;
  const fairPriceRange: [number, number] = sample.id === "laptop-probook" ? [700000, 950000] : sample.id === "smart-tv-55" ? [580000, 780000] : [780000, 950000];
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
      marketAverage,
      differencePercent,
      fairPriceRange,
      verdict: "fair",
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
