export type Role = {
  company: string;
  title: string;
  dates: string;
  location: string;
  summary: string;
};

export const experience: Role[] = [
  {
    company: "Wire24",
    title: "Founding Software Engineer",
    dates: "Feb 2023 – Nov 2025 (2 yrs 9 mos)",
    location: "Remote · Part-time",
    summary:
      "Early engineer on a cross-platform fintech app: wallets, transfers, merchant payments, KYC, and live transaction UX against api.wire24.co.",
  },
  {
    company: "Moxtech Developers",
    title: "Software Engineer (contract)",
    dates: "Mar 2022 – present",
    location: "Remote",
    summary:
      "Led a small mobile squad; shipped UI-heavy React Native apps, Kotlin and Swift where native fit, and raised how fast we could iterate on design and releases.",
  },
  {
    company: "Simba Talents Group",
    title: "Software Engineer",
    dates: "May 2023 – Sep 2024",
    location: "Remote · Full-time",
    summary:
      "Full-stack delivery for client products—React Native and native mobile clients with Node.js / Express backends.",
  },
  {
    company: "CodeBits",
    title: "Software Engineer",
    dates: "Oct 2021 – Jan 2024",
    location: "Remote · Part-time",
    summary:
      "USSD and web surfaces so customers could reach services without a smartphone; helped grow subscriber numbers for partner services.",
  },
  {
    company: "Quoality",
    title: "Backend Developer",
    dates: "Nov 2022 – Apr 2023",
    location: "Remote · Full-time",
    summary:
      "Node.js / Express services on AWS, Jest-backed refactors, and tight collaboration with frontend teams on end-to-end features.",
  },
];
