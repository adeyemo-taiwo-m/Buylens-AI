export type AnalysisTooltipItem = {
  text: string;
  why: string;
};

export const ANALYSIS_PREVIEW_DATA = {
  product: {
    name: "5kVA Hybrid Inverter + 5kWh Lithium Battery",
    category: "Solar power purchase report",
    price: 850000,
    score: 68,
    verdict: "Worth considering",
    summary:
      "The quoted price appears competitive, but battery warranty and cycle-life details need verification before payment.",
  },
  promising: {
    title: "What's promising",
    items: [
      {
        text: "Competitive quoted price",
        why: "Below the typical range for similar 5kVA + 5kWh systems.",
      },
      {
        text: "Suitable stated capacity",
        why: "5kWh of storage can run lights, fans, a TV and a fridge for several hours.",
      },
    ] satisfies AnalysisTooltipItem[],
  },
  risks: {
    title: "Risks to verify",
    items: [
      {
        text: "Battery warranty coverage",
        why: "The quote doesn't say what the battery warranty includes or how long it lasts.",
      },
      {
        text: "Possible installation costs",
        why: "Cabling, mounting and labour may be billed separately.",
      },
    ] satisfies AnalysisTooltipItem[],
  },
  questions: {
    title: "Questions to ask the seller",
    items: [
      "What exactly does the battery warranty cover?",
      "Is installation and cabling included in the price?",
    ],
  },
} as const;

export const PLAY_ONCE = true;
