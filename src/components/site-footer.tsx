import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-[var(--border)] pt-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-[var(--muted)]">
          © {year} {site.name}
        </p>
        <div className="flex flex-wrap gap-6 font-mono text-xs">
          <Link
            href={site.github}
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            href={site.linkedin}
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
