import { ModuleTemplate } from "@/components/module/module-template";
import { DeckleDeepDive } from "@/components/module/deckle-deep-dive";
import { ALL_MODULES, ALL_SLUGS } from "@/lib/modules";
import { JsonLd, productSchema, breadcrumbSchema } from "@/components/seo/json-ld";
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

  return (
    <>
      <JsonLd
        data={[
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
        ]}
      />
      {module === "deckle" ? <DeckleDeepDive data={data} /> : <ModuleTemplate data={data} />}
    </>
  );
}
