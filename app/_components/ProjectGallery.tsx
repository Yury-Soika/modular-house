"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { content, type Lang, type Project } from "../data/content";

const asset = (path: string) => /^https?:\/\//.test(path) ? path : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function ProjectGallery({ project, variant = "detail", lang = "ru" }: { project: Project; variant?: "detail" | "card"; lang?: Lang }) {
  const images = project.gallery?.length ? project.gallery : [project.image, project.plan].filter((value): value is string => Boolean(value));
  const [active, setActive] = useState<number | null>(null);
  const ru = lang === "ru";
  const copy = content[lang].common;

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((index) => index === null ? null : (index - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActive((index) => index === null ? null : (index + 1) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, images.length]);

  const cardMedia = [
    { src: project.image, label: copy.render, className: "h-44", fit: "object-cover" },
    { src: project.plan, label: copy.plan, className: "h-28 border-t border-forest-900/10", fit: "object-contain" }
  ];

  if (!images.length && variant === "detail") return <div className="flex h-80 items-center justify-center rounded-lg bg-forest-50 text-sm font-semibold text-forest-700 lg:h-[460px]">{ru ? "Фотографии проекта готовятся" : "Project photos are being prepared"}</div>;

  return <>
    {variant === "card" ? <div>
      {cardMedia.map(({ src, label, className, fit }) => src ? <button key={label} type="button" onClick={() => setActive(Math.max(0, images.indexOf(src)))} className={`focus-ring group relative block w-full overflow-hidden bg-white ${className}`} aria-label={`${project.title} — ${label}: ${ru ? "открыть на весь экран" : "open full screen"}`}>
        <Image src={asset(src)} alt={`${project.title} — ${label}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className={`${fit} transition duration-500 group-hover:scale-105`} />
        <span className="absolute bottom-2 right-2 rounded-md bg-forest-950/80 p-2 text-white"><Expand size={16} /></span>
      </button> : <div key={label} className={`flex items-center justify-center bg-forest-50 text-xs font-semibold text-forest-700 ${className}`}>{label} · {copy.noPhoto}</div>)}
    </div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {images.map((src, index) => <button
        key={`${src}-${index}`}
        type="button"
        onClick={() => setActive(index)}
        className={`focus-ring group relative block w-full overflow-hidden rounded-lg border border-forest-900/10 bg-white ${index === 0 ? "h-80 lg:h-[460px]" : "h-64"}`}
        aria-label={`Открыть ${index === 0 && project.image ? "фотографию" : "планировку"} проекта ${project.projectNo} на весь экран`}
      >
        <Image src={asset(src)} alt={`${project.title} — изображение ${index + 1}`} fill priority={index === 0} sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-forest-950/85 px-3 py-2 text-xs font-semibold text-white"><Expand size={15} /> На весь экран</span>
      </button>)}
    </div>}
    {active !== null && createPortal(<div className="fixed inset-0 z-[100] bg-forest-950/95 text-white" role="dialog" aria-modal="true" aria-label={`Изображения проекта ${project.projectNo}`}>
      <button type="button" onClick={() => setActive(null)} className="absolute inset-0 cursor-zoom-out" aria-label="Закрыть" />
      <div className="pointer-events-none absolute inset-4 sm:inset-8"><Image src={asset(images[active])} alt={`${project.title} — изображение ${active + 1}`} fill sizes="100vw" className="object-contain" unoptimized /></div>
      <button type="button" onClick={() => setActive(null)} className="focus-ring absolute right-4 top-4 rounded-md bg-white/15 p-3" aria-label="Закрыть"><X size={22} /></button>
      {images.length > 1 && <>
        <button type="button" onClick={() => setActive((active - 1 + images.length) % images.length)} className="focus-ring absolute left-3 top-1/2 -translate-y-1/2 rounded-md bg-white/15 p-3" aria-label="Предыдущее изображение"><ChevronLeft size={24} /></button>
        <button type="button" onClick={() => setActive((active + 1) % images.length)} className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white/15 p-3" aria-label="Следующее изображение"><ChevronRight size={24} /></button>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-white/15 px-3 py-1 text-sm">{active + 1} / {images.length}</span>
      </>}
    </div>, document.body)}
  </>;
}
