import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Paper Industry Glossary | Mill Terms, ERP Acronyms, Indian Compliance",
  description:
    "Comprehensive glossary of paper manufacturing terms, ERP acronyms, deckle optimization concepts, and Indian compliance terminology. From GSM to GSTR-1, fluting to FEMA.",
  alternates: { canonical: "/glossary" },
  keywords: [
    "paper industry glossary",
    "paper mill terms",
    "GSM definition",
    "deckle meaning",
    "burst factor paper",
    "kraft paper terms",
    "paper ERP acronyms",
  ],
  openGraph: {
    title: "Paper Industry Glossary — Mill, ERP & Compliance Terms",
    description: "From GSM to GSTR-1, fluting to FEMA — every paper industry term explained.",
    url: "/glossary",
  },
};

type Term = {
  term: string;
  acronym?: string;
  category: "Paper" | "Production" | "Quality" | "ERP" | "Compliance" | "AI/Tech";
  short: string;
  long: string;
  related?: string[];
};

const TERMS: Term[] = [
  // Paper basics
  { term: "GSM", acronym: "Grams per Square Metre", category: "Paper", short: "Standard measure of paper weight in grams per square metre.", long: "GSM (gramamage) is the weight of paper expressed per unit area. Writing paper is typically 60–100 GSM, kraft paper 80–250 GSM, board 180–500 GSM, tissue 13–40 GSM. The most important paper specification along with size and brightness." },
  { term: "Deckle", category: "Paper", short: "The full width of paper produced on a paper machine, before trimming.", long: "Deckle refers to (1) the full edge-to-edge width of paper on a paper machine (typically 2–10 metres), and (2) by extension, the trim/slitting plan that cuts this wide reel into customer-specific narrower widths. Optimizing deckle = minimizing trim waste." },
  { term: "Trim Waste", category: "Paper", short: "Paper lost to edge cuts and pattern mismatch during slitting.", long: "When a wide deckle reel is slit into customer widths, edges and gaps become trim waste — fed back into broke. Typical mills run 5–10% trim. World-class deckle optimization brings this under 3.5%, saving ₹2–3 crore/year on a 50 TPD mill." },
  { term: "Broke", category: "Paper", short: "Waste paper generated within the mill, recycled back into the wet end.", long: "Broke is in-mill waste paper from wet-end breaks, trim, off-spec reels, sheets discarded at finishing. Repulped and re-introduced into stock prep. Tracked carefully — too much broke signals quality or process issues." },
  { term: "Furnish", category: "Paper", short: "The pulp recipe — types and proportions of fibres and chemicals used.", long: "The blend of fibres (virgin hardwood, softwood, recycled OCC, mixed waste), chemicals (sizing, retention aids, fillers, dyes), and additives that goes into the headbox. Different paper grades require different furnish recipes." },
  { term: "Fourdrinier", category: "Paper", short: "The most common paper machine design with a flat horizontal forming wire.", long: "Patented in 1801 by the Fourdrinier brothers, the dominant paper machine design: pulp drains on a continuous wire mesh forming the sheet, then pressed and dried. Used for writing, printing, kraft, board, newsprint." },
  { term: "MG / MF Paper", acronym: "Machine-Glazed / Machine-Finished", category: "Paper", short: "Surface finish levels achieved during paper machine drying.", long: "MG (Machine-Glazed) uses a Yankee dryer to produce one glossy side and one matte side — typical for posters, food wrap. MF (Machine-Finished) uses calendering for smooth uniform finish — typical for writing/printing papers." },
  { term: "Kraft Paper", category: "Paper", short: "Strong brown paper made via the kraft (sulfate) pulping process.", long: "Kraft (German for 'strength') paper is produced from the kraft chemical pulping process. Used heavily in corrugation, sacks, packaging. Specifications include BF (Burst Factor), BS (Bursting Strength), GSM, moisture, cobb." },
  { term: "Tissue Paper", category: "Paper", short: "Lightweight paper for hygiene, towel, facial use.", long: "Tissue paper is low-GSM (13–40 GSM), soft, absorbent paper. Made on tissue machines with Yankee dryers. Converted into toilet rolls, facial tissue, kitchen towels, napkins. India's tissue market grows ~12% annually." },
  { term: "Newsprint", category: "Paper", short: "Low-cost paper for newspaper printing.", long: "Newsprint is 40–55 GSM uncoated mechanical paper with high recycled content. Produced on high-speed (1500+ m/min) newsprint machines. Indian newsprint mills face competition from imports under FTA agreements." },

  // Production
  { term: "MPS", acronym: "Master Production Schedule", category: "Production", short: "The high-level production plan aligning orders to capacity.", long: "MPS is the time-phased plan of what will be produced, when, on which machine. Outputs from sales orders + forecasts + capacity constraints. Drives MRP (material planning) and CRP (capacity planning) downstream." },
  { term: "MRP", acronym: "Material Requirements Planning", category: "Production", short: "Calculates what materials are needed and when to support production.", long: "MRP explodes the MPS through BOMs to determine raw material requirements (pulp, chemicals, packing). Generates purchase requisitions and work orders. Originated in 1960s; still the backbone of manufacturing ERP." },
  { term: "CRP", acronym: "Capacity Requirements Planning", category: "Production", short: "Validates that planned production fits available machine capacity.", long: "CRP checks the MPS against machine, labour, and tooling capacity at each work center. Identifies bottlenecks before they happen. In paper mills, CRP validates that PM hours, slitter hours, and packing capacity all align." },
  { term: "OEE", acronym: "Overall Equipment Effectiveness", category: "Production", short: "Measures machine productivity: Availability × Performance × Quality.", long: "OEE is the gold-standard manufacturing KPI: (Run Time / Planned Time) × (Actual Speed / Design Speed) × (Good Output / Total Output). World-class paper machines run 85%+ OEE. Indian average is often 50–65% — significant improvement opportunity." },
  { term: "Yankee Dryer", category: "Production", short: "Large heated cylinder used in tissue and MG paper production.", long: "A large diameter (typically 12–18 ft) steam-heated rotating cylinder. The paper sheet adheres, dries, and is creped or peeled off. Critical for tissue and MG kraft paper production." },
  { term: "Stock Preparation", category: "Production", short: "The processing of pulp before it enters the paper machine.", long: "Stock prep includes pulping, refining, screening, cleaning, and chemical addition to prepare the fibre slurry for the headbox. Determines paper quality. Key equipment: hydropulpers, refiners, chests, screens, cleaners." },
  { term: "Calendering", category: "Production", short: "Smoothing paper by passing it between heavy rollers.", long: "Calendering uses heated/cooled high-pressure rollers to smooth and finish paper surface. Levels caliper, improves printability, gives gloss. Soft-calendered, super-calendered, and hot-calendered are common variants." },

  // Quality
  { term: "BF", acronym: "Burst Factor", category: "Quality", short: "Burst strength normalized by GSM — key kraft paper spec.", long: "Burst Factor = Bursting Strength (kPa) ÷ GSM (g/m²). A normalized measure indicating paper strength regardless of weight. Indian corrugation grades commonly specify BF 16–22. The higher the BF, the stronger the paper." },
  { term: "BS", acronym: "Bursting Strength", category: "Quality", short: "Absolute pressure required to rupture paper.", long: "Bursting Strength is measured on a Mullen tester (kgf/cm² or kPa). Important for kraft paper used in corrugation. Specified alongside BF (which normalizes for paper weight)." },
  { term: "Cobb", category: "Quality", short: "Water absorption test — measures paper's water resistance.", long: "Cobb test measures grams of water absorbed by a square metre of paper in a specified time (usually 60 seconds = Cobb60). Critical for sized papers, packaging, and food-contact grades. Lower Cobb = more water-resistant." },
  { term: "SPC", acronym: "Statistical Process Control", category: "Quality", short: "Statistical methods to monitor and control process quality.", long: "SPC uses control charts (X-bar R, p-chart, c-chart) to detect when a process is drifting out of statistical control. UCL/LCL violations trigger investigation. Standard practice in paper quality management." },
  { term: "LIMS", acronym: "Laboratory Information Management System", category: "Quality", short: "Software for managing lab samples, tests, and results.", long: "LIMS handles sample logging, test scheduling, result entry, COA generation, equipment calibration, and trend reporting. In a paper mill, LIMS connects machine reels to lab tests for hold/release decisions." },
  { term: "COA", acronym: "Certificate of Analysis", category: "Quality", short: "Document certifying that a dispatched lot meets specifications.", long: "COA is provided to customers with each dispatch, listing tested parameters (GSM, BF, BS, moisture, brightness, etc.) and their values against the agreed specification. Mandatory for packaging, food-contact, and FMCG customers." },
  { term: "NCR / CAPA", acronym: "Non-Conformance Report / Corrective Action Preventive Action", category: "Quality", short: "Workflow for handling and learning from quality failures.", long: "NCR documents a quality failure (failed test, customer complaint). CAPA defines corrective actions (immediate fix) and preventive actions (root cause elimination). Audit trail required for ISO 9001, IATF, FSSAI, FDA compliance." },

  // ERP / Tech
  { term: "ERP", acronym: "Enterprise Resource Planning", category: "ERP", short: "Integrated software covering all business functions.", long: "ERP unifies finance, HR, production, sales, procurement, inventory, quality in one system with shared master data. Major vendors: SAP, Oracle, Microsoft Dynamics, Infor. Industry-specific ERPs (like Papyrus BPApp for paper) add deep vertical capability." },
  { term: "MES", acronym: "Manufacturing Execution System", category: "ERP", short: "Shop floor software for executing and tracking production.", long: "MES handles the layer between ERP (which plans) and PLCs/SCADA (which control machines). Tracks work orders, reel production, OEE, downtime, quality data, operator actions. Paper-specific MES: Dataman, Honeywell Optivision." },
  { term: "MRP II", acronym: "Manufacturing Resource Planning", category: "ERP", short: "Extension of MRP including capacity, finance, HR.", long: "MRP II (1980s) extended MRP from material planning to full manufacturing resources — capacity, labour, finance integration. Became the foundation of modern ERP. Now largely superseded by integrated ERP suites." },
  { term: "BOM", acronym: "Bill of Materials", category: "ERP", short: "Structured list of components needed to make a product.", long: "BOM defines a product's recipe: parent item + components + quantities + units. In paper, BOMs include pulp grades, chemicals, packaging materials. Multi-level BOMs handle semi-finished states (pulp → paper → converted product)." },
  { term: "RBAC", acronym: "Role-Based Access Control", category: "ERP", short: "Permission system based on user roles.", long: "RBAC grants users permissions based on assigned roles (Operator, Supervisor, Manager, Finance) rather than per-user assignments. Critical for compliance (segregation of duties, audit trails) in regulated industries." },
  { term: "API", acronym: "Application Programming Interface", category: "ERP", short: "Programmatic interface for software to talk to other software.", long: "REST APIs allow ERP/MES to integrate with PLCs, e-commerce platforms, banking, GSTN, e-invoice portal, weighbridges, ETP sensors. API-first design enables ecosystem integration without point-to-point coupling." },

  // Compliance — India
  { term: "GST", acronym: "Goods and Services Tax", category: "Compliance", short: "India's unified indirect tax (since July 2017).", long: "GST is a consumption-based tax replacing earlier excise/VAT/service tax. CGST + SGST on intra-state, IGST on inter-state. Paper mills file GSTR-1 (sales), GSTR-3B (summary), GSTR-9 (annual), GSTR-2A reconciliation." },
  { term: "GSTR-1", category: "Compliance", short: "Monthly/quarterly return of outward supplies (sales).", long: "GSTR-1 details every sales invoice, debit note, credit note. Must be filed by 11th of next month (monthly filers) or end of next month (quarterly QRMP). Errors create downstream ITC mismatches for customers." },
  { term: "GSTR-3B", category: "Compliance", short: "Summary GST return with tax payment.", long: "Monthly summary of outward supplies, ITC claimed, and tax payable. Filed by 20th of next month. Mismatches between GSTR-3B and GSTR-1 attract notices." },
  { term: "E-Invoice", category: "Compliance", short: "GST invoice authenticated by the IRP with IRN + QR code.", long: "E-invoice (mandatory for businesses with turnover > ₹5 crore) requires generating an IRN (Invoice Reference Number) via the IRP (Invoice Registration Portal). IRN + QR code printed on the invoice." },
  { term: "E-Way Bill", category: "Compliance", short: "Electronic permit for goods movement above ₹50,000.", long: "E-way bill must be generated for inter-state goods movement > ₹50,000 (some states for intra-state too). Contains consignor, consignee, goods, vehicle, validity (based on distance). Detained trucks at checkposts if missing or expired." },
  { term: "FEMA", acronym: "Foreign Exchange Management Act", category: "Compliance", short: "Indian law governing foreign exchange transactions.", long: "FEMA regulates forex inflows/outflows: exports, imports, ECBs, FDI, advance receipts. Paper mill exporters comply with FEMA via authorized dealer (AD) banks, BRC closure, EDPMS reconciliation." },
  { term: "PF", acronym: "Provident Fund", category: "Compliance", short: "Mandatory retirement savings for Indian employees.", long: "EPF (Employees' Provident Fund Organisation) — both employer and employee contribute 12% of basic wage to a retirement fund. Compulsory for establishments with 20+ employees. Monthly ECR filing required." },
  { term: "ESI", acronym: "Employees' State Insurance", category: "Compliance", short: "Mandatory health insurance for low-wage Indian employees.", long: "ESI covers medical care, sickness benefit, maternity, disability for employees earning ≤ ₹21,000/month (₹25,000 for disabled). Contributions: 3.25% (employer) + 0.75% (employee). Monthly challan filing." },
  { term: "TDS / TCS", acronym: "Tax Deducted/Collected at Source", category: "Compliance", short: "Tax withholding mechanism in Indian tax law.", long: "TDS: buyer deducts tax when paying vendor (rent, professional fees, salary). TCS: seller collects extra tax on certain goods/services. Both deposited monthly with quarterly statement filing (24Q, 26Q, 27EQ)." },
  { term: "MSME", acronym: "Micro, Small and Medium Enterprises", category: "Compliance", short: "Indian SMB classification with payment protection law.", long: "MSME Act mandates payment to registered MSME suppliers within 45 days. Buyers (paper mills) must report dues > 45 days to MCA. Interest at 3× bank rate payable on delays. Critical procurement compliance." },

  // AI / Tech (paper industry specific)
  { term: "Digital Twin", category: "AI/Tech", short: "Virtual replica of a physical asset for simulation and analytics.", long: "Digital twin of a paper mill mirrors the physical operation in software — machines, processes, sensors. Used for scenario simulation (new grade impact, capacity expansion), training, and predictive analytics." },
  { term: "Predictive Maintenance", category: "AI/Tech", short: "Using sensor data and ML to predict equipment failures.", long: "Vibration, temperature, current, acoustic signals fed to ML models that detect early warning patterns. Schedules maintenance before breakdown. Common targets in paper: paper machine bearings, refiner discs, dryer cylinders, pumps." },
  { term: "OCR / IDP", acronym: "Optical Character Recognition / Intelligent Document Processing", category: "AI/Tech", short: "Extracts structured data from scanned/photographed documents.", long: "OCR converts paper documents (vendor invoices, e-way bills, LRs, COAs) into structured data. Modern IDP adds layout understanding, table extraction, classification. Eliminates manual data entry from documents." },
  { term: "IoT", acronym: "Internet of Things", category: "AI/Tech", short: "Network of sensors and devices producing telemetry.", long: "In paper mills: PLCs, vibration sensors, temperature probes, moisture meters, weighbridges, ETP analyzers, energy meters. All feeding cloud platforms in real time for monitoring and analytics." },
];

const CATEGORIES: Term["category"][] = ["Paper", "Production", "Quality", "ERP", "Compliance", "AI/Tech"];

export default function GlossaryPage() {
  const definedTermSetSchema = {
    "@type": "DefinedTermSet",
    name: "Paper Industry Glossary",
    description: "Comprehensive glossary of paper manufacturing, ERP, and Indian compliance terms.",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term + (t.acronym ? ` (${t.acronym})` : ""),
      description: t.long,
      inDefinedTermSet: "Paper Industry Glossary",
    })),
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <JsonLd
        data={[
          definedTermSetSchema,
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Glossary", url: "/glossary" },
          ]),
        ]}
      />

      <article className="max-w-5xl mx-auto px-6">
        <header className="mb-12">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Glossary
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Paper Industry Glossary
          </h1>
          <p className="text-lg text-text-2 max-w-3xl leading-relaxed">
            Every term used in this site, defined. Paper terms (GSM, deckle, kraft), production
            (MPS, OEE, Yankee dryer), quality (BF, BS, SPC, LIMS), ERP acronyms (MRP, MES, RBAC),
            Indian compliance (GST, FEMA, PF, ESI), and modern tech (Digital Twin, IoT, IDP).
          </p>
        </header>

        {/* Category nav */}
        <nav className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const count = TERMS.filter((t) => t.category === cat).length;
            return (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace("/", "-")}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface hover:border-amber-500/30 hover:bg-amber-500/5 text-sm text-text-2 transition-colors"
              >
                {cat}
                <span className="text-xs text-text-4 font-mono">{count}</span>
              </a>
            );
          })}
        </nav>

        {CATEGORIES.map((cat) => {
          const items = TERMS.filter((t) => t.category === cat);
          return (
            <section key={cat} id={cat.toLowerCase().replace("/", "-")} className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-6 bg-amber-500 rounded-full" />
                <h2 className="text-2xl font-bold text-foreground">{cat}</h2>
                <span className="text-text-4 font-mono text-sm">{items.length}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {items.map((t) => (
                  <div
                    key={t.term}
                    className="bg-surface border border-border rounded-2xl p-5"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <h3 className="text-foreground font-bold text-base">{t.term}</h3>
                      {t.acronym && (
                        <span className="text-xs text-text-3 italic flex-shrink-0">
                          {t.acronym}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-amber-400 leading-snug mb-2">{t.short}</p>
                    <p className="text-sm text-text-2 leading-relaxed">{t.long}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-12 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            See these terms in action
          </h2>
          <p className="text-text-2 mb-6 max-w-xl mx-auto">
            Every concept here is implemented inside Papyrus BPApp. Book a demo to see how.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            Request a Demo
            <ArrowRight size={14} />
          </Link>
        </section>
      </article>
    </div>
  );
}
