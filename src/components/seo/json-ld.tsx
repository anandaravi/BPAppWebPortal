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
  legalName: "Netique Infotech Private Limited",
  alternateName: ["Papyrus360", "Netique"],
  url: SITE.url,
  logo: `${SITE.url}/bp_app.png`,
  description:
    "Papyrus BPApp is developed by Netique Infotech Private Limited — a Bangalore-based paper-industry technology partner serving paper mills since 2000, with a consulting team carrying 35+ years of domain experience. Papyrus360 is the umbrella brand covering software (OPTRIM, Papyrus BPApp), consultancy, and raw material supply for the paper industry.",
  email: SITE.email,
  telephone: "+91-80-2671-6066",
  foundingDate: "2000",
  address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Bangalore", addressRegion: "Karnataka" },
  brand: [
    { "@type": "Brand", name: "Papyrus BPApp" },
    { "@type": "Brand", name: "Papyrus360" },
  ],
  owns: [
    {
      "@type": "Product",
      name: "NDM (Netique Deckle Matcher)",
      description: "Deckle matching and trim optimization tool for paper mills.",
      image: `${SITE.url}/bp_app.png`,
      brand: { "@type": "Brand", name: "Papyrus360" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: "0", availability: "https://schema.org/InStock", url: `${SITE.url}/contact` },
    },
    {
      "@type": "Product",
      name: "Paper Agent",
      description: "AI-powered paper industry assistant for Indian paper manufacturers.",
      image: `${SITE.url}/bp_app.png`,
      brand: { "@type": "Brand", name: "Papyrus360" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: "0", availability: "https://schema.org/InStock", url: `${SITE.url}/contact` },
    },
    {
      "@type": "Product",
      name: "Optrim",
      description: "Proprietary trim waste optimization engine for paper slitting operations.",
      image: `${SITE.url}/bp_app.png`,
      brand: { "@type": "Brand", name: "Papyrus360" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: "0", availability: "https://schema.org/InStock", url: `${SITE.url}/contact` },
    },
    {
      "@type": "Product",
      name: "Optrim Web",
      description: "Web-based deckle and trim optimization platform for paper mills.",
      image: `${SITE.url}/bp_app.png`,
      brand: { "@type": "Brand", name: "Papyrus360" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: "0", availability: "https://schema.org/InStock", url: `${SITE.url}/contact` },
    },
    {
      "@type": "Product",
      name: "Papyrus Production Manager",
      description: "Production planning and shop floor management for paper manufacturing.",
      image: `${SITE.url}/bp_app.png`,
      brand: { "@type": "Brand", name: "Papyrus360" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: "0", availability: "https://schema.org/InStock", url: `${SITE.url}/contact` },
    },
    {
      "@type": "Product",
      name: "Papyrus BPApp",
      description: "Enterprise ERP purpose-built for Indian paper manufacturing — 44 integrated modules covering production, deckle optimization, GST finance, HR and AI.",
      image: `${SITE.url}/bp_app.png`,
      brand: { "@type": "Brand", name: "Papyrus360" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: "0", availability: "https://schema.org/InStock", url: `${SITE.url}/contact` },
    },
  ],
  sameAs: [
    "https://github.com/anandaravi/BPAppWebPortal",
    "https://www.youtube.com/playlist?list=PLI8_1PmAsPBHPu4uD-b4Or0pAveJjYgry",
  ],
  knowsAbout: [
    "Paper manufacturing",
    "Enterprise resource planning",
    "Deckle optimization",
    "Deckle matching",
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
  publisher: {
    "@type": "Organization",
    name: "Netique Infotech Pvt Ltd.",
    alternateName: "Papyrus360",
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

export const LOCAL_BUSINESS_SCHEMA = {
  "@type": "LocalBusiness",
  name: "Netique Infotech Private Limited",
  alternateName: ["Papyrus360", "Papyrus BPApp"],
  url: SITE.url,
  logo: `${SITE.url}/bp_app.png`,
  image: `${SITE.url}/bp_app.png`,
  description:
    "Bangalore-based enterprise ERP company building Papyrus BPApp — purpose-built for Indian paper manufacturing since 2000. 35+ years domain expertise.",
  email: SITE.email,
  telephone: "+91-80-2671-6066",
  foundingDate: "2000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bangalore",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceArea: {
    "@type": "Country",
    name: "India",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Papyrus BPApp ERP Modules",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paper Mill ERP Software" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deckle Optimization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GST Compliance Software" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Production Planning MRP" } },
    ],
  },
  sameAs: [
    "https://github.com/anandaravi/BPAppWebPortal",
    "https://www.youtube.com/playlist?list=PLI8_1PmAsPBHPu4uD-b4Or0pAveJjYgry",
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "NEFT, RTGS, UPI, Cheque",
};

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
