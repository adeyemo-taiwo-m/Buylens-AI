export type RecommendationVerdict =
  | "STRONG_BUY"
  | "BUY_WITH_CAUTION"
  | "REQUEST_MORE_INFO"
  | "OVERPRICED"
  | "HIGH_RISK"
  | "DO_NOT_BUY";

export type ProductCategory =
  | "solar_power"
  | "computing"
  | "smartphones"
  | "appliances"
  | "generators"
  | "other";

export interface ProductInput {
  name: string;
  category: ProductCategory;
  price?: number;
  currency?: string;
  sellerName?: string;
  sellerPlatform?: string;
  location?: string;
  description?: string;
  specifications?: Record<string, string>;
  warrantyMonths?: number;
  condition?: "brand_new" | "foreign_used" | "refurbished" | "locally_used";
  images?: string[];
}

export interface RiskFactor {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  explanation: string;
}

export interface SellerQuestion {
  id: string;
  priority: "essential" | "recommended" | "optional";
  question: string;
  reason: string;
}

export interface AlternativeOption {
  id: string;
  name: string;
  priceEstimate: number;
  currency: string;
  comparisonSummary: string;
  pros: string[];
  cons: string[];
}

export interface DecisionReport {
  id: string;
  createdAt: string;
  productName: string;
  category: ProductCategory;
  price: number;
  currency: string;
  score: number; // 0 - 100
  verdict: RecommendationVerdict;
  verdictSummary: string;
  confidenceScore: number; // 0 - 100
  infoCompletenessScore: number; // 0 - 100

  priceAssessment: {
    marketAverage: number;
    differencePercent: number;
    fairPriceRange: [number, number];
    verdict: "underpriced" | "fair" | "slightly_high" | "significantly_overpriced";
    commentary: string;
  };

  valueAssessment: {
    durabilityScore: number;
    afterSaleSupportScore: number;
    overallValueRating: "poor" | "fair" | "good" | "excellent";
    summary: string;
  };

  positiveFindings: string[];
  concerns: string[];
  missingInformation: string[];
  risks: RiskFactor[];
  sellerQuestions: SellerQuestion[];
  alternatives: AlternativeOption[];
  finalRecommendation: string;
}
