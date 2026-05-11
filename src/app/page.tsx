import type { Metadata } from "next";
import Link from "next/link";
import { headline, summary } from "@/content/profile";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: getSiteUrl(),
  },
};

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-dim), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Software engineer
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            {summary[0]}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-medium text-[var(--on-accent)] transition-opacity hover:opacity-90"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--muted)]"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--muted)]">
              Approach
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-[var(--text)] sm:text-2xl sm:leading-snug">
              {summary[1]}
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 lg:p-10">
            <p className="text-sm text-[var(--muted)]">
              Currently focused on shipping polished mobile experiences,
              secure financial flows, and APIs that stay fast under load.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex w-fit text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              More about me →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)]/40 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--muted)]">
                Selected work
              </h2>
              <p className="mt-2 max-w-lg text-lg text-[var(--text)]">
                Apps shipped to production—fintech, community platforms, and
                commerce.
              </p>
            </div>
            <Link
              href="/work"
              className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              All projects →
            </Link>
          </div>
          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <article className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--muted)]">
                  <p className="text-xs text-[var(--muted)]">{p.period}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[var(--text)]">
                    <Link
                      href={`/work/${p.slug}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {p.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[var(--accent-dim)] px-2.5 py-0.5 text-xs text-[var(--accent)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <Link
                      href={`/work/${p.slug}`}
                      className="inline-flex text-sm font-medium text-[var(--accent)] underline-offset-4 group-hover:underline"
                    >
                      Case study →
                    </Link>
                    {p.href ? (
                      <a
                        href={p.href}
                        className="inline-flex text-sm font-medium text-[var(--text)] underline-offset-4 group-hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        App Store ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
