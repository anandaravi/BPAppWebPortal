import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

const PRODUCT_NAV = [
  { label: "Product", href: "/product" },
  { label: "Features", href: "/features" },
  { label: "Architecture", href: "/architecture" },
  { label: "Technical", href: "/technical" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Compare", href: "/compare" },
];

const COMPANY_NAV = [
  { label: "About", href: "/about" },
  { label: "Who It's For", href: "/customers" },
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
];

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="max-w-[1440px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">{SITE.tagline}. Built for Indian paper manufacturing — modular, scalable, and compliant.</p>
            <p className="text-[11px] text-zinc-600 max-w-xs leading-relaxed">
              A <span className="text-zinc-400">Papyrus360</span> product by{" "}
              <span className="text-zinc-400">Netique Infotech Pvt Ltd.</span> —
              4 decades of paper-industry domain expertise.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Product</p>
              <ul className="space-y-2">
                {PRODUCT_NAV.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href}
                      className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Company</p>
              <ul className="space-y-2">
                {COMPANY_NAV.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href}
                      className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Resources</p>
              <ul className="space-y-2">
                {RESOURCES_NAV.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Compliance</p>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>GST + FEMA Native</li>
                <li>PF / ESI / PT / LWF</li>
                <li>Aadhaar Act §29 · IT Act §43A</li>
                <li>SOC 2 / ISO 27001 ready</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
                <a href={`mailto:${SITE.email}`}
                  className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">{SITE.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Netique Infotech Pvt Ltd. · Papyrus360. All rights reserved.</p>
          <p className="text-xs text-zinc-600 font-mono">Business Process Application for Paper Manufacturing</p>
        </div>
      </div>
    </footer>
  );
}
