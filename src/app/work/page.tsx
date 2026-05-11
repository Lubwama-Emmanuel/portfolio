import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects: React Native and Next.js apps for fintech, community platforms, e-commerce, and monitoring.",
  alternates: {
    canonical: `${getSiteUrl()}/work`,
  },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
        Work
      </p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        Projects shipped to real users
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
        Mobile-first products with thoughtful UX, solid backends, and
        production-grade releases.
      </p>

      <ul className="mt-16 space-y-6">
        {projects.map((p) => (
          <li key={p.slug}>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-8 transition-colors hover:border-[var(--muted)] lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs text-[var(--muted)]">{p.period}</p>
                  <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
                    <Link
                      href={`/work/${p.slug}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      {p.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[var(--muted)]">{p.tagline}</p>
                  <ul className="mt-6 space-y-2 text-sm text-[var(--text)]">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-[var(--accent)]" aria-hidden>
                          ·
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <Link
                      href={`/work/${p.slug}`}
                      className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      Case study →
                    </Link>
                    {p.href ? (
                      <a
                        href={p.href}
                        className="text-sm font-medium text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        App Store ↗
                      </a>
                    ) : (
                      <span className="text-sm text-[var(--muted)]">
                        App listing soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
