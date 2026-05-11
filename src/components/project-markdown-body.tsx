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
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element -- CMS-style paths from /public
            <img
              src={src ?? ""}
              alt={alt ?? ""}
              className="my-8 w-full max-w-full rounded-xl border border-[var(--border)] bg-black/15 object-contain"
              loading="lazy"
            />
          ),
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
