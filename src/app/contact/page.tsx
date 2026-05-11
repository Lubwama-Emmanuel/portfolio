import type { Metadata } from "next";
import { getSiteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — ${site.email}. Open to senior mobile and full-stack roles.`,
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
        Contact
      </p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        Let&apos;s work together
      </h1>
      <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
        I&apos;m open to senior mobile and full-stack opportunities, contract
        work, and interesting product collaborations.
      </p>

      <dl className="mt-14 space-y-8 border-t border-[var(--border)] pt-14">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
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
          <dt className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
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
          <dt className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Profiles
          </dt>
          <dd className="mt-4 flex flex-wrap gap-6">
            <a
              href={site.github}
              className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
