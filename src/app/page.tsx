import type { Metadata } from "next";
import Link from "next/link";
import { ProfileAvatar } from "@/components/profile-avatar";
import { MobileStoreStrip } from "@/components/mobile-store-strip";
import { ProjectThumb } from "@/components/project-thumb";
import { experience } from "@/content/experience";
import {
  headline,
  skillGroups,
  summary,
  unescoRecognition,
} from "@/content/profile";
import { education } from "@/content/education";
import {
  getProjectThumbSrc,
  isWebProject,
  projects,
  type Project,
} from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  isHome: true,
});

function stackChips() {
  return skillGroups
    .flatMap((g) => g.items)
    .slice(0, 14)
    .join(" · ");
}

function FeaturedProjectRow({
  project: p,
  index,
}: {
  project: Project;
  index: number;
}) {
  const thumb = getProjectThumbSrc(p);
  const flip = index % 2 === 1;

  const body = (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg font-semibold text-[var(--text)]">
          <Link
            href={`/work/${p.slug}`}
            className="transition-colors hover:text-[var(--accent)]"
          >
            {p.name}
          </Link>
        </h3>
        <span className="font-mono text-xs text-[var(--muted)]">{p.period}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
        {p.tagline}
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[var(--muted)]">
        {p.stack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
        <Link
          href={`/work/${p.slug}`}
          className="text-[var(--accent)] underline-offset-4 hover:underline"
        >
          {p.detailMd ? "Case study →" : "Overview →"}
        </Link>
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
      </div>
    </div>
  );

  const media = !isWebProject(p) ? (
    <div className="w-full max-w-xl shrink-0">
      <MobileStoreStrip
        project={p}
        href={`/work/${p.slug}`}
        compact
      />
    </div>
  ) : thumb ? (
    <Link
      href={`/work/${p.slug}`}
      className="block shrink-0"
      aria-label={`${p.name} — open project`}
    >
      <ProjectThumb src={thumb} alt={p.name} />
    </Link>
  ) : (
    <div className="aspect-[16/10] w-full rounded-lg border border-dashed border-[var(--border)] bg-[var(--accent-dim)]/40" />
  );

  return (
    <li>
      <article className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {flip ? (
          <>
            <div className="lg:order-2">{media}</div>
            <div className="lg:order-1">{body}</div>
          </>
        ) : (
          <>
            {media}
            {body}
          </>
        )}
      </article>
    </li>
  );
}

export default function HomePage() {
  const mobile = projects.filter((p) => !isWebProject(p));
  const featured: Project[] = mobile.slice(0, 3);

  return (
    <div className="max-w-3xl">
      <section id="about" className="scroll-mt-28">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          About
        </h2>
        <div className="mt-5 flex flex-col gap-8 sm:flex-row sm:items-start">
          <ProfileAvatar
            className="shrink-0 max-sm:mx-auto sm:mt-1"
            size={112}
            priority
          />
          <div className="min-w-0 space-y-4 text-[15px] leading-relaxed text-[var(--muted)]">
            <p className="text-lg font-medium leading-snug text-[var(--text)]">
              {headline}
            </p>
            {summary.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="font-mono text-xs leading-relaxed text-[var(--muted)]">
              {stackChips()}
            </p>
            <p>
              <span className="font-medium text-[var(--text)]">
                {unescoRecognition.title}
              </span>
              {" — "}
              {unescoRecognition.org}, {unescoRecognition.date}.{" "}
              {unescoRecognition.detail}
            </p>
            <p>
              <Link
                href="/about"
                className="font-mono text-sm text-[var(--accent)] underline-offset-4 hover:underline"
              >
                More on About →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-28 mt-20">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Experience
        </h2>
        <ul className="mt-8 space-y-12">
          {experience.map((role) => (
            <li key={`${role.company}-${role.dates}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-semibold text-[var(--text)]">
                  {role.title} · {role.company}
                </h3>
                <span className="font-mono text-xs text-[var(--muted)] sm:shrink-0 sm:pl-4">
                  {role.dates}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {role.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {role.summary}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="education" className="scroll-mt-28 mt-20">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Education
        </h2>
        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-6">
          <p className="font-medium text-[var(--text)]">{education.degree}</p>
          <p className="mt-1 text-[var(--muted)]">{education.school}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{education.years}</p>
          <p className="mt-3 text-sm text-[var(--text)]">
            {education.gpaLabel}{" "}
            <strong className="font-semibold">{education.gpa}</strong> /{" "}
            {education.gpaScale}
          </p>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 mt-24">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Projects
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          Three mobile products first—React Native and native Kotlin/Swift where
          it mattered. For Next.js marketing and product sites, see the full{" "}
          <Link
            href="/work"
            className="text-[var(--accent)] underline-offset-4 hover:underline"
          >
            work archive
          </Link>
          .
        </p>
        <ul className="mt-14 space-y-20">
          {featured.map((p, i) => (
            <FeaturedProjectRow key={p.slug} project={p} index={i} />
          ))}
        </ul>
        <p className="mt-14">
          <Link
            href="/work"
            className="font-mono text-sm text-[var(--accent)] underline-offset-4 hover:underline"
          >
            View full project archive →
          </Link>
        </p>
      </section>

      <section className="mt-20 border-t border-[var(--border)] pt-12">
        <p className="text-sm text-[var(--muted)]">
          Interested in working together?{" "}
          <Link
            href="/contact"
            className="font-mono text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Say hello →
          </Link>
        </p>
      </section>
    </div>
  );
}
