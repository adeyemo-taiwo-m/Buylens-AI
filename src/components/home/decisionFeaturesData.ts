export type ReportAccordionRow = {
  id: string;
  title: string;
  status: "success" | "warning" | "info";
  bullets: string[];
};

export const REPORT_ACCORDION_ROWS: ReportAccordionRow[] = [
  {
    id: "battery",
    title: "Wireless headphones",
    status: "success",
    bullets: ["Long battery life (up to 40 hours)", "Long battery life (up to 40 hours)"],
  },
  {
    id: "comfort",
    title: "Trade-off and limitations",
    status: "warning",
    bullets: ["Comfort reviews are mixed on long wear", "Bulkier than similar models"],
  },
  {
    id: "durability",
    title: "Things to verify before buying",
    status: "info",
    bullets: ["Check the return policy before buying", "Confirm warranty coverage in your region"],
  },
];

export const DECISION_FEATURES = {
  selectedFeatures: ["Battery life", "Comfort"],
  secondaryFeatures: ["aptX", "40mm Driver"],
  historyItems: [
    { id: "current", title: "Wireless Headphone", detail: "A product you are considering" },
    { id: "previous", title: "Wireless Headphone", detail: "A product you are considering" },
    { id: "older", title: "Wireless Headphone", detail: "A product you are considering" },
  ],
  historyProducts: [
    { id: "headphones", src: "/problem/headset.png", title: "Wireless Headphone", detail: "A product you are considering" },
    { id: "laptop", src: "/main-laptop.png", title: "HP Laptop", detail: "A product you are considering" },
  ],
} as const;
