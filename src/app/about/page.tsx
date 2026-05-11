import type { Metadata } from "next";
import Link from "next/link";
import { headline, skillGroups, summary } from "@/content/profile";
import { getSiteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${headline} ${summary[0]}`,
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
        About
      </p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        Building products end-to-end
      </h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--muted)]">
        {summary.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-10 text-[var(--text)]">
        I&apos;m based in{" "}
        <span className="text-[var(--muted)]">Kampala, Uganda</span>, and work
        with distributed teams. Reach me via{" "}
        <Link
          href="/contact"
          className="text-[var(--accent)] underline-offset-4 hover:underline"
        >
          contact
        </Link>{" "}
        or{" "}
        <a
          href={site.linkedin}
          className="text-[var(--accent)] underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        .
      </p>

      <h2 className="mt-16 text-sm font-medium uppercase tracking-[0.15em] text-[var(--muted)]">
        Capabilities
      </h2>
      <ul className="mt-8 grid gap-10 sm:grid-cols-3">
        {skillGroups.map((g) => (
          <li key={g.label}>
            <p className="text-sm font-medium text-[var(--text)]">{g.label}</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
