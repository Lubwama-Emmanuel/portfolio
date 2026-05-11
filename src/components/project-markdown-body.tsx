import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { stripLeadingH1 } from "@/lib/project-detail";

type Props = {
  markdown: string;
};

export function ProjectMarkdownBody({ markdown }: Props) {
  const body = stripLeadingH1(markdown);

  return (
    <div className="md-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            const raw = typeof src === "string" ? src.trim() : "";
            const resolved =
              raw.startsWith("/") || raw.startsWith("http")
                ? raw
                : `/${raw.replace(/^\.?\//, "")}`;
            return (
              <img
                src={resolved}
                alt={alt ?? ""}
                className="my-8 block h-auto w-full max-w-full rounded-xl border border-[var(--border)] bg-black/15 object-contain"
                decoding="async"
              />
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium underline underline-offset-4 hover:opacity-90"
              rel="noopener noreferrer"
              target={href?.startsWith("http") ? "_blank" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
