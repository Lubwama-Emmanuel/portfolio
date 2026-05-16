import { education } from "@/content/education";
import { seoDescription } from "@/content/profile";
import { getSiteUrl, site } from "@/lib/site";

const knowsAbout = [
  "React Native",
  "Expo",
  "TypeScript",
  "Kotlin",
  "Swift",
  "Mobile development",
  "Next.js",
  "Fintech",
  "E-commerce",
] as const;

/** JSON-LD @graph for Person + WebSite (homepage / sitewide). */
export function getStructuredDataGraph() {
  const url = getSiteUrl();
  const personId = `${url}/#person`;
  const websiteId = `${url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url,
        name: site.name,
        description: seoDescription,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: "Emmanuel",
        familyName: "Lubwama",
        jobTitle: site.jobTitle,
        url,
        image: `${url}/emmanuel.jpg`,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.locality,
          addressCountry: site.location.countryCode,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.school.replace(/,.*$/, "").trim(),
        },
        knowsAbout: [...knowsAbout],
        sameAs: [...site.sameAs],
      },
    ],
  };
}
