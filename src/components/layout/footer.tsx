import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

const NAV = [
  { label: "Product", href: "/product" },
  { label: "Architecture", href: "/architecture" },
  { label: "Technical", href: "/technical" },
  { label: "Who It's For", href: "/customers" },
  { label: "By Role", href: "/solutions" },
  { label: "Features", href: "/features" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="BPApp"
                width={120}
                height={47}
                className="h-12 object-contain"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">{SITE.tagline}. Built for Indian paper manufacturing — modular, scalable, and compliant.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Product</p>
              <ul className="space-y-2">
                {NAV.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Contact</p>
              <ul className="space-y-2">
                <li>
                  <a href={`mailto:${SITE.email}`}
                    className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">{SITE.email}</a>
                </li>
                <li>
                  <Link href="/contact"
                    className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">Request a Demo</Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Compliance</p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>GST + FEMA Native</li>
              <li>PF / ESI / PT / LWF</li>
              <li>Aadhaar Act §29 · IT Act §43A</li>
              <li>SOC 2 / ISO 27001 ready</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-xs text-zinc-600 font-mono">Business Process Application for Paper Manufacturing</p>
        </div>
      </div>
    </footer>
  );
}
