import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMarkdownBody } from "@/components/project-markdown-body";
import { getProjectBySlug, projects } from "@/content/projects";
import { readProjectMarkdown } from "@/lib/project-detail";
import { getSiteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };

  const base = getSiteUrl();
  return {
    title: project.name,
    description: project.tagline,
    alternates: {
      canonical: `${base}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — Emmanuel Lubwama`,
      description: project.tagline,
      url: `${base}/work/${project.slug}`,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const markdown = project.detailMd ? readProjectMarkdown(project) : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
        Case study
      </p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        {project.name}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{project.tagline}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.period}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 border-b border-[var(--border)] pb-10">
        <Link
          href="/work"
          className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          ← All work
        </Link>
        {project.href ? (
          <a
            href={project.href}
            className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            App Store ↗
          </a>
        ) : null}
      </div>

      {markdown ? (
        <ProjectMarkdownBody markdown={markdown} />
      ) : (
        <div className="md-prose mt-12">
          <p className="text-[var(--muted)]">
            A detailed write-up for this project is not in the repo yet. Add a
            markdown file under{" "}
            <code className="rounded bg-[var(--accent-dim)] px-1.5 py-0.5 text-sm text-[var(--text)]">
              projects/&lt;folder&gt;/your-file.md
            </code>{" "}
            and reference it from{" "}
            <code className="rounded bg-[var(--accent-dim)] px-1.5 py-0.5 text-sm text-[var(--text)]">
              detailMd
            </code>{" "}
            in{" "}
            <code className="rounded bg-[var(--accent-dim)] px-1.5 py-0.5 text-sm text-[var(--text)]">
              src/content/projects.ts
            </code>
            .
          </p>
          <h2 className="mt-10 font-display text-xl font-semibold text-[var(--text)]">
            Highlights
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
