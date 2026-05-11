import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/content/projects";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function toPathSegments(
  pathParam: string | string[] | undefined,
): string[] {
  if (pathParam === undefined) return [];
  if (Array.isArray(pathParam)) return pathParam.filter(Boolean);
  const s = String(pathParam);
  return s ? [s] : [];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; path: string | string[] }> },
) {
  const { slug, path: pathParam } = await context.params;
  const project = getProjectBySlug(slug);
  if (!project?.detailMd) {
    return new NextResponse("Not found", { status: 404 });
  }

  const folder = path.dirname(project.detailMd);
  const segments = toPathSegments(pathParam);
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
  const bytes = new Uint8Array(body);
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
