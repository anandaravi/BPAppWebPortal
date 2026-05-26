export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  publishedAt: string;
  millType: "Kraft" | "Tissue" | "Integrated" | "Newsprint" | "Board" | "Recycled";
  millSize: string;
  location: string;
  modules: string[];
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; before: string; after: string; delta: string }[];
  quote?: { text: string; role: string };
  timeline: { week: string; milestone: string }[];
  tags?: string[];
  status: "published" | "draft";
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  // Sample template entry — duplicate this shape per real customer
  "sample-kraft-mill": {
    slug: "sample-kraft-mill",
    title: "50 TPD kraft mill cuts trim waste 65% in 90 days",
    subtitle: "How a single-PM kraft mill in Vapi rolled out Deckle Optimizer + Production module",
    description:
      "A 50 TPD kraft mill in Vapi GIDC moved from spreadsheet-based deckle planning to Papyrus BPApp's 3-tier Deckle Optimizer. Trim waste dropped from 5.2% to 1.8%, planning time fell 91%, SWO recovery rose to 94%.",
    publishedAt: "2026-04-15",
    millType: "Kraft",
    millSize: "50 TPD",
    location: "Vapi, Gujarat",
    modules: ["Deckle Optimizer", "Production", "Sales", "Inventory"],
    challenge:
      "Manual deckle planning consumed 90 minutes per shift, trim waste hovered at 5.2%, and last-minute order changes triggered 30–45 minute re-plans. Operators relied on tribal knowledge; new planners took months to ramp. SWO recovery sat at 62%.",
    approach:
      "Week 1 onboarding + machine master setup. Week 2 constraint profile + cost model calibration. Week 3 shadow mode parallel run. Week 4 go-live with Instant Mode for mid-shift changes, Full Optimization for daily plans. Pattern library seeded with 6 months of historical approved plans.",
    outcome:
      "Trim dropped to 1.8% within 90 days. SWO recovery climbed to 94%. Re-plan time fell from 45 minutes to 2 seconds. Planner reports plan accuracy within ±1% on 6 of 7 days. Annualized savings: ₹2.4 crore on a ₹70K/t pulp cost basis.",
    metrics: [
      { label: "Trim waste %", before: "5.2%", after: "1.8%", delta: "65% reduction" },
      { label: "Planning time / shift", before: "90 min", after: "8 min", delta: "91% faster" },
      { label: "SWO recovery", before: "62%", after: "94%", delta: "+32 pts" },
      { label: "Re-plan after change", before: "45 min", after: "2 sec", delta: "1,350× faster" },
      { label: "Constraints honored", before: "~30", after: "180+", delta: "6× coverage" },
      { label: "Annualized savings", before: "—", after: "₹2.4 Cr", delta: "ROI 9.2×" },
    ],
    quote: {
      text:
        "We used to think trim waste was a fact of life — every paper mill loses it. Within 3 months of going live, our trim was a third of what it used to be. The planner now spends his morning solving harder problems, not building cut patterns.",
      role: "Plant Manager, 50 TPD Kraft Mill, Vapi",
    },
    timeline: [
      { week: "Week 1", milestone: "Onboarding · machine master · grade catalog import" },
      { week: "Week 2", milestone: "Constraint profile · cost model · pattern library seeding" },
      { week: "Week 3", milestone: "Shadow mode parallel run · operator training" },
      { week: "Week 4", milestone: "Go-live · cutover to Deckle-generated plans" },
      { week: "Week 13", milestone: "90-day review · baseline locked · ROI validated" },
    ],
    tags: ["Deckle", "Kraft mill", "Vapi"],
    status: "draft",
  },
};

export const CASE_STUDY_SLUGS = Object.entries(CASE_STUDIES)
  .filter(([, c]) => c.status === "published")
  .map(([slug]) => slug);
