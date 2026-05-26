export type City = {
  slug: string;
  name: string;
  state: string;
  region: "North" | "South" | "East" | "West" | "Central";
  millProfile: string;
  notableMills?: string;
  primaryGrades: string[];
  estimatedMillCount: string;
  industryNote: string;
};

export const CITIES: Record<string, City> = {
  vapi: {
    slug: "vapi",
    name: "Vapi",
    state: "Gujarat",
    region: "West",
    millProfile:
      "Vapi is one of India's densest paper manufacturing clusters with the Vapi Industrial Estate (GIDC) hosting dozens of paper, packaging, and converting units. Mills here primarily produce kraft, duplex board, and packaging-grade papers.",
    primaryGrades: ["Kraft paper", "Duplex board", "Recycled fluting", "Liner board"],
    estimatedMillCount: "60+ paper and packaging units",
    industryNote: "Heavy export-oriented cluster with strong corrugation buyer base across Gujarat and Maharashtra.",
  },
  coimbatore: {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    region: "South",
    millProfile:
      "Coimbatore is a major South Indian paper hub with mills spanning writing & printing papers, kraft, and specialty grades. The region benefits from skilled engineering talent and strong agro-residue (bagasse) availability.",
    primaryGrades: ["Writing & printing", "Kraft paper", "Bagasse-based agro paper", "Tissue"],
    estimatedMillCount: "30+ mills",
    industryNote: "Bagasse-based paper making is a regional specialty driven by neighbouring sugar industry waste.",
  },
  hoshiarpur: {
    slug: "hoshiarpur",
    name: "Hoshiarpur",
    state: "Punjab",
    region: "North",
    millProfile:
      "Hoshiarpur and the surrounding Doaba region host significant kraft paper manufacturing serving the North Indian corrugation industry. Recycled fibre availability and access to North Indian markets drive concentration here.",
    primaryGrades: ["Kraft paper", "Test liner", "Fluting medium", "Recycled paper"],
    estimatedMillCount: "40+ kraft and recycled mills",
    industryNote: "Heart of Punjab paper industry; cluster economics with shared logistics and waste paper procurement.",
  },
  khanna: {
    slug: "khanna",
    name: "Khanna",
    state: "Punjab",
    region: "North",
    millProfile:
      "Khanna and surrounding Ludhiana district form one of India's largest recycled-paper clusters. Mills here are characterized by high-volume kraft and recycled board production with tight cost discipline.",
    primaryGrades: ["Recycled kraft", "Test liner", "Duplex board", "Fluting medium"],
    estimatedMillCount: "50+ recycled paper mills",
    industryNote: "Major corrugation feeder cluster for Punjab, Haryana, and Delhi NCR industrial bases.",
  },
  yamunanagar: {
    slug: "yamunanagar",
    name: "Yamunanagar",
    state: "Haryana",
    region: "North",
    millProfile:
      "Yamunanagar hosts integrated and recycled paper mills serving North Indian packaging demand. Home to several established paper groups with multi-machine operations.",
    primaryGrades: ["Newsprint", "Writing & printing", "Kraft", "Packaging board"],
    estimatedMillCount: "20+ mills including integrated units",
    industryNote: "Mix of integrated and recycled mills; strong logistics access to Delhi NCR.",
  },
  kashipur: {
    slug: "kashipur",
    name: "Kashipur",
    state: "Uttarakhand",
    region: "North",
    millProfile:
      "Kashipur (Udham Singh Nagar district) is an emerging paper manufacturing zone with significant capacity additions over the past decade, benefiting from state industrial incentives.",
    primaryGrades: ["Kraft paper", "Writing & printing", "Specialty paper"],
    estimatedMillCount: "15+ mills",
    industryNote: "Uttarakhand industrial benefits and proximity to North India markets drive growth.",
  },
  bhopal: {
    slug: "bhopal",
    name: "Bhopal",
    state: "Madhya Pradesh",
    region: "Central",
    millProfile:
      "Bhopal and surrounding Madhya Pradesh paper mills produce primarily kraft and recycled papers serving the Central Indian industrial belt.",
    primaryGrades: ["Kraft", "Recycled", "Newsprint"],
    estimatedMillCount: "15+ mills in MP",
    industryNote: "Central India location with good rail/road access to multiple state markets.",
  },
  surat: {
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    region: "West",
    millProfile:
      "Surat and Sachin GIDC host paper and packaging mills serving the textile and diamond export industries that need premium packaging materials.",
    primaryGrades: ["Specialty packaging", "Kraft", "Duplex board"],
    estimatedMillCount: "25+ mills and converting units",
    industryNote: "Specialty packaging demand from textile and diamond export houses creates higher-value paper segments.",
  },
  saharanpur: {
    slug: "saharanpur",
    name: "Saharanpur",
    state: "Uttar Pradesh",
    region: "North",
    millProfile:
      "Saharanpur is a traditional paper manufacturing centre in Western UP with both heritage mills and modern recycled-paper operations.",
    primaryGrades: ["Kraft", "Writing & printing", "Recycled"],
    estimatedMillCount: "30+ mills",
    industryNote: "One of UP's most concentrated paper clusters with strong waste-paper supply chain.",
  },
  muzaffarnagar: {
    slug: "muzaffarnagar",
    name: "Muzaffarnagar",
    state: "Uttar Pradesh",
    region: "North",
    millProfile:
      "Muzaffarnagar is a major UP paper cluster with strong sugar industry linkage providing bagasse for agro-residue paper production.",
    primaryGrades: ["Bagasse-based agro paper", "Kraft", "Newsprint"],
    estimatedMillCount: "20+ mills",
    industryNote: "Agro-residue (bagasse, wheat straw) based paper making is a regional strength.",
  },
  aurangabad: {
    slug: "aurangabad",
    name: "Aurangabad",
    state: "Maharashtra",
    region: "West",
    millProfile:
      "Aurangabad (Chhatrapati Sambhajinagar) hosts paper mills serving Maharashtra's industrial corridor including automotive and FMCG packaging demand.",
    primaryGrades: ["Kraft", "Duplex board", "Packaging paper"],
    estimatedMillCount: "10+ mills",
    industryNote: "Maharashtra industrial growth drives packaging demand; mills focus on B2B industrial customers.",
  },
  rajahmundry: {
    slug: "rajahmundry",
    name: "Rajahmundry",
    state: "Andhra Pradesh",
    region: "South",
    millProfile:
      "Rajahmundry is home to large integrated paper mills with traditional wood-pulp based operations, serving South India and exports.",
    primaryGrades: ["Writing & printing", "Coated paper", "Specialty grades"],
    estimatedMillCount: "Major integrated mills (ITC PSPD, AP Paper Mills)",
    industryNote: "Integrated pulp-and-paper operations with significant export orientation.",
  },
  trichy: {
    slug: "trichy",
    name: "Tiruchirappalli",
    state: "Tamil Nadu",
    region: "South",
    millProfile:
      "Trichy and surrounding Tamil Nadu hosts paper mills serving South Indian industrial markets with kraft, writing, and specialty paper production.",
    primaryGrades: ["Kraft", "Writing paper", "Bagasse paper"],
    estimatedMillCount: "15+ mills",
    industryNote: "Sugar-industry linkage drives bagasse-based paper production.",
  },
  pune: {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    region: "West",
    millProfile:
      "Pune and surrounding Maharashtra industrial belt has paper mills serving automotive, FMCG, and packaging buyers with focus on board and specialty grades.",
    primaryGrades: ["Duplex board", "Kraft", "Specialty packaging"],
    estimatedMillCount: "15+ mills and converters",
    industryNote: "Automotive and FMCG packaging demand drives premium board production.",
  },
  ahmedabad: {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    region: "West",
    millProfile:
      "Ahmedabad and the broader Gujarat industrial belt hosts paper mills feeding pharma, FMCG, and chemical packaging demand.",
    primaryGrades: ["Kraft", "Duplex board", "Specialty packaging"],
    estimatedMillCount: "25+ mills and packaging converters",
    industryNote: "Pharma cluster (Ahmedabad-Vadodara) drives demand for premium and FDA-compliant packaging.",
  },
};

export const CITY_SLUGS = Object.keys(CITIES);
