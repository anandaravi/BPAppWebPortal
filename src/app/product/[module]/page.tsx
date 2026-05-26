import type { ReactNode } from "react";
import { ModuleTemplate } from "@/components/module/module-template";
import { DeckleDeepDive } from "@/components/module/deckle-deep-dive";
import { ProductionDeepDive } from "@/components/module/production-deep-dive";
import { AIDeepDive } from "@/components/module/ai-deep-dive";
import { FinanceDeepDive } from "@/components/module/finance-deep-dive";
import { HRDeepDive } from "@/components/module/hr-deep-dive";
import { ModuleFAQ } from "@/components/module/module-faq";
import { ALL_MODULES, ALL_SLUGS } from "@/lib/modules";
import { JsonLd, productSchema, breadcrumbSchema, faqSchema } from "@/components/seo/json-ld";
import { MODULE_FAQS } from "@/lib/module-faqs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ALL_SLUGS.map((module) => ({ module }));
}

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<Metadata> {
  const { module } = await params;
  const data = ALL_MODULES[module];
  if (!data) return { title: "Module not found" };
  return {
    title: `${data.name} — ${data.tag} | Paper Mill ERP Module`,
    description: data.blurb,
    alternates: { canonical: `/product/${module}` },
    keywords: [
      data.name,
      `${data.name} module`,
      `${data.name} for paper mill`,
      "paper mill ERP",
      "Papyrus BPApp",
    ],
    openGraph: {
      title: `${data.name} — ${data.tag}`,
      description: data.blurb,
      url: `/product/${module}`,
      images: data.photo ? [data.photo] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const data = ALL_MODULES[module];
  if (!data) notFound();

  const faqs = MODULE_FAQS[module];
  const schemas: Record<string, unknown>[] = [
    productSchema({
      name: `${data.name} — Papyrus BPApp`,
      description: data.blurb,
      slug: module,
      image: data.photo,
      category: `Paper mill ERP module — ${data.name}`,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Product", url: "/product" },
      { name: data.name, url: `/product/${module}` },
    ]),
  ];
  if (faqs && faqs.length > 0) {
    schemas.push(faqSchema(faqs));
  }

  let body: ReactNode;
  switch (module) {
    case "deckle": body = <DeckleDeepDive data={data} />; break;
    case "production": body = <ProductionDeepDive data={data} />; break;
    case "ai": body = <AIDeepDive data={data} />; break;
    case "finance": body = <FinanceDeepDive data={data} />; break;
    case "hr": body = <HRDeepDive data={data} />; break;
    default: body = <ModuleTemplate data={data} />;
  }

  const suppressFaq = module === "deckle";

  return (
    <>
      <JsonLd data={schemas} />
      {body}
      {faqs && faqs.length > 0 && !suppressFaq && <ModuleFAQ faqs={faqs} moduleName={data.name} />}
    </>
  );
}
