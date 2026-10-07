import { DecisionReport } from "@/types/analysis";

export const DEMO_SOLAR_REPORT: DecisionReport = {
  id: "rep-demo-5kva-felicity",
  createdAt: new Date().toISOString(),
  productName: "Felicity Solar 5kVA 48V Pure Sine Wave Inverter + 10kWh LiFePO4 Battery Pack",
  category: "solar_power",
  price: 4850000,
  currency: "NGN",
  score: 84,
  verdict: "BUY_WITH_CAUTION",
  verdictSummary:
    "Strong technical configuration with tier-1 cells, priced 6% below prevailing Alaba/Computer Village market rates. Proceed after verifying warranty certificates and installation guarantees directly with the distributor.",
  confidenceScore: 91,
  infoCompletenessScore: 88,

  priceAssessment: {
    marketAverage: 5150000,
    differencePercent: -5.8,
    fairPriceRange: [4700000, 5300000],
    verdict: "fair",
    commentary:
      "At ₦4,850,000, this quotation is within the lower-fair quartile for authentic Grade-A LiFePO4 48V 200Ah setups in the Lagos/Abuja market.",
  },

  valueAssessment: {
    durabilityScore: 89,
    afterSaleSupportScore: 78,
    overallValueRating: "excellent",
    summary:
      "High cycle life (estimated 6,000 cycles at 80% DoD) delivers strong long-term ROI compared to lead-acid alternatives, offsetting upfront capital costs.",
  },

  positiveFindings: [
    "Grade-A LiFePO4 prismatic cells with integrated smart BMS overcurrent protection",
    "Pure sine wave output safe for sensitive home electronics, medical gear, and pump inverters",
    "Includes communication cable for inverter-to-battery protocol synchronization",
    "Quoted price includes primary surge protection and DC breakers",
  ],

  concerns: [
    "Quotation does not clarify whether certified technician installation is included in the total",
    "Warranty terms specify '1 year store replacement, 4 years factory warranty' which may incur overseas freight delays if serviced informally",
  ],

  missingInformation: [
    "Installer certification & commissioning sign-off details",
    "Maximum continuous charge/discharge C-rate under high ambient temperature conditions (>35°C)",
    "Battery rack or mounting bracket inclusion status",
  ],

  risks: [
    {
      id: "risk-1",
      severity: "high",
      title: "Gray Market / Parallel Import Risk",
      explanation:
        "Ensure the unit has a verifiable local Felicity Solar Nigeria hologram and serial number to ensure manufacturer warranty coverage.",
    },
    {
      id: "risk-2",
      severity: "medium",
      title: "Ambient Temperature Inverter Derating",
      explanation:
        "High ambient temperature in outdoor installation setups can reduce actual continuous output from 5kVA to 4.2kVA.",
    },
  ],

  sellerQuestions: [
    {
      id: "q-1",
      priority: "essential",
      question:
        "Can you provide the verifiable Felicity Nigeria manufacturer warranty card and confirmation of local RMA processing?",
      reason:
        "Protects against parallel imports where distributor warranty is void in Nigeria.",
    },
    {
      id: "q-2",
      priority: "essential",
      question:
        "Does this total quotation include copper DC cabling, high-amp breakers, and professional installation/testing?",
      reason:
        "Additional DC accessories and labor can add ₦250,000–₦400,000 unexpected cost at installation time.",
    },
    {
      id: "q-3",
      priority: "recommended",
      question:
        "What is the exact firmware version and CAN/RS485 protocol compatibility between the inverter and BMS?",
      reason:
        "Ensures closed-loop communication works reliably without unexpected fault tripping.",
    },
  ],

  alternatives: [
    {
      id: "alt-1",
      name: "DeYe 5kVA Hybrid Inverter + Shoto 5.12kWh x 2 (10.2kWh) Stack",
      priceEstimate: 5400000,
      currency: "NGN",
      comparisonSummary:
        "Premium alternative offering superior hybrid net-metering and cloud monitoring at ~11% higher investment.",
      pros: ["Superior remote app monitoring", "IP65 weather resistant rating"],
      cons: ["Higher upfront cost (₦550,000 premium)"],
    },
    {
      id: "alt-2",
      name: "Growatt SPF 5000ES + Dyness 9.6kWh LiFePO4",
      priceEstimate: 4600000,
      currency: "NGN",
      comparisonSummary:
        "Slightly lower price tier with widespread local repair technician familiarity across Nigeria.",
      pros: ["Highly accessible local spare parts", "₦250,000 savings"],
      cons: ["Higher operational fan noise levels under full load"],
    },
  ],

  finalRecommendation:
    "Recommended to proceed with the purchase provided the seller gives written confirmation that the warranty is locally serviceable through the authorized Nigerian service center and the balance is paid upon physical delivery and serial verification.",
};
