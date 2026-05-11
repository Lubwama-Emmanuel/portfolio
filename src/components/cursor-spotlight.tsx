"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient accent spotlight that follows the pointer (fine pointers only).
 * Exponential smoothing with real frame deltas for even motion at any refresh rate.
 */
export function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);

  const target = useRef({ x: 0, y: 0 });
  const spotlight = useRef({ x: 0, y: 0 });
  const loopId = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = document.documentElement;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;

    target.current = { x: cx, y: cy };
    spotlight.current = { x: cx, y: cy };

    root.style.setProperty("--spotlight-x", `${cx}px`);
    root.style.setProperty("--spotlight-y", `${cy}px`);

    setEnabled(true);

    const L_SPOT = 9.5;

    const smoothToward = (
      cur: number,
      dest: number,
      dt: number,
      lambda: number,
    ) => {
      const t = 1 - Math.exp(-lambda * dt);
      return cur + (dest - cur) * t;
    };

    const alive = { current: true };
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (!alive.current) return;

      const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.05);
      lastTime = now;

      const tx = target.current.x;
      const ty = target.current.y;

      spotlight.current.x = smoothToward(spotlight.current.x, tx, dt, L_SPOT);
      spotlight.current.y = smoothToward(spotlight.current.y, ty, dt, L_SPOT);

      root.style.setProperty("--spotlight-x", `${spotlight.current.x}px`);
      root.style.setProperty("--spotlight-y", `${spotlight.current.y}px`);

      loopId.current = requestAnimationFrame(tick);
    };

    loopId.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      alive.current = false;
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(loopId.current);
      root.style.removeProperty("--spotlight-x");
      root.style.removeProperty("--spotlight-y");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 motion-reduce:hidden"
      style={{
        background: `
            radial-gradient(
              320px circle at var(--spotlight-x) var(--spotlight-y),
              rgba(255, 239, 179, 0.34) 0%,
              rgba(255, 239, 179, 0.14) 18%,
              rgba(255, 239, 179, 0.05) 38%,
              rgba(255, 239, 179, 0.02) 52%,
              transparent 72%
            ),
            radial-gradient(
              1100px circle at var(--spotlight-x) var(--spotlight-y),
              rgba(255, 239, 179, 0.11) 0%,
              rgba(255, 239, 179, 0.04) 35%,
              transparent 58%
            )
          `,
        mixBlendMode: "soft-light",
        opacity: 0.92,
      }}
    />
  );
}
