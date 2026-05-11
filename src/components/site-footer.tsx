import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-sm text-[var(--muted)]">
          © {year} {site.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-6 text-sm">
          <Link
            href={site.github}
            className="text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            href={site.linkedin}
            className="text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
