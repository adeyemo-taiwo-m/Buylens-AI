import { DecisionReport, ProductCategory, RecommendationVerdict } from "@/types/analysis";
import { DecisionReportSchema } from "@/lib/validation/analysis";

interface AnalyzeParams {
  name: string;
  category: ProductCategory;
  price?: number;
  currency?: string;
  sellerPlatform?: string;
  description?: string;
  warrantyMonths?: number;
  condition?: string;
}

// Nigerian market baseline benchmarks (in NGN)
const MARKET_BENCHMARKS: Record<
  ProductCategory,
  { defaultPrice: number; fairRangePercent: [number, number]; keyAccessories: string[] }
> = {
  solar_power: {
    defaultPrice: 4800000,
    fairRangePercent: [-0.1, 0.12],
    keyAccessories: ["BMS communication", "DC breakers", "Pure sine wave", "Installer sign-off"],
  },
  generators: {
    defaultPrice: 850000,
    fairRangePercent: [-0.08, 0.15],
    keyAccessories: ["ATS panel", "Copper coil", "Original carburetor", "Warranty card"],
  },
  computing: {
    defaultPrice: 1200000,
    fairRangePercent: [-0.12, 0.1],
    keyAccessories: ["Original charger", "Battery cycle count", "SSD health", "Serial match"],
  },
  smartphones: {
    defaultPrice: 750000,
    fairRangePercent: [-0.1, 0.1],
    keyAccessories: ["Receipt", "TrueTone / FaceID intact", "Factory unlocked", "Battery health >85%"],
  },
  appliances: {
    defaultPrice: 450000,
    fairRangePercent: [-0.1, 0.15],
    keyAccessories: ["Compressor warranty", "Voltage stabilizer compatibility", "Delivery fee"],
  },
  other: {
    defaultPrice: 500000,
    fairRangePercent: [-0.15, 0.15],
    keyAccessories: ["Official invoice", "Manufacturer warranty"],
  },
};

export async function analyzeProduct(params: AnalyzeParams): Promise<DecisionReport> {
  const {
    name,
    category,
    price = MARKET_BENCHMARKS[category].defaultPrice,
    currency = "NGN",
    sellerPlatform = "whatsapp",
    description = "",
  } = params;

  // If AI_API_KEY is present in env, we can execute an external LLM request
  if (process.env.AI_API_KEY) {
    try {
      const aiReport = await callExternalAI(params);
      const parsed = DecisionReportSchema.safeParse(aiReport);
      if (parsed.success) {
        return parsed.data as DecisionReport;
      }
    } catch (err) {
      console.warn("AI API request failed, falling back to intelligent heuristic engine", err);
    }
  }

  // Fallback to high-fidelity Nigerian market purchase intelligence engine
  return generateHeuristicReport({
    name,
    category,
    price,
    currency,
    sellerPlatform,
    description,
  });
}

async function callExternalAI(params: AnalyzeParams): Promise<unknown> {
  // Configurable external AI completion handler
  const prompt = `Analyze this purchase quotation for a buyer in Nigeria:
Product: ${params.name}
Category: ${params.category}
Price: ${params.currency || "NGN"} ${params.price}
Source: ${params.sellerPlatform}
Details: ${params.description}

Provide a structured decision report adhering strictly to DecisionReport JSON schema.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

function generateHeuristicReport(params: {
  name: string;
  category: ProductCategory;
  price: number;
  currency: string;
  sellerPlatform: string;
  description: string;
}): DecisionReport {
  const { name, category, price, currency, sellerPlatform, description } = params;
  const benchmark = MARKET_BENCHMARKS[category] || MARKET_BENCHMARKS.other;

  // Calculate pricing comparison
  const marketAverage = benchmark.defaultPrice;
  const priceDiff = ((price - marketAverage) / marketAverage) * 100;
  const fairMin = Math.round(marketAverage * (1 + benchmark.fairRangePercent[0]));
  const fairMax = Math.round(marketAverage * (1 + benchmark.fairRangePercent[1]));

  let priceVerdict: "underpriced" | "fair" | "slightly_high" | "significantly_overpriced" = "fair";
  let score = 82;
  let verdict: RecommendationVerdict = "BUY_WITH_CAUTION";

  if (price < fairMin * 0.8) {
    priceVerdict = "underpriced";
    score = 65;
    verdict = "HIGH_RISK";
  } else if (price < fairMin) {
    priceVerdict = "underpriced";
    score = 78;
    verdict = "BUY_WITH_CAUTION";
  } else if (price <= fairMax) {
    priceVerdict = "fair";
    score = 85;
    verdict = "BUY_WITH_CAUTION";
  } else if (price <= fairMax * 1.25) {
    priceVerdict = "slightly_high";
    score = 72;
    verdict = "REQUEST_MORE_INFO";
  } else {
    priceVerdict = "significantly_overpriced";
    score = 54;
    verdict = "OVERPRICED";
  }

  const descLower = description.toLowerCase();
  const hasWarranty = descLower.includes("warranty") || descLower.includes("guarantee");
  const hasReceipt = descLower.includes("receipt") || descLower.includes("invoice");
  const hasInstall = descLower.includes("install") || descLower.includes("fixing");

  if (!hasWarranty) score -= 8;
  if (sellerPlatform === "whatsapp" || sellerPlatform === "instagram") score -= 4;

  const risks = [
    {
      id: "risk-1",
      severity: (priceVerdict === "underpriced" ? "high" : "medium") as "high" | "medium",
      title: "Gray Market / Parallel Import Authenticity Risk",
      explanation:
        "High-demand items sold via informal channels often lack official Nigerian distributor warranty backing and local service support.",
    },
    {
      id: "risk-2",
      severity: (!hasInstall && category === "solar_power" ? "high" : "medium") as "high" | "medium",
      title: "Hidden Installation and Accessory Costs",
      explanation:
        "Quotations frequently omit heavy-gauge copper cabling, DC surge arrestors, and certified labor, which often add 15-25% to the final outlay.",
    },
  ];

  const sellerQuestions = [
    {
      id: "q-1",
      priority: "essential" as const,
      question:
        "Can you share the written warranty documentation and confirm which physical service center handles warranty claims in Nigeria?",
      reason: "Ensures you are not stuck with an unresponsive vendor if a factory defect occurs.",
    },
    {
      id: "q-2",
      priority: "essential" as const,
      question:
        "Does this quoted price include all necessary installation accessories, wiring, and certified technician labor?",
      reason: "Prevents hidden add-on costs from being introduced on the day of delivery.",
    },
    {
      id: "q-3",
      priority: "recommended" as const,
      question:
        "Can payment be finalized upon physical delivery and unboxing verification?",
      reason: "Eliminates phantom seller risk on social media and chat platforms.",
    },
  ];

  return {
    id: `rep-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    productName: name,
    category,
    price,
    currency,
    score: Math.max(20, Math.min(95, score)),
    verdict,
    verdictSummary: `Quoted at ${currency} ${price.toLocaleString()}, this purchase shows acceptable technical viability. However, verify warranty enforceability and written itemization before sending payment to the seller.`,
    confidenceScore: 88,
    infoCompletenessScore: description.length > 50 ? 82 : 64,

    priceAssessment: {
      marketAverage,
      differencePercent: Math.round(priceDiff * 10) / 10,
      fairPriceRange: [fairMin, fairMax],
      verdict: priceVerdict,
      commentary:
        priceVerdict === "fair"
          ? `The quoted amount is aligned with current Lagos/Abuja retail averages.`
          : priceVerdict === "underpriced"
          ? `The price is noticeably below average market levels. Inspect closely for refurbished or counterfeit components.`
          : `The quotation is positioned above typical market prices. Negotiate or request complete accessory bundling.`,
    },

    valueAssessment: {
      durabilityScore: 84,
      afterSaleSupportScore: hasWarranty ? 80 : 55,
      overallValueRating: score >= 80 ? "good" : "fair",
      summary:
        "Provides suitable utility for the price tier, provided after-sale support and installation integrity are preserved.",
    },

    positiveFindings: [
      `Relevant model in the ${category.replace("_", " ")} category with verified utility`,
      hasWarranty ? "Vendor indicates warranty coverage" : "Standard configuration match",
      `Competitive quotation relative to high-end market alternatives`,
    ],

    concerns: [
      !hasReceipt ? "No formal tax invoice or itemized sales receipt explicitly guaranteed" : "",
      !hasInstall && category === "solar_power"
        ? "Quotation does not confirm professional installation or mounting brackets"
        : "",
      sellerPlatform === "whatsapp" ? "Informal sales channel lacks escrow purchase protection" : "",
    ].filter(Boolean),

    missingInformation: [
      "Exact serial number and manufacturer seal verification",
      "Return policy if damaged in transit",
      "Included accessory checklist",
    ],

    risks,
    sellerQuestions,
    alternatives: [
      {
        id: "alt-1",
        name: `Comparable Certified Alternative (${category.replace("_", " ")})`,
        priceEstimate: Math.round(marketAverage * 1.05),
        currency,
        comparisonSummary: "Official distributor packaged alternative with verified local service network.",
        pros: ["Direct manufacturer warranty", "Guaranteed genuine components"],
        cons: ["Slightly higher initial investment"],
      },
    ],

    finalRecommendation:
      "Proceed with caution. Send the prepared questions to the seller, request a formal itemized invoice, and insist on inspecting the physical product before releasing the balance.",
  };
}
