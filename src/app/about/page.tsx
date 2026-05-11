import type { Metadata } from "next";
import Link from "next/link";
import { ProfileAvatar } from "@/components/profile-avatar";
import { experience } from "@/content/experience";
import {
  seoDescription,
  skillGroups,
  summary,
  unescoRecognition,
} from "@/content/profile";
import { getSiteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: seoDescription,
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        I ship mobile products end-to-end
      </h1>

      <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-start">
        <ProfileAvatar
          className="shrink-0 max-sm:mx-auto"
          size={224}
        />
        <div className="space-y-5 text-lg leading-relaxed text-[var(--muted)]">
          <p className="text-[var(--text)]">
            I&apos;m <strong className="font-medium">Emmanuel Lubwama</strong>—a
            mobile engineer (React Native, Kotlin, Swift) based in{" "}
            <strong className="font-medium text-[var(--text)]">
              Kampala, Uganda
            </strong>
            . I&apos;ve worked with distributed remote teams since{" "}
            <strong className="font-medium text-[var(--text)]">2021</strong> and
            have spent{" "}
            <strong className="font-medium text-[var(--text)]">
              five years
            </strong>{" "}
            in production codebases where ownership means shipping to the App
            Store, not polishing internal demos.
          </p>
          {summary.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <aside className="mt-12 border border-[var(--border)] bg-[var(--accent-dim)]/40 p-6 sm:p-7">
        <p className="font-mono text-xs font-medium text-[var(--accent)]">
          Recognition
        </p>
        <p className="mt-3 text-xl font-semibold text-[var(--text)] sm:text-2xl">
          {unescoRecognition.title}
        </p>
        <p className="mt-2 text-sm font-medium text-[var(--text)]">
          {unescoRecognition.org} · {unescoRecognition.date}
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          {unescoRecognition.detail}
        </p>
      </aside>

      <section className="mt-14">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Education
        </h2>
        <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-6">
          <p className="font-medium text-[var(--text)]">
            B.Sc. Computer Engineering
          </p>
          <p className="mt-1 text-[var(--muted)]">Makerere University, Kampala</p>
          <p className="mt-2 text-sm text-[var(--muted)]">2018 – 2022</p>
          <p className="mt-3 text-sm text-[var(--text)]">
            GPA <strong className="font-semibold">4.03</strong> / 5.00
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Experience
        </h2>
        <ol className="mt-8 space-y-8 border-l border-[var(--border)] pl-6">
          {experience.map((role) => (
            <li key={`${role.company}-${role.dates}`} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]" />
              <p className="text-xs uppercase tracking-wider text-[var(--accent)]">
                {role.dates}
              </p>
              <p className="mt-1 font-medium text-[var(--text)]">{role.title}</p>
              <p className="text-sm text-[var(--muted)]">
                {role.company} · {role.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {role.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-sm font-medium text-[var(--accent)]">
          Core stack
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <li key={g.label}>
              <p className="text-sm font-semibold text-[var(--text)]">
                {g.label}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[var(--muted)]">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 flex flex-col gap-4 border-t border-[var(--border)] pt-10 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={site.resumePath}
          download
          className="font-mono text-sm text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Download résumé (Markdown) →
        </a>
        <p className="w-full text-xs text-[var(--muted)] sm:order-last">
          Export your PDF as <code className="text-[var(--text)]">public/resume.pdf</code>{" "}
          if you want a traditional PDF button alongside this file.
        </p>
        <Link
          href="/contact"
          className="font-mono text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
        >
          Contact →
        </Link>
        <a
          href={site.linkedin}
          className="font-mono text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn ↗
        </a>
      </div>
    </div>
  );
}
