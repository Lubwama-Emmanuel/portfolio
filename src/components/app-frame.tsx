"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuGlobe, LuSmartphone } from "react-icons/lu";
import { SiteFooter } from "@/components/site-footer";
import { SocialLinks } from "@/components/social-links";
import { isWebProject, projects } from "@/content/projects";

const mainNav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active =
    href === "/work"
      ? pathname === "/work" || pathname.startsWith("/work/")
      : pathname === href;

  return (
    <Link
      href={href}
      className={`block text-sm transition-colors ${
        active
          ? "font-medium text-[var(--accent)]"
          : "text-[var(--muted)] hover:text-[var(--text)]"
      }`}
    >
      {label}
    </Link>
  );
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isWorkIndex = pathname === "/work";
  const workMobile = projects.filter((p) => !isWebProject(p));
  const workWeb = projects.filter(isWebProject);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:m-0 focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:font-medium focus:whitespace-normal focus:text-[var(--on-accent)]"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-8 lg:flex lg:max-w-6xl lg:gap-x-14 lg:px-12 lg:pt-14 xl:gap-x-20">
        <header className="mb-10 shrink-0 lg:sticky lg:top-10 lg:mb-0 lg:w-44 lg:self-start xl:w-48">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-[var(--text)] transition-colors hover:text-[var(--accent)]"
          >
            Emmanuel Lubwama
          </Link>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--muted)]">
            Software engineer
            <br />
            Mobile &amp; web products.
          </p>

          <nav
            className="mt-8 hidden flex-col gap-3 border-t border-[var(--border)] pt-6 font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)] lg:flex"
            aria-label="Primary"
          >
            {mainNav.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} />
            ))}
          </nav>

          {isHome ? (
            <nav
              className="mt-8 hidden flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] lg:flex"
              aria-label="On this page"
            >
              <span className="text-[var(--accent)]">On this page</span>
              <a className="block hover:text-[var(--text)]" href="#about">
                About
              </a>
              <a className="block hover:text-[var(--text)]" href="#experience">
                Experience
              </a>
              <a className="block hover:text-[var(--text)]" href="#education">
                Education
              </a>
              <a className="block hover:text-[var(--text)]" href="#projects">
                Projects
              </a>
            </nav>
          ) : isWorkIndex ? (
            <nav
              className="mt-8 hidden flex-col gap-2 font-mono text-[11px] text-[var(--muted)] lg:flex"
              aria-label="On this page"
            >
              <span className="uppercase tracking-[0.14em] text-[var(--accent)]">
                On this page
              </span>
              <a
                className="block uppercase tracking-[0.14em] hover:text-[var(--text)]"
                href="#work-mobile"
              >
                Mobile &amp; native
              </a>
              {workMobile.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="flex items-start gap-2 pl-2 normal-case tracking-normal hover:text-[var(--text)]"
                >
                  <LuSmartphone
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  <span className="min-w-0 leading-snug">{p.name}</span>
                </a>
              ))}
              <a
                className="mt-1 block uppercase tracking-[0.14em] hover:text-[var(--text)]"
                href="#work-web"
              >
                Web
              </a>
              {workWeb.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="flex items-start gap-2 pl-2 normal-case tracking-normal hover:text-[var(--text)]"
                >
                  <LuGlobe
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  <span className="min-w-0 leading-snug">{p.name}</span>
                </a>
              ))}
            </nav>
          ) : null}

          <div className="mt-8 hidden lg:block">
            <SocialLinks variant="sidebar" />
          </div>

          <nav
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border)] pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] lg:hidden"
            aria-label="Primary"
          >
            {mainNav.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} />
            ))}
          </nav>
          <SocialLinks variant="mobile" />
        </header>

        <div className="flex min-w-0 flex-1 flex-col">
          <main id="main-content" className="min-w-0 flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
