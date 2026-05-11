"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_CLASS = "custom-cursor-active";

/**
 * Ambient spotlight + custom cursor (fine pointers only).
 * Uses exponential smoothing with real frame deltas so motion stays even at
 * 60/120/144 Hz. Hides the system cursor while using the mouse; Tab restores
 * it for keyboard users.
 */
export function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0 });
  /** Smoothed light center (was snapping to pointer each frame). */
  const spotlight = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const loopId = useRef(0);
  const inputFromKeys = useRef(false);

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
    ring.current = { x: cx, y: cy };
    dot.current = { x: cx, y: cy };

    root.style.setProperty("--spotlight-x", `${cx}px`);
    root.style.setProperty("--spotlight-y", `${cy}px`);

    const applyPointerChrome = () => {
      root.classList.add(CURSOR_CLASS);
      inputFromKeys.current = false;
    };

    const removePointerChrome = () => {
      root.classList.remove(CURSOR_CLASS);
      inputFromKeys.current = true;
    };

    applyPointerChrome();
    setEnabled(true);

    /** Frame-rate independent smoothing: higher = snappier, lower = silkier. */
    const L_SPOT = 9.5;
    const L_RING = 6.2;
    const L_DOT = 16;

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
      ring.current.x = smoothToward(ring.current.x, tx, dt, L_RING);
      ring.current.y = smoothToward(ring.current.y, ty, dt, L_RING);
      dot.current.x = smoothToward(dot.current.x, tx, dt, L_DOT);
      dot.current.y = smoothToward(dot.current.y, ty, dt, L_DOT);

      const sx = spotlight.current.x;
      const sy = spotlight.current.y;
      const rx = ring.current.x;
      const ry = ring.current.y;
      const dx = dot.current.x;
      const dy = dot.current.y;

      root.style.setProperty("--spotlight-x", `${sx}px`);
      root.style.setProperty("--spotlight-y", `${sy}px`);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }

      loopId.current = requestAnimationFrame(tick);
    };

    loopId.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (inputFromKeys.current) {
        applyPointerChrome();
      }
    };

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      removePointerChrome();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("keydown", onTab, true);

    return () => {
      alive.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onTab, true);
      cancelAnimationFrame(loopId.current);
      root.classList.remove(CURSOR_CLASS);
      root.style.removeProperty("--spotlight-x");
      root.style.removeProperty("--spotlight-y");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
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

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[10050] motion-reduce:hidden"
      >
        <div
          ref={ringRef}
          className="pointer-events-none fixed left-0 top-0 h-11 w-11 rounded-full border border-[rgba(255,239,179,0.42)] bg-[rgba(1,62,55,0.22)] shadow-[0_0_0_1px_rgba(255,239,179,0.08),0_0_36px_rgba(255,239,179,0.18),0_0_80px_rgba(255,239,179,0.08)] will-change-transform [backface-visibility:hidden]"
        />
        <div
          ref={dotRef}
          className="pointer-events-none fixed left-0 top-0 h-2 w-2 will-change-transform [backface-visibility:hidden]"
        >
          <div className="h-full w-full rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(255,239,179,0.85),0_0_28px_rgba(255,239,179,0.35)]" />
        </div>
      </div>
    </>
  );
}
