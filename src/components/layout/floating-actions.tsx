"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

const WA_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
const TEL_HREF = `tel:${SITE.phone.replace(/\s+/g, "")}`;

export function FloatingActions() {
  const pathname = usePathname();
  const hide = pathname?.startsWith("/contact");
  if (hide) return null;

  return (
    <>
      {/* WhatsApp FAB — all viewports */}
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-40 right-4 bottom-20 sm:bottom-6 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle size={26} strokeWidth={2} fill="currentColor" className="text-white" />
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
      </a>

      {/* Sticky mobile CTA bar */}
      <div className="lg:hidden fixed z-30 inset-x-0 bottom-0 border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2 px-3 py-2.5 max-w-md mx-auto">
          <a
            href={TEL_HREF}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border-light text-foreground text-sm font-medium active:bg-surface"
          >
            <Phone size={14} />
            Call
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-bold active:bg-amber-400"
          >
            Request Demo
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
