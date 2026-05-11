import { NextResponse } from "next/server";
import { projects } from "@/content/projects";

const allowedHosts = new Set(
  projects
    .map((p) => p.liveUrl)
    .filter((u): u is string => Boolean(u))
    .map((u) => {
      try {
        return new URL(u).hostname;
      } catch {
        return null;
      }
    })
    .filter((h): h is string => Boolean(h)),
);

type MicrolinkPayload = {
  status?: string;
  data?: {
    image?: { url?: string };
    screenshot?: { url?: string };
  };
};

/**
 * Redirects to a stable preview image for a known project `liveUrl` (OG image or
 * screenshot via Microlink). Host allowlist prevents open redirects / SSRF.
 */
export async function GET(req: Request) {
  const urlParam = new URL(req.url).searchParams.get("url");
  if (!urlParam) {
    return new NextResponse("Missing url", { status: 400 });
  }

  let requested: URL;
  try {
    requested = new URL(urlParam);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (requested.protocol !== "https:") {
    return new NextResponse("https only", { status: 400 });
  }

  if (!allowedHosts.has(requested.hostname)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(
    requested.toString(),
  )}`;

  const res = await fetch(microlinkUrl, {
    next: { revalidate: 86_400 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    return new NextResponse("Preview service error", { status: 502 });
  }

  const body = (await res.json()) as MicrolinkPayload;
  if (body.status !== "success") {
    return new NextResponse("No preview metadata", { status: 404 });
  }

  const imageUrl =
    body.data?.image?.url ?? body.data?.screenshot?.url ?? null;
  if (!imageUrl) {
    return new NextResponse("No preview image", { status: 404 });
  }

  return NextResponse.redirect(imageUrl, 302);
}
