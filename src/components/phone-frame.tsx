import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** `store` — stronger bezel / shadow for App Store–style strips */
  variant?: "default" | "store";
};

export function PhoneFrame({
  children,
  className = "",
  variant = "default",
}: Props) {
  const shell =
    variant === "store"
      ? "rounded-[2.65rem] border-[3px] border-[var(--border)] bg-gradient-to-b from-black/40 to-black/60 p-[10px] shadow-[0_28px_90px_-14px_rgba(0,0,0,0.7),0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,239,179,0.08)]"
      : "rounded-[2.35rem] border-[3px] border-[var(--border)] bg-black/25 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)]";

  const inner =
    variant === "store"
      ? "rounded-[2.05rem] ring-1 ring-white/10"
      : "rounded-[1.85rem] ring-1 ring-white/5";

  return (
    <div className={`mx-auto w-full max-w-[280px] ${shell} ${className}`}>
      <div className={`overflow-hidden bg-[#0a1210] ${inner}`}>{children}</div>
    </div>
  );
}
