import type { Metadata } from "next";
import { seoDescription, seoTitle } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";

export const seoKeywords = [
  "Emmanuel Lubwama",
  "React Native developer",
  "mobile engineer",
  "Expo developer",
  "Kotlin",
  "Swift",
  "fintech mobile apps",
  "Kampala",
  "Uganda",
  "software engineer portfolio",
] as const;

type PageMetaOptions = {
  /** Segment title (layout template adds "| Emmanuel Lubwama"). */
  title?: string;
  description?: string;
  /** Path including leading slash, e.g. `/about`. */
  path: string;
  /** When true, omit segment title and use the global default home title. */
  isHome?: boolean;
};

/** Shared alternates + Open Graph / Twitter for static routes. */
export function pageMetadata({
  title,
  description = seoDescription,
  path,
  isHome = false,
}: PageMetaOptions): Metadata {
  const url = path === "" || path === "/" ? getSiteUrl() : `${getSiteUrl()}${path}`;
  const ogTitle = isHome ? seoTitle : title ? `${title} | Emmanuel Lubwama` : seoTitle;

  return {
    ...(isHome
      ? { title: { absolute: seoTitle } }
      : title
        ? { title }
        : {}),
    description,
    keywords: [...seoKeywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: ogTitle,
      description,
      siteName: "Emmanuel Lubwama",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
