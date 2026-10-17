import type { AnalyzeCategory } from "@/components/analyze/analyze.data";

export type Sample = {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: "NGN";
  listingUrl: string;
  sellerName: string;
  description: string;
  useCase: string;
  budget: number;
  notes: string;
  hint: string;
  expectedTone: "positive" | "neutral" | "negative";
  imageUrl: string;
};

export const SAMPLE_CATEGORY: AnalyzeCategory = "solar-power";

export const SAMPLES: readonly Sample[] = [
  {
    id: "inverter-5kva",
    title: "5kVA Hybrid Inverter + 5kWh Lithium Battery",
    category: "Solar & Power",
    price: 850000,
    currency: "NGN",
    listingUrl: "https://www.jiji.ng/test-listing/5kva-hybrid-inverter-5kwh-lithium-battery",
    sellerName: "Jiji.ng, Lagos",
    description: "5kVA hybrid solar inverter with 5kWh lithium battery. Pure sine wave, wall-mounted, suitable for home or small office. Can power fridge, TV, fans, lights, laptops and a small AC for a few hours. Supports solar panel input and grid charging. Brand new, ready stock in Lagos. Price: ₦850,000. Delivery available. Call or WhatsApp to order.",
    useCase: "A 3-bedroom flat: fridge, freezer, TV, fans, lights, laptops, and occasionally a 1HP AC.",
    budget: 900000,
    notes: "The seller hasn't mentioned warranty or installation cost.",
    hint: "Promising, but warranty and installation need confirming.",
    expectedTone: "positive",
    imageUrl: "/analysis/solar.png",
  },
  {
    id: "solar-kit-too-good",
    title: "Complete 10kVA Solar Power System, Brand New, Original",
    category: "Solar & Power",
    price: 450000,
    currency: "NGN",
    listingUrl: "https://www.jiji.ng/test-listing/10kva-complete-solar-system-cheap",
    sellerName: "Quick Deals Lagos (new seller)",
    description: "Complete 10kVA solar system, original and brand new. Cheapest price in Lagos! Can run everything in your house including multiple ACs. Limited stock, price will increase soon. Pay 100% now to secure yours. No refund after payment. Call or WhatsApp now.",
    useCase: "Whole house: 4 ACs, freezers, pumping machine, lights and TVs.",
    budget: 700000,
    notes: "Seller is asking for full payment before delivery and has no shop address.",
    hint: "Looks too good to be true. See how BuyLens flags red flags.",
    expectedTone: "negative",
    imageUrl: "/analysis/solar.png",
  },
  {
    id: "inverter-documented",
    title: "Felicity Solar 5kVA 48V Hybrid Inverter with 10kWh LiFePO4 Battery",
    category: "Solar & Power",
    price: 1650000,
    currency: "NGN",
    listingUrl: "https://www.jiji.ng/test-listing/felicity-5kva-hybrid-10kwh-lifepo4",
    sellerName: "Authorised solar dealer, Ikeja, Lagos",
    description: "Felicity Solar 5kVA 48V hybrid inverter paired with a 10kWh LiFePO4 rack battery (6,000-cycle rated at 80% DoD). Includes MPPT charge controller, WiFi monitoring, mounting kit and cabling. Price includes professional installation within Lagos. 5-year written warranty on the inverter and 5 years on the battery, with a warranty card and receipt issued on purchase. Showroom open Monday to Saturday for inspection.",
    useCase: "A small office and home: 2 ACs, freezer, computers, router, security lights, water pump.",
    budget: 1800000,
    notes: "I want a seller with a physical showroom, a written warranty and installation included.",
    hint: "A well-documented listing. See what a low-risk report looks like.",
    expectedTone: "positive",
    imageUrl: "/analysis/solar.png",
  },
] as const;

export function getSampleById(id: string | undefined): Sample | undefined {
  return SAMPLES.find((sample) => sample.id === id);
}
