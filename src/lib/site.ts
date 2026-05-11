/**
 * Canonical site URL for Open Graph, Twitter cards, sitemap, and JSON-LD.
 * Override with NEXT_PUBLIC_SITE_URL in `.env.local` (e.g. http://localhost:3000 for purely local OG testing).
 */
const DEFAULT_SITE_URL = "https://portfolio-two-ruby-56.vercel.app";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
}

export const site = {
  name: "Emmanuel Lubwama",
  title: "Software Engineer",
  email: "lubwamaemmanuel1@gmail.com",
  phone: "+256706039119",
  github: "https://github.com/Lubwama-Emmanuel",
  linkedin: "https://www.linkedin.com/in/lubwama-emmanuel-b35377226",
  /** WhatsApp chat link (international number, no +). */
  whatsapp: "https://wa.me/256763470663",
  /** Human-readable WhatsApp number for contact copy. */
  whatsappDisplay: "+256 763 470 663",
  /** Static résumé in `public/` (Markdown until a PDF is added). */
  resumePath: "/Emmanuel-Lubwama-Resume.md",
  sameAs: [
    "https://github.com/Lubwama-Emmanuel",
    "https://www.linkedin.com/in/lubwama-emmanuel-b35377226",
    "https://wa.me/256763470663",
  ],
} as const;
