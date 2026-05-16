import Link from "next/link";
import { getMobileStripSlots, type Project } from "@/content/projects";

type Props = {
  project: Project;
  /** Wrap previews in a link to the case study */
  href?: string;
  /** Tighter layout for the home featured grid */
  compact?: boolean;
};

function safeImgSrc(path: string) {
  try {
    return encodeURI(path);
  } catch {
    return path;
  }
}

/** Screenshot as-is: no device frame—natural aspect, border + shadow only. */
function RawShot({
  src,
  alt,
  compact,
}: {
  src: string | null;
  alt: string;
  compact?: boolean;
}) {
  const maxH = compact
    ? "max-h-[min(42vh,320px)]"
    : "max-h-[min(52vh,460px)]";

  if (src) {
    return (
      <img
        src={safeImgSrc(src)}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`mx-auto block w-auto max-w-full rounded-lg border border-[var(--border)] bg-black/15 object-contain object-top shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] ${maxH}`}
      />
    );
  }

  return (
    <div
      className={`flex min-h-[120px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--border)] bg-[var(--accent-dim)]/30 px-2 py-6 text-center ${maxH}`}
    >
      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
        Previews soon
      </span>
      <span className="max-w-[14rem] text-[10px] leading-snug text-[var(--muted)]/80">
        I&apos;ll add screens here when I&apos;m allowed to share them—some of
        this work is still under NDA.
      </span>
    </div>
  );
}

/** Three-up strip of real screenshots (no device chrome). */
export function MobileStoreStrip({ project, href, compact }: Props) {
  const slots = getMobileStripSlots(project);
  const inner = (
    <div
      className={`flex items-start justify-center gap-2 sm:gap-4 ${compact ? "" : "lg:justify-end"}`}
    >
      {slots.map((src, i) => (
        <div
          key={`${project.slug}-slot-${i}`}
          className="flex min-w-0 flex-1 basis-0 justify-center"
        >
          <RawShot
            src={src}
            alt={src ? `${project.name} screenshot ${i + 1}` : `${project.name} placeholder`}
            compact={compact}
          />
        </div>
      ))}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus-visible:outline-none"
        aria-label={`${project.name} — open case study`}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

/** Horizontal scroll of screenshots (no device chrome). */
export function MobileScreenshotCarousel({
  sources,
  projectName,
  /** Lighter treatment: no border/shadow box—images read as raw captures. */
  bare = false,
}: {
  sources: string[];
  projectName: string;
  bare?: boolean;
}) {
  if (sources.length === 0) return null;

  const imgClass = bare
    ? "mx-auto block h-auto max-h-[min(82vh,760px)] w-full max-w-full object-contain object-top"
    : "mx-auto block h-auto max-h-[min(70vh,640px)] w-full max-w-full rounded-lg border border-[var(--border)] bg-black/15 object-contain object-top shadow-[0_16px_48px_-10px_rgba(0,0,0,0.5)]";

  return (
    <div className="relative -mx-1">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1 [scrollbar-width:thin] sm:gap-5">
        {sources.map((src, i) => (
          <figure
            key={src}
            className="w-[min(78vw,320px)] shrink-0 snap-center sm:w-[min(62vw,380px)]"
          >
            <img
              src={safeImgSrc(src)}
              alt={`${projectName} screenshot ${i + 1}`}
              loading="lazy"
              decoding="async"
              className={imgClass}
            />
            <figcaption className="sr-only">
              {projectName} screenshot {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-1 font-mono text-[10px] text-[var(--muted)]" aria-hidden>
        Scroll for more →
      </p>
    </div>
  );
}
