export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqEntry[] = [
  {
    id: "what-is-buylens-ai",
    question: "What is BuyLens AI?",
    // TODO: Replace this placeholder answer with approved product copy.
    answer:
      "BuyLens AI is a purchase-analysis tool that helps you decide whether a product is worth buying by breaking it down into a clear verdict, potential risks, and questions to ask the seller.",
  },
  {
    id: "how-buylens-decides",
    question: "How does BuyLens decide whether a product is worth buying?",
    answer:
      "BuyLens analyzes the information you provide, such as the product details, quoted price, intended use, and priorities when available. It uses that information to generate a structured assessment. The verdict is a decision aid, not a guarantee that a product is good or bad.",
  },
  {
    id: "information-to-start",
    question: "What information do I need to get started?",
    // TODO: Replace this placeholder answer with approved product copy.
    answer:
      "Share the product name or link, the price you were quoted, how you plan to use it, and any priorities you have, such as budget, capacity or warranty. The more you provide, the sharper the analysis.",
  },
  {
    id: "seller-or-product-trust",
    question: "Can BuyLens tell me if a seller or product is trustworthy?",
    // TODO: Replace this placeholder answer with approved product copy.
    answer:
      "BuyLens highlights risks and the questions worth asking, but it can't verify a seller's identity or guarantee a product's quality. Treat it as a decision aid and confirm key details before you pay.",
  },
];

export const DEFAULT_FAQ_ID = FAQ_ITEMS[1].id;
