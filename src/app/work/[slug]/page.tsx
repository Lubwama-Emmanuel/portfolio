import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyGallery } from "@/components/case-study-gallery";
import { InterviewTakeaways } from "@/components/interview-takeaways";
import { ProjectMarkdownBody } from "@/components/project-markdown-body";
import { getProjectBySlug, getProjectThumbSrc, isWebProject, projects } from "@/content/projects";
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
  const thumb = getProjectThumbSrc(project);
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
      images: thumb ? [{ url: thumb }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Emmanuel Lubwama`,
      description: project.tagline,
      images: thumb ? [thumb] : undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const markdown = project.detailMd ? readProjectMarkdown(project) : null;
  const web = isWebProject(project);
  const takeaways =
    (project.interviewTakeaways?.length ?? 0) > 0
      ? project.interviewTakeaways!
      : project.highlights;

  return (
    <article className="max-w-3xl py-6 lg:py-8">
      <p className="font-mono text-sm font-medium text-[var(--accent)]">
        {web ? "Web project" : "Case study"}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--muted)]">
        <span>{project.period}</span>
        <span className="text-[var(--accent)]">{web ? "Web" : "Mobile"}</span>
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        {project.name}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{project.tagline}</p>

      <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[var(--muted)]">
        {project.stack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--border)] pb-10 font-mono text-xs">
        <Link
          href="/work"
          className="text-[var(--accent)] underline-offset-4 hover:underline"
        >
          ← All work
        </Link>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            className="text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Live site ↗
          </a>
        ) : null}
        {project.href ? (
          <a
            href={project.href}
            className="text-[var(--accent)] underline-offset-4 hover:underline"
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
            {web ? (
              <>
                I can add a long-form write-up for this site in{" "}
                <code className="rounded bg-[var(--accent-dim)] px-1.5 py-0.5 text-sm text-[var(--text)]">
                  projects/
                </code>{" "}
                and wire it through{" "}
                <code className="rounded bg-[var(--accent-dim)] px-1.5 py-0.5 text-sm text-[var(--text)]">
                  detailMd
                </code>{" "}
                when you want more narrative beside the live URL.
              </>
            ) : (
              <>
                A detailed write-up for this project is not in the repo yet. Add
                a markdown file under{" "}
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
              </>
            )}
          </p>
          <h2 className="mt-10 text-lg font-semibold text-[var(--text)]">
            Highlights
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      <CaseStudyGallery project={project} />

      <InterviewTakeaways bullets={takeaways} />
    </article>
  );
}
