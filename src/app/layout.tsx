import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Emmanuel Lubwama — Software Engineer",
    template: "%s — Emmanuel Lubwama",
  },
  description:
    "Full-stack engineer building production web and mobile apps with React, React Native, Next.js, and Node.js. Fintech, e-commerce, and real-time products.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Emmanuel Lubwama",
    title: "Emmanuel Lubwama — Software Engineer",
    description:
      "Full-stack engineer building production web and mobile apps with React, React Native, Next.js, and Node.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Lubwama — Software Engineer",
    description:
      "Full-stack engineer building production web and mobile apps with React, React Native, Next.js, and Node.js.",
  },
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
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
