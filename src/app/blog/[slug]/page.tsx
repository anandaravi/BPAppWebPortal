import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/seo/article-page";
import { ARTICLES } from "@/lib/blog/articles";

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES[slug];
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}` },
    keywords: a.tags,
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url: `/blog/${a.slug}`,
      publishedTime: a.publishedAt,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLES[slug];
  if (!a) notFound();
  return <ArticlePage article={a} />;
}
