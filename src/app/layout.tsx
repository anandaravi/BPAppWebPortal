import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { PageTransition } from "@/components/page-transition";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ExitIntent } from "@/components/layout/exit-intent";
import { SITE } from "@/lib/constants";
import { JsonLd, ORGANIZATION_SCHEMA, SOFTWARE_APPLICATION_SCHEMA } from "@/components/seo/json-ld";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const defaultTitle = `${SITE.name} — ERP for Paper Mills | Deckle Optimizer + GST + AI`;

export const metadata: Metadata = {
  title: { default: defaultTitle, template: `%s — ${SITE.name}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  keywords: SITE.keywords,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  category: "Enterprise Software",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: defaultTitle,
    description: SITE.description,
    url: SITE.url,
    locale: "en_IN",
    images: [
      {
        url: "/bp_app.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ERP for Indian Paper Mills`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: defaultTitle,
    description: SITE.description,
    images: ["/bp_app.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#F59E0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        <JsonLd data={[ORGANIZATION_SCHEMA, SOFTWARE_APPLICATION_SCHEMA]} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Providers>
          <Navbar />
          <Breadcrumbs />
          <main id="main-content" tabIndex={-1} className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingActions />
          <ExitIntent />
          <div className="lg:hidden h-16" aria-hidden="true" />
        </Providers>
      </body>
    </html>
  );
}
