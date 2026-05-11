type Props = {
  title?: string;
  bullets: string[];
};

export function InterviewTakeaways({
  title = "Highlights",
  bullets,
}: Props) {
  if (!bullets.length) return null;
  return (
    <section className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-8 lg:p-10">
      <h2 className="font-display text-xl font-semibold text-[var(--text)]">
        {title}
      </h2>
      <ul className="mt-6 space-y-4 text-[var(--muted)]">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-base leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
