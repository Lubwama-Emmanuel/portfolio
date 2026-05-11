import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { AppFrame } from "@/components/app-frame";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { JsonLd } from "@/components/json-ld";
import { seoDescription } from "@/content/profile";
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
  description: seoDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Emmanuel Lubwama",
    title: "Emmanuel Lubwama — Software Engineer",
    description: seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Lubwama — Software Engineer",
    description: seoDescription,
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
