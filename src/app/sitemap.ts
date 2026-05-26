import type { MetadataRoute } from "next";
import { ALL_SLUGS, MODULE_GROUPS } from "@/lib/modules";
import { SITE } from "@/lib/constants";
import { ARTICLES } from "@/lib/blog/articles";
import { CITY_SLUGS } from "@/lib/cities";
import { STATE_SLUGS } from "@/lib/states";
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/product",
    "/features",
    "/architecture",
    "/technical",
    "/customers",
    "/solutions",
    "/for",
    "/resources",
    "/pricing",
    "/compare",
    "/about",
    "/contact",
  ];

  const compareRoutes = [
    "/vs/greycon",
    "/vs/sap-mill-products",
    "/vs/tally",
    "/vs/dataman",
    "/vs/optivision",
    "/vs/infor-ln",
    "/vs/oracle-jde",
    "/vs/marg",
    "/vs/microsoft-dynamics",
    "/vs/sap-business-one",
    "/vs/netsuite",
    "/vs/epicor",
    "/vs/processpro",
  ];

  const millTypeRoutes = [
    "/for/kraft-mill",
    "/for/tissue-mill",
    "/for/integrated-mill",
    "/for/newsprint-mill",
    "/for/board-mill",
    "/for/recycled-mill",
  ];

  const contentRoutes = ["/glossary", "/blog", "/roi-calculator", "/erp-for-paper-mills", "/case-studies"];
  const caseStudyRoutes = CASE_STUDY_SLUGS.map((slug) => `/case-studies/${slug}`);
  const blogArticles = Object.keys(ARTICLES).map((slug) => `/blog/${slug}`);
  const cityRoutes = CITY_SLUGS.map((slug) => `/erp-for-paper-mills/${slug}`);
  const stateRoutes = STATE_SLUGS.map((slug) => `/erp-for-paper-mills/by-state/${slug}`);

  const groupAnchors = MODULE_GROUPS.map((g) => `/product#${g.slug}`);

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...ALL_SLUGS.map((slug) => ({
      url: `${base}/product/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...compareRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...millTypeRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...groupAnchors.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...contentRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...blogArticles.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...cityRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...stateRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudyRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  return entries;
}
