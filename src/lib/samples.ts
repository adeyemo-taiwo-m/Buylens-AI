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
    id: "laptop-probook",
    title: "HP ProBook 440 G10 Core i5, 16GB RAM, 512GB SSD",
    category: "Laptops & Computers",
    price: 780000,
    currency: "NGN",
    listingUrl: "https://www.jiji.ng/test-listing/hp-probook-440-g10-core-i5-16gb-512gb",
    sellerName: "Computer Village, Ikeja",
    description: "HP ProBook 440 G10 with Intel Core i5 processor, 16GB RAM and 512GB SSD. 14-inch Full HD display, backlit keyboard and Windows installed. Brand new, ready stock in Lagos. Price: ₦780,000. Delivery available. Call or WhatsApp to order.",
    useCase: "Remote work, browsing, video calls, documents, spreadsheets and light creative work.",
    budget: 850000,
    notes: "The listing does not confirm battery health or the length of the warranty.",
    hint: "Good everyday specifications, but verify battery health and warranty coverage.",
    expectedTone: "positive",
    imageUrl: "/main-laptop.webp",
  },
  {
    id: "smart-tv-55",
    title: "55-inch 4K UHD Smart LED TV with 3-Year Warranty",
    category: "TVs & Electronics",
    price: 650000,
    currency: "NGN",
    listingUrl: "https://www.jiji.ng/test-listing/55-inch-4k-smart-led-tv-warranty",
    sellerName: "Trusted Electronics Store, Lagos",
    description: "55-inch 4K UHD smart LED TV with built-in streaming apps, three HDMI ports, Wi-Fi and a one-year manufacturer warranty. Brand new, boxed and ready for delivery in Lagos. Price: ₦650,000. Inspection available before delivery.",
    useCase: "A living room for streaming, sports, movies, news and console gaming.",
    budget: 700000,
    notes: "The listing does not explain the panel inspection process or the warranty claim procedure.",
    hint: "Good features for the price, but confirm panel condition and warranty terms.",
    expectedTone: "neutral",
    imageUrl: "/analysis/solar.png",
  },
] as const;

export function getSampleById(id: string | undefined): Sample | undefined {
  return SAMPLES.find((sample) => sample.id === id);
}
