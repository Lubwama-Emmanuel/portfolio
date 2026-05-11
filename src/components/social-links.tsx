import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { site } from "@/lib/site";

const items = [
  {
    key: "github",
    href: site.github,
    label: "GitHub",
    Icon: FaGithub,
    external: true,
  },
  {
    key: "linkedin",
    href: site.linkedin,
    label: "LinkedIn",
    Icon: FaLinkedin,
    external: true,
  },
  {
    key: "whatsapp",
    href: site.whatsapp,
    label: "WhatsApp",
    Icon: FaWhatsapp,
    external: true,
  },
  {
    key: "email",
    href: `mailto:${site.email}`,
    label: "Email",
    Icon: MdOutlineMail,
    external: false,
  },
] as const;

type Variant = "sidebar" | "footer" | "contact" | "mobile";

const styles: Record<
  Variant,
  { list: string; link: string; icon: string }
> = {
  sidebar: {
    list: "flex flex-col gap-2 font-mono text-xs text-[var(--muted)]",
    link: "inline-flex items-center gap-2.5 rounded-sm transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
    icon: "h-[1.05rem] w-[1.05rem] shrink-0 opacity-90",
  },
  footer: {
    list: "flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs",
    link: "inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
    icon: "h-[1.05rem] w-[1.05rem] shrink-0",
  },
  contact: {
    list: "mt-4 flex flex-wrap gap-x-6 gap-y-3",
    link: "inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
    icon: "h-5 w-5 shrink-0",
  },
  mobile: {
    list: "mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[var(--muted)] lg:hidden",
    link: "inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
    icon: "h-3.5 w-3.5 shrink-0 opacity-90",
  },
};

type Props = { variant: Variant };

export function SocialLinks({ variant }: Props) {
  const { list, link, icon } = styles[variant];

  return (
    <div className={list} role="navigation" aria-label="Social links">
      {items.map(({ key, href, label, Icon, external }) => (
        <a
          key={key}
          href={href}
          className={link}
          {...(external
            ? { rel: "noopener noreferrer", target: "_blank" as const }
            : {})}
        >
          <Icon className={icon} aria-hidden />
          {label}
        </a>
      ))}
    </div>
  );
}
