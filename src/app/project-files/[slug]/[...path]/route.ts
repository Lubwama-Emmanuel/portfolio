import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/content/projects";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; path: string[] }> },
) {
  const { slug, path: segments } = await context.params;
  const project = getProjectBySlug(slug);
  if (!project?.detailMd) {
    return new NextResponse("Not found", { status: 404 });
  }

  const folder = path.dirname(project.detailMd);
  const relativeFile = path.join(...segments);
  if (!relativeFile || relativeFile.includes("..")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const root = path.resolve(process.cwd(), "projects", folder);
  const full = path.resolve(root, relativeFile);
  const normalized = path.relative(root, full);
  if (normalized.startsWith("..") || path.isAbsolute(normalized)) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(full).toLowerCase();
  const contentType = MIME[ext];
  if (!contentType) {
    return new NextResponse("Unsupported media type", { status: 415 });
  }

  const body = fs.readFileSync(full);
  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
