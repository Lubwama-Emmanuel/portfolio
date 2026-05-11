import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WEBSITES_DIR = path.join(process.cwd(), "projects", "websites");

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

/** Safe basename only — thumbnails live in `projects/websites/`. */
const SAFE = /^[a-z0-9-]+\.(png|jpe?g|webp|gif)$/i;

type Params = { params: Promise<{ file: string }> };

export async function GET(_request: Request, context: Params) {
  const { file } = await context.params;
  const decoded = decodeURIComponent(file);

  if (!SAFE.test(decoded)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const full = path.resolve(WEBSITES_DIR, decoded);
  const root = path.resolve(WEBSITES_DIR);
  const rel = path.relative(root, full);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
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
  return new NextResponse(new Uint8Array(body), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
