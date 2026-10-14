import { Download } from "lucide-react";
import type { Lang, Project } from "../data/content";

export default function ProjectDocumentDownload({ project, lang = "ru" }: { project: Project; lang?: Lang }) {
  if (!project.document) return null;
  const { url, sizeBytes } = project.document;
  const href = url.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${url}` : url;
  const size = (sizeBytes / 1_000_000).toLocaleString(lang === "ru" ? "ru-RU" : "en-US", { maximumFractionDigits: 1 });
  return <a data-ym-goal="project_pdf_download" data-project-id={project.id} className="focus-ring mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-forest-700 px-4 py-3 text-sm font-semibold text-forest-700 transition hover:bg-forest-50" href={href} download={`${lang === "ru" ? "Проект" : "Project"} ${project.id}.pdf`}>
    <Download size={16} className="shrink-0" />
    <span>{lang === "ru" ? "Скачать проект" : "Download project"} · PDF · {size} {lang === "ru" ? "МБ" : "MB"}</span>
  </a>;
}
