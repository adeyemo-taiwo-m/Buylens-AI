import { z } from "zod";

export const ProductInputSchema = z.object({
  name: z.string().min(2, "Product name is required (min 2 characters)"),
  category: z.enum([
    "solar_power",
    "computing",
    "smartphones",
    "appliances",
    "generators",
    "other",
  ]),
  price: z.number().positive("Price must be a positive number").optional(),
  currency: z.string().default("NGN"),
  sellerName: z.string().optional(),
  sellerPlatform: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  warrantyMonths: z.number().nonnegative().optional(),
  condition: z.enum(["brand_new", "foreign_used", "refurbished", "locally_used"]).optional(),
});

export const DecisionReportSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  productName: z.string(),
  category: z.string(),
  price: z.number(),
  currency: z.string(),
  score: z.number().min(0).max(100),
  verdict: z.enum([
    "STRONG_BUY",
    "BUY_WITH_CAUTION",
    "REQUEST_MORE_INFO",
    "OVERPRICED",
    "HIGH_RISK",
    "DO_NOT_BUY",
  ]),
  verdictSummary: z.string(),
  confidenceScore: z.number().min(0).max(100),
  infoCompletenessScore: z.number().min(0).max(100),

  priceAssessment: z.object({
    marketAverage: z.number(),
    differencePercent: z.number(),
    fairPriceRange: z.tuple([z.number(), z.number()]),
    verdict: z.enum(["underpriced", "fair", "slightly_high", "significantly_overpriced"]),
    commentary: z.string(),
  }),

  valueAssessment: z.object({
    durabilityScore: z.number(),
    afterSaleSupportScore: z.number(),
    overallValueRating: z.enum(["poor", "fair", "good", "excellent"]),
    summary: z.string(),
  }),

  positiveFindings: z.array(z.string()),
  concerns: z.array(z.string()),
  missingInformation: z.array(z.string()),
  risks: z.array(
    z.object({
      id: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      title: z.string(),
      explanation: z.string(),
    })
  ),
  sellerQuestions: z.array(
    z.object({
      id: z.string(),
      priority: z.enum(["essential", "recommended", "optional"]),
      question: z.string(),
      reason: z.string(),
    })
  ),
  alternatives: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      priceEstimate: z.number(),
      currency: z.string(),
      comparisonSummary: z.string(),
      pros: z.array(z.string()),
      cons: z.array(z.string()),
    })
  ),
  finalRecommendation: z.string(),
});
