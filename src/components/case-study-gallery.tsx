import Image from "next/image";
import {
  getProjectGallerySources,
  isWebProject,
  type Project,
} from "@/content/projects";
import { PhoneFrame } from "@/components/phone-frame";

type Props = {
  project: Project;
};

export function CaseStudyGallery({ project }: Props) {
  const hadGallery = Boolean(project.gallery?.length);
  const shots = getProjectGallerySources(project);
  const webWidePreview =
    isWebProject(project) && shots.length > 0 && !hadGallery;

  if (shots.length === 0) {
    return (
      <section className="mt-14 border-t border-[var(--border)] pt-12">
        <h2 className="font-display text-xl font-semibold text-[var(--text)]">
          Product visuals
        </h2>
        <p className="mt-3 text-sm text-[var(--muted)]">
          I&apos;m adding device screenshots here as I export them. For store
          listings, you can also open the live app link above.
        </p>
        <div className="mt-8 flex justify-center">
          <PhoneFrame>
            <div className="flex aspect-[9/19] flex-col items-center justify-center gap-3 px-6 py-16 text-center">
              <span className="font-display text-lg font-semibold text-[var(--text)]">
                {project.name}
              </span>
              <span className="text-xs leading-relaxed text-[var(--muted)]">
                Screenshot placeholder—replace by adding images to{" "}
                <code className="rounded bg-white/10 px-1 py-0.5 text-[var(--accent)]">
                  gallery
                </code>{" "}
                in{" "}
                <code className="rounded bg-white/10 px-1 py-0.5 text-[var(--accent)]">
                  projects.ts
                </code>{" "}
                or under{" "}
                <code className="rounded bg-white/10 px-1 py-0.5 text-[var(--accent)]">
                  /public/projects/…
                </code>
                .
              </span>
            </div>
          </PhoneFrame>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14 border-t border-[var(--border)] pt-12">
      <h2 className="font-display text-xl font-semibold text-[var(--text)]">
        {isWebProject(project) ? "Site preview" : "Screenshots"}
      </h2>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        {shots.map((src) => (
          <figure key={src} className="flex flex-col items-center gap-3">
            {webWidePreview ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--accent-dim)]">
                <img
                  src={src}
                  alt={`${project.name} site preview`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            ) : (
              <PhoneFrame>
                <div className="relative aspect-[9/19] w-full">
                  <Image
                    src={src}
                    alt={`${project.name} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 280px"
                    unoptimized
                  />
                </div>
              </PhoneFrame>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
