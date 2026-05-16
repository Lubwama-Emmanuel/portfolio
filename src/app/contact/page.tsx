import type { Metadata } from "next";
import { SocialLinks } from "@/components/social-links";
import { seoDescription } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact Emmanuel Lubwama — ${site.email}. ${seoDescription}`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        Let&apos;s work together
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
        I&apos;m open to senior mobile and full-stack opportunities, contract
        work, and interesting product collaborations.
      </p>

      <p className="mt-8">
        <a
          href={site.resumePath}
          download
          className="font-mono text-sm text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Download résumé (Markdown) →
        </a>
      </p>

      <dl className="mt-14 space-y-8 border-t border-[var(--border)] pt-12">
        <div>
          <dt className="font-mono text-xs font-medium text-[var(--accent)]">
            Email
          </dt>
          <dd className="mt-2">
            <a
              href={`mailto:${site.email}`}
              className="text-lg text-[var(--text)] underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs font-medium text-[var(--accent)]">
            Phone
          </dt>
          <dd className="mt-2">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-lg text-[var(--text)] underline-offset-4 hover:underline"
            >
              {site.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs font-medium text-[var(--accent)]">
            WhatsApp
          </dt>
          <dd className="mt-2">
            <a
              href={site.whatsapp}
              className="text-lg text-[var(--text)] underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {site.whatsappDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs font-medium text-[var(--accent)]">
            Profiles
          </dt>
          <dd>
            <SocialLinks variant="contact" />
          </dd>
        </div>
      </dl>
    </div>
  );
}
