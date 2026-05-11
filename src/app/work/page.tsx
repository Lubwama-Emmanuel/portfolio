import type { Metadata } from "next";
import Link from "next/link";
import { ProjectThumb } from "@/components/project-thumb";
import {
  getProjectThumbSrc,
  isWebProject,
  projects,
  type Project,
} from "@/content/projects";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites and mobile apps: Next.js marketing sites, React Native and native Kotlin/Swift products, fintech, and community platforms.",
  alternates: {
    canonical: `${getSiteUrl()}/work`,
  },
};

function ProjectLinks({ p }: { p: Project }) {
  const hasCaseStudy = Boolean(p.detailMd);
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
      {hasCaseStudy ? (
        <Link
          href={`/work/${p.slug}`}
          className="text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Case study →
        </Link>
      ) : (
        <Link
          href={`/work/${p.slug}`}
          className="text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Overview →
        </Link>
      )}
      {p.liveUrl ? (
        <a
          href={p.liveUrl}
          className="text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Live site ↗
        </a>
      ) : null}
      {p.href ? (
        <a
          href={p.href}
          className="text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          App Store ↗
        </a>
      ) : null}
      {!p.liveUrl && !p.href && p.category !== "web" ? (
        <span className="text-[var(--muted)]">Store link soon</span>
      ) : null}
    </div>
  );
}

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const thumb = getProjectThumbSrc(p);
  const flip = index % 2 === 1;

  const text = (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          <Link
            href={`/work/${p.slug}`}
            className="transition-colors hover:text-[var(--accent)]"
          >
            {p.name}
          </Link>
        </h2>
        <span className="font-mono text-xs text-[var(--muted)]">{p.period}</span>
        <span className="font-mono text-xs text-[var(--accent)]">
          {p.category === "web" ? "Web" : "Mobile"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
        {p.tagline}
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="text-[var(--accent)]" aria-hidden>
              ·
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[var(--muted)]">
        {p.stack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="mt-5">
        <ProjectLinks p={p} />
      </div>
    </div>
  );

  const media = thumb ? (
    <Link
      href={`/work/${p.slug}`}
      className="block shrink-0 lg:max-w-md"
      aria-label={`${p.name} — open project`}
    >
      <ProjectThumb src={thumb} alt={p.name} />
    </Link>
  ) : (
    <div className="aspect-[16/10] w-full max-w-md rounded-lg border border-dashed border-[var(--border)] bg-[var(--accent-dim)]/30" />
  );

  return (
    <li>
      <article className="grid gap-8 border-t border-[var(--border)] pt-12 lg:grid-cols-2 lg:items-start lg:gap-10">
        {flip ? (
          <>
            <div className="lg:order-2">{media}</div>
            <div className="lg:order-1">{text}</div>
          </>
        ) : (
          <>
            {media}
            {text}
          </>
        )}
      </article>
    </li>
  );
}

export default function WorkPage() {
  const web = projects.filter(isWebProject);
  const mobile = projects.filter((p) => !isWebProject(p));

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        Websites &amp; mobile products
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
        Next.js sites for schools, care providers, and brands—plus React Native
        and Kotlin/Swift apps for fintech, commerce, and community platforms.
      </p>

      <section className="mt-16">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Web
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Marketing and product sites deployed on Vercel or the open web.
        </p>
        <ul className="mt-10 space-y-0">
          {web.map((p, i) => (
            <ProjectRow key={p.slug} p={p} index={i} />
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Mobile &amp; native
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Production apps with deep integrations, offline-aware flows, and store
          releases where applicable.
        </p>
        <ul className="mt-10 space-y-0">
          {mobile.map((p, i) => (
            <ProjectRow key={p.slug} p={p} index={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}
