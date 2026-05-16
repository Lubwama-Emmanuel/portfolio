import type { MetadataRoute } from "next";
import { seoDescription } from "@/content/profile";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.jobTitle}`,
    short_name: site.name,
    description: seoDescription,
    start_url: "/",
    display: "browser",
    background_color: "#013e37",
    theme_color: "#013e37",
    lang: "en",
    icons: [
      {
        src: "/emmanuel.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
