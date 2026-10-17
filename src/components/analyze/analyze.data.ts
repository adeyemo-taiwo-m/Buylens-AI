export const ANALYZE_COPY = {
  badge: "PURCHASE ANALYSIS",
  headlineLead: "Let's look closer ",
  headlineAccent: "before you buy.",
  subtext: "Tell us what you're considering, and Buylens will help you decide.",
  productLabel: "Product name or description",
  productPlaceholder: "e.g. Samsung Galaxy A56 5G 256GB",
  priceLabel: "Price",
  pricePlaceholder: "e.g. ₦650,000",
  budgetLabel: "Budget (Optional)",
  budgetPlaceholder: "e.g. ₦550,000",
  linkLabel: "Product link",
  linkPlaceholder: "e.g. https://example.com/product-page",
  categoryLabel: "Category (optional)",
  categoryPlaceholder: "Select a category",
  usageLabel: "What will you use this product for?",
  usagePlaceholder: "e.g. Powering my home during outages, including a fridge and TV.",
  prioritiesLabel: "What matters most to you?",
  dropzonePrompt: "Drag your image here or",
  dropzoneBrowse: "browse",
  dropzoneHint: "Support JPEG and PNG",
  dropzoneAria: "Upload an image. Drag and drop or press Enter to browse. JPEG or PNG",
  dropzoneDragPrompt: "Drop your image to upload",
  dropzoneError: "Use a JPEG or PNG under 5MB.",
  removeImage: "Remove",
  analyzeButton: "Analyze a purchase",
  usageCounter: (count: number) => `${count}/300`,
  requiredError: "Add a product name or link to continue.",
  priceError: "Enter a valid price.",
  linkError: "Enter a valid link.",
  usageError: "Keep your description to 300 characters or fewer.",
  errorSummary: (count: number) => `${count} ${count === 1 ? "field needs" : "fields need"} attention.`,
} as const;

export const ANALYZE_CATEGORIES = [
  { value: "phones-tablets", label: "Phones & Tablets" },
  { value: "laptops-computers", label: "Laptops & Computers" },
  { value: "solar-power", label: "Solar & Power" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "tvs-electronics", label: "TVs & Electronics" },
  { value: "vehicles-parts", label: "Vehicles & Parts" },
  { value: "fashion-accessories", label: "Fashion & Accessories" },
  { value: "other", label: "Other" },
] as const;

export const ANALYZE_PRIORITIES = [
  { value: "performance", label: "Performance" },
  { value: "durability", label: "Durability" },
  { value: "warranty-support", label: "Warranty & support" },
  { value: "energy-efficiency", label: "Energy efficiency" },
  { value: "long-term-value", label: "Long-term value" },
] as const;

export type AnalyzeCategory = (typeof ANALYZE_CATEGORIES)[number]["value"] | "";
export type AnalyzePriority = (typeof ANALYZE_PRIORITIES)[number]["value"];

export const API_CATEGORY_BY_ANALYZE_CATEGORY: Record<Exclude<AnalyzeCategory, "">, string> = {
  "phones-tablets": "smartphones",
  "laptops-computers": "computing",
  "solar-power": "solar_power",
  "home-appliances": "appliances",
  "tvs-electronics": "other",
  "vehicles-parts": "other",
  "fashion-accessories": "other",
  other: "other",
};
