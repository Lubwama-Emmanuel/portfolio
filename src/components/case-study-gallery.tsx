import {
  getProjectGallerySources,
  isWebProject,
  type Project,
} from "@/content/projects";
import { MobileScreenshotCarousel } from "@/components/mobile-store-strip";

type Props = {
  project: Project;
  /**
   * `lead` — top of case study: no top rule, lighter chrome, natural aspect for web shots.
   * `default` — legacy position below body (full section chrome).
   */
  placement?: "lead" | "default";
};

export function CaseStudyGallery({ project, placement = "default" }: Props) {
  const hadGallery = Boolean(project.gallery?.length);
  const shots = getProjectGallerySources(project);
  const webWidePreview =
    isWebProject(project) && shots.length > 0 && !hadGallery;
  const web = isWebProject(project);
  const isLead = placement === "lead";

  const sectionClass = isLead
    ? "mt-10"
    : "mt-14 border-t border-[var(--border)] pt-12";

  if (shots.length === 0) {
    return (
      <section className={sectionClass}>
        <h2 className="font-display text-xl font-semibold text-[var(--text)]">
          Product visuals
        </h2>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Screenshots for this project will appear here when they are added.
        </p>
      </section>
    );
  }

  const headingClass = isLead
    ? "font-display text-lg font-semibold text-[var(--text)]"
    : "font-display text-xl font-semibold text-[var(--text)]";

  const webImgClass = isLead
    ? "mx-auto block h-auto w-full max-w-full max-h-[min(72vh,620px)] object-contain object-top"
    : "absolute inset-0 h-full w-full object-cover object-top";

  const webFigureWrap = isLead
    ? "mt-8 flex flex-col items-center gap-2"
    : "mt-8 flex flex-col items-center gap-3";

  const webImgContainer = isLead
    ? "w-full overflow-visible"
    : "relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--accent-dim)]";

  return (
    <section className={sectionClass}>
      <h2 className={headingClass}>
        {web ? "Site preview" : "App previews"}
      </h2>
      {!web ? (
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Simulator and device captures—scroll horizontally to see more
          screens.
        </p>
      ) : null}

      {webWidePreview ? (
        <div className={webFigureWrap}>
          {shots.map((src) => (
            <figure key={src} className="flex w-full flex-col items-center gap-2">
              <div className={webImgContainer}>
                <img
                  src={src}
                  alt={`${project.name} site preview`}
                  loading="lazy"
                  decoding="async"
                  className={webImgClass}
                />
              </div>
            </figure>
          ))}
        </div>
      ) : !web ? (
        <div className="mt-8">
          <MobileScreenshotCarousel
            sources={shots}
            projectName={project.name}
            bare={isLead}
          />
        </div>
      ) : (
        <div
          className={
            isLead
              ? "mt-8 flex flex-col gap-10"
              : "mt-8 grid gap-10 sm:grid-cols-2"
          }
        >
          {shots.map((src) => (
            <figure key={src} className="flex flex-col items-center gap-2">
              <div className={webImgContainer}>
                <img
                  src={src}
                  alt={`${project.name} site preview`}
                  loading="lazy"
                  decoding="async"
                  className={webImgClass}
                />
              </div>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
