type Props = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Project card preview. Uses a plain `img` so `/api/site-preview` redirects to
 * third-party CDNs without Next/Image remotePatterns churn.
 */
export function ProjectThumb({ src, alt, className }: Props) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--accent-dim)] ${className ?? ""}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
