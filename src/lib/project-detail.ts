import fs from "fs";
import path from "path";
import type { Project } from "@/content/projects";

const PROJECTS_DIR = path.join(process.cwd(), "projects");

export function readProjectMarkdown(project: Project): string | null {
  if (!project.detailMd) return null;
  const full = path.join(PROJECTS_DIR, project.detailMd);
  try {
    if (!fs.existsSync(full)) return null;
    return fs.readFileSync(full, "utf8");
  } catch {
    return null;
  }
}

/** Removes the first top-level heading so the page hero isn’t duplicated. */
export function stripLeadingH1(markdown: string): string {
  return markdown.trim().replace(/^#\s[^\n]+\n+/, "");
}
