export type HowStepId = "product" | "priorities" | "report";

export type HowStep = {
  id: HowStepId;
  number: string;
  title: string;
  description: string;
};

export const HOW_STEPS: HowStep[] = [
  {
    id: "product",
    number: "01",
    title: "Choose a product",
    description: "Paste a link or search for what you're thinking of buying.",
  },
  {
    id: "priorities",
    number: "02",
    title: "Set priorities",
    description: "A product's value depends on the person buying it.",
  },
  {
    id: "report",
    number: "03",
    title: "Get your report",
    description: "See the strengths, trade-offs and a clear verdict, based on your priorities.",
  },
];

export const HOW_PIN_DISTANCE = "300vh";
export const HOW_BANDS = [1 / 6, 1 / 2, 5 / 6] as const;
export const HOW_ASSETS = {
  // Replace with /how-it-works/headphone-blue.webp when the Figma export is supplied.
  headphone: "/problem/headset.png",
} as const;
