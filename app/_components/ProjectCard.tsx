import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { content, type Lang, type Project } from "../data/content";
import ProjectGallery from "./ProjectGallery";
import ProjectDocumentDownload from "./ProjectDocumentDownload";

export default function ProjectCard({ project, lang = "ru" }: { project: Project; lang?: Lang }) {
  const copy = content[lang].common;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-forest-700/30 hover:shadow-lg" data-project-id={project.id} data-project-kind={project.kind}>
      <ProjectGallery project={project} variant="card" lang={lang} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-forest-950"><Link className="focus-ring rounded-sm transition hover:text-forest-700" href={`/projects/${project.id}`}>{project.title}</Link></h3>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal/45">№ {project.projectNo}</p>
          </div>
          <span className="shrink-0 rounded-md bg-forest-50 px-3 py-2 text-sm font-semibold text-forest-700">{project.area}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-charcoal/68">{project.summary}</p>
        <p className="mt-2 text-sm text-charcoal/60">{project.size}</p>
        <div className="mb-6 mt-5 grid gap-2">
          {project.kind === "house" && project.priceWarm && <div className="flex items-center justify-between gap-2 rounded-md border border-forest-900/10 bg-linen px-3 py-2"><span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-charcoal/55">{copy.priceWarm}</span><strong className="shrink-0 text-sm text-forest-950">{project.priceWarm}</strong></div>}
          <div className="flex items-center justify-between gap-2 rounded-md border border-forest-700 bg-forest-50 px-3 py-2"><span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-forest-700">{copy.priceTurnkey}</span><strong className="shrink-0 text-sm text-forest-950">{project.priceTurnkey}</strong></div>
        </div>
        <Link data-ym-goal="project_open" data-project-id={project.id} className="focus-ring mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-900" href={`/projects/${project.id}`}>{copy.viewProject}<ArrowRight size={16} /></Link>
        <ProjectDocumentDownload project={project} lang={lang} />
      </div>
    </article>
  );
}
