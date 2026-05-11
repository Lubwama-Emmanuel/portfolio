export type ProjectCategory = "mobile" | "web";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  /** App Store or primary product URL when not using liveUrl */
  href?: string;
  /** Marketing / deployed site (typical for web projects) */
  liveUrl?: string;
  stack: string[];
  highlights: string[];
  category?: ProjectCategory;
  /**
   * Thumbnail URL: `public/…`, absolute URL, or `/site-assets/websites/{slug}.png`
   * for files in `projects/websites/`. When omitted, web projects use `/api/site-preview`.
   */
  image?: string;
  /**
   * Markdown case study under `projects/` (images via `/project-files/<slug>/file.jpg`).
   */
  detailMd?: string;
  /** Screenshots: `/project-files/<slug>/file` (files next to markdown) or `/projects/...` from `public/`. */
  gallery?: string[];
  /** Plain-language interview cues; if omitted, highlights are reused on the case study page. */
  interviewTakeaways?: string[];
};

export const projects: Project[] = [
  // ── Web ──
  {
    slug: "space4climate",
    name: "Space4Climate",
    tagline:
      "Fun, online educational experience for schoolkids globally about space and climate change, combining film-making and social media.",
    period: "2024",
    category: "web",
    liveUrl: "https://space4climate.vercel.app",
    image: "/site-assets/websites/space4climate.png",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    highlights: [
      "Global, kid-friendly learning on space and climate",
      "Film and social-style storytelling on the web",
      "Deployed on Vercel for fast, reliable delivery",
    ],
  },
  {
    slug: "masifa",
    name: "Masifa Group",
    tagline:
      "OFSTED-registered children's homes website for a specialist SEMH/EBD care provider—referrals, activities, and careers.",
    period: "2024",
    category: "web",
    liveUrl: "https://masifa.vercel.app",
    image: "/site-assets/websites/masifa.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Clear pathways for referrals and family enquiries",
      "Activities and day-in-the-life content for trust-building",
      "Careers and recruitment sections for care professionals",
    ],
  },
  {
    slug: "queensgate",
    name: "Queensgate International School",
    tagline:
      "Full-featured school site for an Ontario-certified online international school—admissions, academics, and a multi-step application flow.",
    period: "2024",
    category: "web",
    liveUrl: "https://queensgate.vercel.app",
    image: "/site-assets/websites/queensgate.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Structured admissions and programme discovery",
      "Multi-step application UX with strong information hierarchy",
      "Motion-backed UI for a polished institutional brand",
    ],
  },
  {
    slug: "nextgenfighthub",
    name: "Next Gen Fight Hub",
    tagline:
      "Gym website for Muay Thai, Boxing & MMA in Basildon, Essex—schedules, membership tiers, and a community hub.",
    period: "2024",
    category: "web",
    liveUrl: "https://nextgenfighthub.vercel.app",
    image: "/site-assets/websites/nextgenfighthub.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Class schedules and training programmes front and centre",
      "Membership tiers and pricing communicated clearly",
      "Community-focused hub for retention and sign-ups",
    ],
  },
  {
    slug: "mashongatea",
    name: "Mashongatea",
    tagline:
      "Professional business website—services, portfolio, responsive layout, and performance-focused delivery.",
    period: "2024",
    category: "web",
    liveUrl: "https://www.mashongatea.com",
    image: "/site-assets/websites/mashongatea.png",
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Service and portfolio storytelling for B2B credibility",
      "Responsive layouts across breakpoints",
      "Optimised static and dynamic patterns for speed",
    ],
  },
  {
    slug: "actualisationproject",
    name: "The Actualisation Project",
    tagline:
      "Coaching and mentorship platform—truth, connection, and change—with assessments, programmes, and 1:1 coaching.",
    period: "2024",
    category: "web",
    liveUrl: "https://theactualisationproject.vercel.app",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    highlights: [
      "Assessment and programme discovery flows",
      "1:1 coaching positioning and clear CTAs",
      "Warm, editorial UI aligned with the brand voice",
    ],
  },

  // ── Mobile & other product work ──
  {
    slug: "wire24",
    name: "Wire24",
    category: "mobile",
    tagline:
      "Cross-platform fintech: mobile money, bank transfers, merchant payments, and wallet flows where trust is part of the UI.",
    period: "2023–2025",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Firebase",
      "Socket.IO",
      "NativeWind",
    ],
    highlights: [
      "Founding engineer on money movement: wallets, transfers, merchants, KYC",
      "Payment integrations and live balances wired to the production backend",
      "Architecture calls on persistence, RTK Query, and safe native feature rollout",
    ],
    interviewTakeaways: [
      "I joined early enough that product sense meant sequencing what not to build yet—while still shipping something users could move money through every sprint.",
      "Financial UX forced me to design for panic: loading, retry, and empty states had to answer “where is my money?” without a support ticket.",
      "I shipped iOS widgets and Live Activities only where they reduced anxiety; on Android I kept builds stable by refusing to load native modules that do not exist on that platform.",
    ],
    detailMd: "Wire24/PORTFOLIO-WIRE24.md",
  },
  {
    slug: "cafe-jafn",
    name: "Café Jaf'n",
    category: "mobile",
    tagline: "Order, favourites, and delivery for a café brand.",
    period: "2025",
    href: "https://apps.apple.com/ug/app/cafe-jafn/id6746074084",
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "RTK Query"],
    highlights: [
      "Menu browsing, cart, and order flows",
      "Favourites, history, and delivery addresses",
      "Onboarding, auth, and profile (help, terms, privacy)",
    ],
    detailMd: "Cafe Jaf'n Kampala/portfolio-cafe-jafn-mobile.md",
    gallery: [
      "/project-files/cafe-jafn/1755162313506.jpg",
      "/project-files/cafe-jafn/1755162313525.jpg",
      "/project-files/cafe-jafn/1755162313541.jpg",
      "/project-files/cafe-jafn/1755162313556.jpg",
    ],
  },
  {
    slug: "tuwe",
    name: "Tuwe",
    category: "mobile",
    tagline: "Community platform: marketplace, rides, payments, and civic tools.",
    period: "2025",
    href: "https://apps.apple.com/ug/app/tuwe/id6752911597",
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "PHP"],
    highlights: [
      "Auth with OTP, Google Sign-in, password reset",
      "Marketplace search, cart, checkout, tracking, favourites",
      "Location-based services, notices, and candidate discovery",
    ],
    detailMd: "Tuwe/PORTFOLIO_PROJECT_BRIEF.md",
    gallery: [
      "/project-files/tuwe/Simulator Screenshot - iPhone 17 Pro Max - 2025-11-05 at 12.52.13.png",
      "/project-files/tuwe/Simulator Screenshot - iPhone 17 Pro Max - 2025-11-05 at 12.53.11.png",
      "/project-files/tuwe/Simulator Screenshot - iPhone 17 Pro Max - 2025-11-05 at 12.56.36.png",
    ],
  },
  {
    slug: "glam-n-go",
    name: "Glam n' Go",
    category: "mobile",
    tagline: "Multi-vendor e-commerce on iOS and Android.",
    period: "2024",
    href: "https://apps.apple.com/ug/app/glam-n-go/id6503872122",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Algolia",
      "Cloud Run",
    ],
    highlights: [
      "Multi-vendor catalog, search, cart, checkout, and orders",
      "Firestore + HTTP backend integration; regional payment UX",
      "EAS channels and GitHub Actions lint CI",
    ],
    detailMd: "Glam n' Go/PORTFOLIO_glam_n_go.md",
    gallery: [
      "/project-files/glam-n-go/Simulator Screenshot - iPhone 15 Pro Max - 2024-08-13 at 14.21.15.png",
      "/project-files/glam-n-go/Simulator Screenshot - iPhone 15 Pro Max - 2024-08-13 at 14.23.51.png",
      "/project-files/glam-n-go/Simulator Screenshot - iPhone 15 Pro Max - 2024-08-13 at 14.28.06.png",
    ],
  },
  {
    slug: "easy-gas",
    name: "Easy Gas",
    category: "mobile",
    tagline:
      "Expo app for shopping, orders, delivery, favorites, and notifications—plus admin catalog, orders, and broadcasts.",
    period: "2024",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "TanStack Query",
      "Redux Toolkit",
    ],
    highlights: [
      "Supabase Realtime invalidating React Query for live orders",
      "User + admin surfaces (catalog CRUD, notifications, account deletion rules)",
      "OneSignal + Edge Functions; EAS builds and OTA updates",
    ],
    detailMd: "EasyGas/portfolio-easygas-job-search.md",
    gallery: [
      "/project-files/easy-gas/Screenshot_1732777581.png",
      "/project-files/easy-gas/Screenshot_1732777624.png",
      "/project-files/easy-gas/Screenshot_1732777653.png",
    ],
  },
  {
    slug: "ncpwd-access",
    name: "NCPWD Access",
    category: "mobile",
    tagline:
      "Mobile companion for NCPWD: auth, reports, services, learning content, and notifications.",
    period: "2024",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase Auth",
      "RTK Query",
      "Redux",
    ],
    highlights: [
      "401 handling with token refresh and request replay",
      "Reports, services, PDF learning flows, saved documents",
      "Accessibility and i18n; EAS and custom Firebase iOS wiring",
    ],
    detailMd: "NCPWD/portfolio-ncpwd-access-app.md",
    gallery: [
      "/project-files/ncpwd-access/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 04.42.11.png",
      "/project-files/ncpwd-access/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 04.42.21.png",
      "/project-files/ncpwd-access/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 04.42.25.png",
    ],
  },
  {
    slug: "justknow",
    name: "JustKnow",
    category: "mobile",
    tagline:
      "Social and services in one app: posts, messaging, businesses, ride-hailing, and notifications.",
    period: "2024",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Socket.IO",
    ],
    highlights: [
      "Multiple RTK Query API slices and Socket.IO contexts",
      "SecureStore-backed redux-persist for auth and trip state",
      "EAS production with autoIncrement; env-driven API hosts",
    ],
    detailMd: "Justknow/PORTFOLIO.md",
  },
  {
    slug: "wims-facematch",
    name: "FaceMatch / WIMS",
    category: "mobile",
    tagline:
      "Android & iOS clients for on-device face detection, recognition, liveness, and WIMS device API integration.",
    period: "2024",
    stack: [
      "Kotlin",
      "Swift",
      "SwiftUI",
      "C++",
      "JNI",
      "TensorFlow Lite",
      "OpenCV",
      "Room",
      "FastAPI",
    ],
    highlights: [
      "Native vision on Android (NDK) with JNI; SwiftUI + TFLite on iOS",
      "Heartbeat, queued tasks, and recognition upload aligned with WIMS APIs",
      "Encrypted session storage; offline-friendly sync and retry patterns",
    ],
    detailMd: "WIMS/PORTFOLIO_WIMS_FACEMATCH.md",
  },
  {
    slug: "harvest-monitor",
    name: "Harvest Monitor",
    category: "mobile",
    tagline: "Real-time environmental monitoring for harvest storage.",
    period: "2023",
    stack: ["React Native", "Expo", "Redux", "Go", "Firebase"],
    highlights: [
      "Live humidity, temperature, and methane visualization",
      "Multi-site monitoring for agricultural storage",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const MIN_MOBILE_SCREENSHOTS = 3;

/** Exactly three slots for App Store–style strips (`null` = placeholder). */
export function getMobileStripSlots(project: Project): (string | null)[] {
  const g = project.gallery ?? [];
  const out: (string | null)[] = [];
  for (let i = 0; i < MIN_MOBILE_SCREENSHOTS; i++) {
    out.push(g[i] ?? null);
  }
  return out;
}

export function isWebProject(project: Project): boolean {
  return project.category === "web";
}

/** Card / OG thumb: explicit `image`, else live site preview for web, else first gallery shot. */
export function getProjectThumbSrc(project: Project): string | undefined {
  if (project.image) return project.image;
  if (isWebProject(project) && project.liveUrl) {
    return `/api/site-preview?url=${encodeURIComponent(project.liveUrl)}`;
  }
  return project.gallery?.[0];
}

/** Case study gallery: explicit gallery, or one live-derived web preview when no shots are checked in. */
export function getProjectGallerySources(project: Project): string[] {
  if (project.gallery?.length) return [...project.gallery];
  const thumb = getProjectThumbSrc(project);
  if (isWebProject(project) && thumb) return [thumb];
  return [];
}
