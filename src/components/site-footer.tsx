import { SocialLinks } from "@/components/social-links";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-[var(--border)] pt-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-[var(--muted)]">
          © {year} {site.name}
        </p>
        <SocialLinks variant="footer" />
      </div>
    </footer>
  );
}
