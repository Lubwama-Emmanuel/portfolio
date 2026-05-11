import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function PhoneFrame({ children, className = "" }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-[280px] rounded-[2.35rem] border-[3px] border-[var(--border)] bg-black/25 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.85rem] bg-[#0a1210] ring-1 ring-white/5">
        {children}
      </div>
    </div>
  );
}
