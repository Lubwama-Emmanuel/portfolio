export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  /** App store or case-study URL; omit when not public */
  href?: string;
  stack: string[];
  highlights: string[];
  /**
   * Markdown file under repo `projects/` (write-ups; images via `/project-files/<slug>/file.jpg`).
   */
  detailMd?: string;
};

export const projects: Project[] = [
  {
    slug: "wire24",
    name: "Wire24",
    tagline:
      "Fintech mobile client: wallets, KYC, notifications, and authenticated flows against api.wire24.co.",
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
      "Bearer-authenticated API layer with persisted client state",
      "Sortable home widgets, connectivity UX, optional iOS Live Activities / widgets",
      "KYC, notifications, maps, and biometric-related integrations",
    ],
    detailMd: "Wire24/PORTFOLIO-WIRE24.md",
  },
  {
    slug: "cafe-jafn",
    name: "Café Jaf'n",
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
  },
  {
    slug: "tuwe",
    name: "Tuwe",
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
  },
  {
    slug: "glam-n-go",
    name: "Glam n' Go",
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
  },
  {
    slug: "easy-gas",
    name: "Easy Gas",
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
  },
  {
    slug: "ncpwd-access",
    name: "NCPWD Access",
    tagline:
      "Mobile client for NCPWD: auth, reports, services, learning content, and notifications against a Cloud Run API.",
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
  },
  {
    slug: "justknow",
    name: "JustKnow",
    tagline:
      "Expo client for posts, messaging, businesses, ride-hailing, and notifications—REST + Socket.IO to justknow.dfts.cloud.",
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
