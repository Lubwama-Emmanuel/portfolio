"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  className?: string;
  size?: number;
  /** Prefer true above the fold (e.g. home hero) for LCP. */
  priority?: boolean;
};

/** Headshot from `public/emmanuel.jpg`. If the file is missing, initials render after load failure. */
export function ProfileAvatar({
  className = "",
  size = 160,
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--accent-dim)] font-display text-xl font-semibold text-[var(--text)] ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        EL
      </div>
    );
  }

  return (
    <Image
      src="/emmanuel.jpg"
      alt="Emmanuel Lubwama"
      width={size}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      className={`rounded-full border border-[var(--border)] object-cover ${className}`}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
