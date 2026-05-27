import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";
import { MODULE_GROUPS, ALL_MODULES } from "@/lib/modules";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const PRODUCT_NAV = [
  { label: "Product", href: "/product" },
  { label: "Features", href: "/features" },
  { label: "Architecture", href: "/architecture" },
  { label: "Technical", href: "/technical" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Compare", href: "/compare" },
  { label: "Module Matrix", href: "/compare-modules" },
];

const COMPANY_NAV = [
  { label: "About", href: "/about" },
  { label: "Who It's For", href: "/customers" },
  { label: "Clients", href: "/clients" },
  { label: "By Role", href: "/solutions" },
  { label: "By Mill Type", href: "/for" },
  { label: "Implementation", href: "/implementation" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const RESOURCES_NAV = [
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Glossary", href: "/glossary" },
  { label: "ROI Calculator", href: "/roi-calculator" },
  { label: "ERP by City", href: "/erp-for-paper-mills" },
  { label: "Changelog", href: "/changelog" },
  { label: "Status", href: "/status" },
];

const WA_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
const TEL_HREF = `tel:${SITE.phone.replace(/\s+/g, "")}`;

export function Footer() {
  return (
    <footer className="border-t border-border-dim bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="max-w-[var(--container-max)] mx-auto px-6 py-14">
        {/* Top row: brand + primary nav */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block" aria-label="Papyrus360 home">
              <Image
                src="/papyrus360.png"
                alt="Papyrus360"
                width={117}
                height={52}
                className="shrink-0"
                unoptimized
              />
            </Link>
            <p className="text-sm text-text-3 max-w-xs leading-relaxed">
              {SITE.tagline}. Built for Indian paper manufacturing — modular,
              scalable, and compliant.
            </p>
            <p className="text-[11px] text-text-4 max-w-xs leading-relaxed">
              A <span className="text-text-2">Papyrus360</span> product by{" "}
              <span className="text-text-2">Netique Infotech Private Limited</span>{" "}
              — Bangalore. Serving paper mills since 2000.
            </p>

            {/* Contact strip */}
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-sm text-text-3 hover:text-amber-400 transition-colors"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={TEL_HREF}
                  className="flex items-center gap-2 text-sm text-text-3 hover:text-amber-400 transition-colors"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-3 hover:text-amber-400 transition-colors"
                >
                  <MessageCircle size={14} className="flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-3">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Product</p>
              <ul className="space-y-2">
                {PRODUCT_NAV.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-text-3 hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Company</p>
              <ul className="space-y-2">
                {COMPANY_NAV.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-text-3 hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Resources</p>
              <ul className="space-y-2">
                {RESOURCES_NAV.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-text-3 hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Compliance</p>
              <ul className="space-y-2 text-sm text-text-3 mb-5">
                <li>GST + FEMA Native</li>
                <li>PF / ESI / PT / LWF</li>
                <li>Aadhaar Act §29 · IT Act §43A</li>
                <li>SOC 2 / ISO 27001 ready</li>
              </ul>
              <NewsletterForm source="footer" />
            </div>
          </div>
        </div>

        {/* Module groups directory */}
        <div className="mt-12 pt-10 border-t border-border-dim">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-5">
            All 44 Modules
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {MODULE_GROUPS.map((g) => {
              const slugs = g.slugs.filter((s) => ALL_MODULES[s]);
              return (
                <div key={g.slug}>
                  <Link
                    href={`/product#${g.slug}`}
                    className="block text-sm font-semibold text-foreground hover:text-amber-400 transition-colors mb-2"
                  >
                    {g.title}{" "}
                    <span className="text-[10px] text-text-4 font-mono">{slugs.length}</span>
                  </Link>
                  <ul className="space-y-1.5">
                    {slugs.slice(0, 5).map((s) => {
                      const m = ALL_MODULES[s];
                      return (
                        <li key={s}>
                          <Link
                            href={`/product/${s}`}
                            className="text-xs text-text-3 hover:text-amber-400 transition-colors"
                          >
                            {m.name}
                          </Link>
                        </li>
                      );
                    })}
                    {slugs.length > 5 && (
                      <li>
                        <Link
                          href={`/product#${g.slug}`}
                          className="text-xs text-text-4 hover:text-amber-400 transition-colors"
                        >
                          +{slugs.length - 5} more →
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-4">© {new Date().getFullYear()} Netique Infotech Pvt Ltd. · Papyrus360. All rights reserved.</p>
          <p className="text-xs text-text-4 font-mono">Business Process Application for Paper Manufacturing</p>
        </div>
      </div>
    </footer>
  );
}
