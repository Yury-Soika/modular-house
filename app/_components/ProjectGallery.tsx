"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "../data/content";

export default function ProjectGallery({ project }: { project: Project }) {
  const images = project.gallery?.length ? project.gallery : [project.image, project.plan].filter((value): value is string => Boolean(value));
  const [active, setActive] = useState<number | null>(null);

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

  if (!images.length) return <div className="flex h-80 items-center justify-center rounded-lg bg-forest-50 text-sm font-semibold text-forest-700 lg:h-[460px]">Фотографии проекта готовятся</div>;

  return <>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {images.map((src, index) => <button
        key={`${src}-${index}`}
        type="button"
        onClick={() => setActive(index)}
        className={`focus-ring group relative block w-full overflow-hidden rounded-lg border border-forest-900/10 bg-white ${index === 0 ? "h-80 lg:h-[460px]" : "h-64"}`}
        aria-label={`Открыть ${index === 0 && project.image ? "фотографию" : "планировку"} проекта ${project.projectNo} на весь экран`}
      >
        <Image src={src} alt={`${project.title} — изображение ${index + 1}`} fill priority={index === 0} sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-forest-950/85 px-3 py-2 text-xs font-semibold text-white"><Expand size={15} /> На весь экран</span>
      </button>)}
    </div>
    {active !== null && <div className="fixed inset-0 z-[100] bg-forest-950/95 text-white" role="dialog" aria-modal="true" aria-label={`Изображения проекта ${project.projectNo}`}>
      <button type="button" onClick={() => setActive(null)} className="absolute inset-0 cursor-zoom-out" aria-label="Закрыть" />
      <div className="pointer-events-none absolute inset-4 sm:inset-8"><Image src={images[active]} alt={`${project.title} — изображение ${active + 1}`} fill sizes="100vw" className="object-contain" unoptimized /></div>
      <button type="button" onClick={() => setActive(null)} className="focus-ring absolute right-4 top-4 rounded-md bg-white/15 p-3" aria-label="Закрыть"><X size={22} /></button>
      {images.length > 1 && <>
        <button type="button" onClick={() => setActive((active - 1 + images.length) % images.length)} className="focus-ring absolute left-3 top-1/2 -translate-y-1/2 rounded-md bg-white/15 p-3" aria-label="Предыдущее изображение"><ChevronLeft size={24} /></button>
        <button type="button" onClick={() => setActive((active + 1) % images.length)} className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white/15 p-3" aria-label="Следующее изображение"><ChevronRight size={24} /></button>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-white/15 px-3 py-1 text-sm">{active + 1} / {images.length}</span>
      </>}
    </div>}
  </>;
}
