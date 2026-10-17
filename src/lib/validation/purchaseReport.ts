import { z } from "zod";

export const PurchaseReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  imageUrl: z.string(),
  analyzedAt: z.string(),
  quotedPrice: z.number().nonnegative(),
  currency: z.literal("NGN"),
  buyScore: z.number().min(0).max(100),
  scoreLabel: z.string(),
  scoreTone: z.enum(["positive", "neutral", "negative"]),
  risk: z.object({
    level: z.enum(["Low", "Medium", "High"]),
    note: z.string(),
  }),
  verdict: z.object({
    title: z.string(),
    body: z.string(),
  }),
  promising: z.array(z.string()),
  verifyFirst: z.array(z.string()),
  sellerQuestions: z.array(z.string()),
  evidence: z.array(
    z.object({
      label: z.string(),
      source: z.string().optional(),
      note: z.string().optional(),
    })
  ),
  nextSteps: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

export type PurchaseReport = z.infer<typeof PurchaseReportSchema>;
