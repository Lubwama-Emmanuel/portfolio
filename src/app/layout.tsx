import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { AppFrame } from "@/components/app-frame";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { JsonLd } from "@/components/json-ld";
import { seoDescription, seoTitle } from "@/content/profile";
import { seoKeywords } from "@/lib/seo";
import { getSiteUrl, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: "%s | Emmanuel Lubwama",
  },
  description: seoDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  keywords: [...seoKeywords],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: seoTitle,
    description: seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#013e37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="relative min-h-full font-sans">
        <CursorSpotlight />
        <div className="relative z-10">
          <JsonLd />
          <AppFrame>{children}</AppFrame>
        </div>
      </body>
    </html>
  );
}
