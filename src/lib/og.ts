import { SITE } from "@/lib/constants";

export type OgParams = {
  title: string;
  subtitle?: string;
  tag?: string;
  eyebrow?: string;
  accent?: string;
};

export function ogImage(p: OgParams): string {
  const base = SITE.url.replace(/\/$/, "");
  const q = new URLSearchParams();
  q.set("title", p.title);
  if (p.subtitle) q.set("subtitle", p.subtitle);
  if (p.tag) q.set("tag", p.tag);
  if (p.eyebrow) q.set("eyebrow", p.eyebrow);
  if (p.accent) q.set("accent", p.accent.replace(/^#/, ""));
  return `${base}/og?${q.toString()}`;
}
