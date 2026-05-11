export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export const site = {
  name: "Emmanuel Lubwama",
  title: "Software Engineer",
  email: "lubwamaemmanuel1@gmail.com",
  phone: "+256706039119",
  github: "https://github.com/Lubwama-Emmanuel",
  linkedin: "https://www.linkedin.com/in/lubwama-emmanuel-b35377226",
  sameAs: [
    "https://github.com/Lubwama-Emmanuel",
    "https://www.linkedin.com/in/lubwama-emmanuel-b35377226",
  ],
} as const;
