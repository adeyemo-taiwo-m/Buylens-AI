import { DecisionReport } from "@/types/analysis";

export const DEMO_SOLAR_REPORT: DecisionReport = {
  id: "rep-demo-solar",
  createdAt: new Date().toISOString(),
  productName: "5kVA Hybrid Inverter + 5kWh Lithium LiFePO4 Battery System",
  category: "solar_power",
  price: 850000,
  currency: "NGN",
  score: 82,
  verdict: "BUY_WITH_CAUTION",
  verdictSummary:
    "The price appears competitive, but important information about the battery warranty and cycle life is missing. Verify manufacturer warranty certificates before paying.",
  confidenceScore: 88,
  infoCompletenessScore: 64,

  priceAssessment: {
    marketAverage: 920000,
    differencePercent: -7.6,
    fairPriceRange: [780000, 950000],
    verdict: "fair",
    commentary:
      "At ₦850,000, this quotation sits within the expected competitive range for Grade-A 5kWh lithium setups in Lagos/Abuja markets.",
  },

  valueAssessment: {
    durabilityScore: 84,
    afterSaleSupportScore: 72,
    overallValueRating: "good",
    summary:
      "Strong technical capacity offering high cycle longevity relative to lead-acid alternatives.",
  },

  positiveFindings: [
    "Competitive price compared to retail averages",
    "Stated 5kVA pure sine wave capacity is suitable for residential essentials and pump inverters",
    "Quotation includes primary DC breakers and surge protection",
  ],

  concerns: [
    "Listing does not state verifiable battery cycle life (e.g. 3,000 vs 6,000 cycles)",
    "Warranty details are unclear on whether local repair service is authorized in Nigeria",
  ],

  missingInformation: [
    "Battery cycle life rating at 80% DoD",
    "Exact inverter model number and firmware protocol",
    "Installer certification and scope of installation labor",
  ],

  risks: [
    {
      id: "risk-1",
      severity: "medium",
      title: "Warranty Scope Unverified",
      explanation:
        "Informal vendor quotation lacks written confirmation of local RMA processing if cells need balancing.",
    },
    {
      id: "risk-2",
      severity: "medium",
      title: "Possible Installation Surcharge",
      explanation:
        "Quotations frequently omit heavy copper DC cables and mounting brackets, which can add ₦80,000–₦150,000.",
    },
  ],

  sellerQuestions: [
    {
      id: "q-1",
      priority: "essential",
      question: "What is the battery's cycle life rating at 80% Depth of Discharge?",
      reason: "Ensures you are receiving Grade-A prismatic cells that will last 8–10 years.",
    },
    {
      id: "q-2",
      priority: "essential",
      question: "What exactly does the warranty cover, and where is the physical service center located in Nigeria?",
      reason: "Protects against store-only verbal promises that cannot be redeemed if a fault occurs.",
    },
    {
      id: "q-3",
      priority: "essential",
      question: "Is professional installation, testing, and cabling included in the ₦850,000 quote?",
      reason: "Prevents surprise accessory and labor costs on installation day.",
    },
    {
      id: "q-4",
      priority: "recommended",
      question: "What exact model number is the inverter, and does it support closed-loop CAN/RS485 BMS communication?",
      reason: "Critical for battery longevity and automated overcharge protection.",
    },
  ],

  alternatives: [
    {
      id: "alt-b",
      name: "Solar System B (Growatt 5kVA + Dyness 4.8kWh)",
      priceEstimate: 790000,
      currency: "NGN",
      comparisonSummary:
        "Slightly lower price with widespread local technician availability across Nigeria.",
      pros: ["₦60,000 cheaper", "Readily available local spare parts"],
      cons: ["Higher fan noise under sustained 4kW+ load"],
    },
    {
      id: "alt-c",
      name: "Solar System C (DeYe 5kVA Hybrid + Shoto 5.12kWh)",
      priceEstimate: 920000,
      currency: "NGN",
      comparisonSummary:
        "Option C scores higher because it offers a 5-year verifiable warranty and superior mobile app monitoring, but costs ₦70,000 more.",
      pros: ["5-year local warranty", "IP65 rated with superior mobile telemetry"],
      cons: ["₦70,000 premium over current quote"],
    },
  ],

  finalRecommendation:
    "Worth considering. The price is attractive, but verify the battery warranty card and confirm whether copper cabling is included before releasing any deposit.",
};

export const DEMO_MACBOOK_REPORT: DecisionReport = {
  id: "rep-demo-macbook",
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  productName: "Apple MacBook Pro 16\" M3 Pro (18GB Unified Memory, 512GB SSD)",
  category: "computing",
  price: 2400000,
  currency: "NGN",
  score: 91,
  verdict: "STRONG_BUY",
  verdictSummary:
    "Excellent quotation for foreign-used Grade-A stock. Serial number verifies genuine AppleCare coverage, battery cycle count is under 45, and price is 12% below Computer Village retail floor.",
  confidenceScore: 95,
  infoCompletenessScore: 92,

  priceAssessment: {
    marketAverage: 2750000,
    differencePercent: -12.7,
    fairPriceRange: [2350000, 2850000],
    verdict: "fair",
    commentary:
      "At ₦2,400,000, this quotation is an outstanding deal compared to average retail rates in Ikeja/Computer Village.",
  },

  valueAssessment: {
    durabilityScore: 94,
    afterSaleSupportScore: 90,
    overallValueRating: "excellent",
    summary:
      "M3 Pro architecture provides exceptional longevity and industry-leading performance-per-watt for software engineering and creative work.",
  },

  positiveFindings: [
    "Battery health reported at 98% with 42 total cycles",
    "Includes authentic Apple 140W USB-C Power Adapter and braided MagSafe 3 cable",
    "Clean MDM/iCloud lock check verified",
  ],

  concerns: [
    "Foreign-used status means initial 1-year consumer warranty has expired; relies on remaining AppleCare window",
  ],

  missingInformation: [
    "Original purchase receipt or proof of legal import clearance",
  ],

  risks: [
    {
      id: "risk-mac-1",
      severity: "low",
      title: "Keyboard Layout Regional Difference",
      explanation: "Verify whether the keyboard has US ANSI or UK/EU ISO return key layout.",
    },
  ],

  sellerQuestions: [
    {
      id: "q-mac-1",
      priority: "essential",
      question: "Can we test the device with a fresh Apple ID login and verify MDM profiles before payment?",
      reason: "Ensures the laptop is not enrolled in corporate remote management locks.",
    },
  ],

  alternatives: [
    {
      id: "alt-mac-1",
      name: "MacBook Pro 14\" M3 (16GB, 512GB)",
      priceEstimate: 2150000,
      currency: "NGN",
      comparisonSummary: "More compact footprint with ₦250,000 savings if 16-inch screen is not required.",
      pros: ["More portable", "Lower cost"],
      cons: ["Fewer GPU cores, smaller display"],
    },
  ],

  finalRecommendation:
    "Strong Buy. Ensure you verify the device in person, run Apple Diagnostics (hold D on power up), and pay upon successful handoff.",
};

export const DEMO_GENERATOR_REPORT: DecisionReport = {
  id: "rep-demo-generator",
  createdAt: new Date(Date.now() - 172800000).toISOString(),
  productName: "Firman 3.5kVA Key-Start Petrol Generator (Eco Series)",
  category: "generators",
  price: 650000,
  currency: "NGN",
  score: 68,
  verdict: "REQUEST_MORE_INFO",
  verdictSummary:
    "Quotation is priced suspiciously close to non-key-start manual models. High prevalence of counterfeit Firman alternators in the open market requires verifying copper vs aluminum winding.",
  confidenceScore: 82,
  infoCompletenessScore: 58,

  priceAssessment: {
    marketAverage: 740000,
    differencePercent: -12.1,
    fairPriceRange: [680000, 780000],
    verdict: "underpriced",
    commentary:
      "At ₦650,000, the price is below genuine distributor wholesale. Request verification of authentic Firman serial hologram.",
  },

  valueAssessment: {
    durabilityScore: 70,
    afterSaleSupportScore: 65,
    overallValueRating: "fair",
    summary:
      "If authentic 100% copper coil, unit offers dependable backup power. Aluminum wound counterfeits fail within 6 months of continuous load.",
  },

  positiveFindings: [
    "Key-start electric ignition module includes battery",
    "Sufficient starting wattage for 1.5HP inverter AC and deep freezer",
  ],

  concerns: [
    "Price is ~12% lower than authorized Sumec Firman distributors in Lagos",
    "Quotation does not confirm 100% copper stator/rotor winding",
  ],

  missingInformation: [
    "Confirmation of 100% copper wire coil versus copper-clad aluminum",
    "Authorized distributor seal and physical warranty booklet",
  ],

  risks: [
    {
      id: "risk-gen-1",
      severity: "high",
      title: "Counterfeit Alternator Winding Risk",
      explanation: "Aluminum coil alternators overheat and melt under sustained load in high Nigerian ambient temperatures.",
    },
  ],

  sellerQuestions: [
    {
      id: "q-gen-1",
      priority: "essential",
      question: "Is the alternator 100% pure copper coil or copper-coated aluminum?",
      reason: "Aluminum coils burn out rapidly under typical Nigerian electrical loads.",
    },
    {
      id: "q-gen-2",
      priority: "essential",
      question: "Can I inspect the Sumec Firman genuine security seal and hologram on the engine block?",
      reason: "Protects against clone generators sold with counterfeit stickers.",
    },
  ],

  alternatives: [
    {
      id: "alt-gen-1",
      name: "Elepaq Constant 4.5kVA Key-Start (Pure Copper)",
      priceEstimate: 580000,
      currency: "NGN",
      comparisonSummary: "Budget alternative with genuine copper winding and widespread local parts.",
      pros: ["₦70,000 savings", "Simple carburetor maintenance"],
      cons: ["Higher fuel consumption per hour"],
    },
  ],

  finalRecommendation:
    "Investigate further before paying. Verify the genuine Sumec Firman hologram and insist on written guarantee of 100% copper coil.",
};

export const INITIAL_DEMO_REPORTS: DecisionReport[] = [
  DEMO_SOLAR_REPORT,
  DEMO_MACBOOK_REPORT,
  DEMO_GENERATOR_REPORT,
];
