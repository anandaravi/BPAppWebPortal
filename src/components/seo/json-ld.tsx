import { SITE } from "@/lib/constants";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? data.map((d) => ({ "@context": "https://schema.org", ...d }))
    : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  name: SITE.name,
  legalName: "Papyrus BPApp",
  url: SITE.url,
  logo: `${SITE.url}/bp_app.png`,
  description: SITE.description,
  email: SITE.email,
  foundingDate: "2024",
  founders: [{ "@type": "Person", name: "Anand Aravi Ramasamy" }],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: [
    "https://github.com/anandaravi/BPAppWebPortal",
    "https://www.youtube.com/playlist?list=PLI8_1PmAsPBHPu4uD-b4Or0pAveJjYgry",
  ],
  knowsAbout: [
    "Paper manufacturing",
    "Enterprise resource planning",
    "Deckle optimization",
    "Paper mill management",
    "Indian paper industry",
    "GST compliance",
  ],
};

export const SOFTWARE_APPLICATION_SCHEMA = {
  "@type": "SoftwareApplication",
  name: SITE.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "ERP",
  operatingSystem: "Web, iOS, Android",
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/bp_app.png`,
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: "0",
    availability: "https://schema.org/InStock",
    url: `${SITE.url}/pricing`,
  },
  featureList: [
    "Production planning (MPS, MRP, CRP)",
    "Proprietary 3-tier Deckle Optimizer",
    "Sales order to e-invoice (GST-compliant)",
    "GST, TDS, FEMA, PF, ESI compliance",
    "Quality management with LIMS",
    "AI-powered predictive maintenance",
    "Multi-plant, multi-tenant, RBAC",
    "44 integrated modules",
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Paper manufacturers, paper mills, pulp mills, paper converters",
  },
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE.url}${item.url}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function productSchema(args: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  category?: string;
}) {
  return {
    "@type": "Product",
    name: args.name,
    description: args.description,
    brand: { "@type": "Brand", name: SITE.name },
    category: args.category ?? "ERP module",
    image: args.image
      ? args.image.startsWith("http")
        ? args.image
        : `${SITE.url}${args.image}`
      : `${SITE.url}/bp_app.png`,
    url: `${SITE.url}/product/${args.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "0",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/contact`,
    },
  };
}
