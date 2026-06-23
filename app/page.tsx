"use client";

import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock3,
  Expand,
  Factory,
  FileText,
  Globe,
  Hammer,
  Home,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  X
} from "lucide-react";
import { content, type Content, type Lang } from "./data/content";

const benefitIcons = [Factory, Truck, Hammer, Ruler];
const catalogIcons = [Leaf, Clock3, Sparkles];
const completedImages = [
  "/house-photos/IMG_0640.JPG",
  "/house-photos/IMG_1444.JPG",
  "/house-photos/IMG_1445.JPG",
  "/house-photos/IMG_1447.JPG",
  "/house-photos/IMG_1448.JPG",
  "/house-photos/IMG_1451.JPG",
  "/house-photos/IMG_1454.JPG"
];

function PlanPreview({ variant, copy }: { variant: "studio" | "family" | "forest"; copy: Content["common"] }) {
  const layout =
    variant === "studio"
      ? "grid-cols-[1.2fr_0.8fr] grid-rows-[1fr_0.8fr]"
      : variant === "family"
        ? "grid-cols-[1fr_1fr_0.8fr] grid-rows-[0.8fr_1.2fr]"
        : "grid-cols-[0.9fr_1.1fr_0.9fr] grid-rows-[1fr_1fr]";

  return (
    <div className="rounded-md border border-forest-900/10 bg-white p-3">
      <div className={`grid h-28 gap-1 ${layout}`}>
        <div className="rounded-sm border border-forest-700/30 bg-forest-50" />
        <div className="rounded-sm border border-forest-700/30 bg-linen" />
        <div className="rounded-sm border border-forest-700/30 bg-white" />
        <div className="rounded-sm border border-forest-700/30 bg-forest-100" />
        <div className="rounded-sm border border-forest-700/30 bg-white" />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-forest-700">
        <span>{copy.plan}</span>
        <span>{copy.scaledPreview}</span>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-charcoal/70">{text}</p>
    </div>
  );
}

function ContactForm({ forms, common }: { forms: Content["forms"]; common: Content["common"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      leadType: String(formData.get("leadType") || "consultation"),
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      telegram: String(formData.get("telegram") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || "")
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-semibold text-forest-950">
        {forms.requestType}
        <select
          className="focus-ring h-12 rounded-md border border-forest-900/10 bg-white px-4 text-sm font-medium"
          name="leadType"
          defaultValue="consultation"
        >
          <option value="consultation">{forms.requestConsultation}</option>
          <option value="catalog">{forms.requestCatalog}</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-forest-950">
        {forms.name}
        <input
          className="focus-ring h-12 rounded-md border border-forest-900/10 bg-white px-4 text-sm font-medium"
          name="name"
          placeholder={forms.namePlaceholder}
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-forest-950">
        {forms.phone}
        <input
          className="focus-ring h-12 rounded-md border border-forest-900/10 bg-white px-4 text-sm font-medium"
          name="phone"
          placeholder={forms.phonePlaceholder}
          type="tel"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-forest-950">
          {forms.telegram}
          <input
            className="focus-ring h-12 rounded-md border border-forest-900/10 bg-white px-4 text-sm font-medium"
            name="telegram"
            placeholder={forms.telegramPlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-forest-950">
          {forms.email}
          <input
            className="focus-ring h-12 rounded-md border border-forest-900/10 bg-white px-4 text-sm font-medium"
            name="email"
            placeholder={forms.emailPlaceholder}
            type="email"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-forest-950">
        {forms.message}
        <textarea
          className="focus-ring min-h-28 rounded-md border border-forest-900/10 bg-white px-4 py-3 text-sm font-medium"
          name="message"
          placeholder={forms.messagePlaceholder}
        />
      </label>
      <button
        className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-forest-700 px-5 text-sm font-semibold text-white transition hover:bg-forest-900 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? forms.sending : common.requestConsultation}
        <ArrowRight size={17} />
      </button>
      {status === "success" && <p className="text-sm font-semibold text-forest-700">{forms.success}</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-700">{forms.error}</p>}
    </form>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const copy = content[lang];
  const activeImage = lightboxIndex === null ? null : completedImages[lightboxIndex];

  const openLightbox = (src: string) => {
    const index = completedImages.indexOf(src);
    setLightboxIndex(index >= 0 ? index : 0);
  };

  const showPreviousImage = () => {
    setLightboxIndex((current) => (current === null ? current : (current - 1 + completedImages.length) % completedImages.length));
  };

  const showNextImage = () => {
    setLightboxIndex((current) => (current === null ? current : (current + 1) % completedImages.length));
  };

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current === null ? current : (current - 1 + completedImages.length) % completedImages.length));
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current === null ? current : (current + 1) % completedImages.length));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  return (
    <main id="home" className="overflow-hidden" lang={copy.meta.htmlLang}>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-forest-950/90 backdrop-blur">
        <div className="section-shell flex h-20 items-center justify-between gap-5 text-white">
          <a className="focus-ring flex items-center gap-3 rounded-md" href="#home" aria-label={`${copy.brand.name} home`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-sand/60 text-sand">
              <Home size={21} />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-semibold uppercase tracking-[0.22em]">{copy.brand.name}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-sand">{copy.brand.location}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 lg:flex" aria-label="Primary">
            {copy.nav.map((item) => (
              <a className="transition hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a className="hidden items-center gap-2 text-sm font-semibold text-white md:flex" href="tel:+375445702787">
              <Phone size={16} />
              {copy.common.phone}
            </a>
            <button
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-3 text-xs font-semibold text-white transition hover:bg-white/10"
              onClick={() => setLang(lang === "en" ? "ru" : "en")}
              aria-label={copy.meta.switchLabel}
              type="button"
            >
              <Globe size={15} />
              {copy.meta.switchTo}
            </button>
            <a
              className="focus-ring hidden h-11 items-center justify-center gap-2 rounded-md bg-sand px-4 text-sm font-semibold text-forest-950 transition hover:bg-white sm:inline-flex"
              href="#consultation"
            >
              {copy.common.consultation}
            </a>
          </div>
        </div>
      </header>

      <section className="relative min-h-[760px] bg-forest-950 pt-20 text-white">
        <button
          className="focus-ring absolute inset-0 block cursor-zoom-in"
          onClick={() => openLightbox("/house-photos/IMG_0640.JPG")}
          type="button"
          aria-label="Open hero photo preview"
        >
          <Image
            src="/house-photos/IMG_0640.JPG"
            alt="Modular timber house with terrace near forest"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
        </button>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/70 to-forest-950/10" />
        <div className="section-shell relative flex min-h-[680px] items-center">
          <div className="max-w-3xl py-20">
            <p className="eyebrow text-sand">{copy.hero.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">{copy.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{copy.hero.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-sand px-6 py-4 text-sm font-semibold text-forest-950 transition hover:bg-white" href="#consultation">
                {copy.common.consultation}
                <ArrowRight size={18} />
              </a>
              <a className="focus-ring inline-flex min-h-14 items-center justify-center rounded-md border border-white/35 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-forest-950" href="#projects">
                {copy.common.browseProjects}
              </a>
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {copy.benefits.map((title, index) => {
                const Icon = benefitIcons[index];
                return (
                  <div className="rounded-md border border-white/15 bg-white/8 p-4 backdrop-blur" key={title}>
                    <Icon className="text-sand" size={24} />
                    <p className="mt-4 text-sm font-semibold leading-5">{title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20" id="about">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={copy.about.eyebrow} title={copy.about.title} text={copy.about.text} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.about.cards.map((card) => (
                <div className="rounded-md border border-forest-900/10 bg-linen p-5" key={card.title}>
                  <Check className="text-forest-700" size={21} />
                  <h3 className="mt-4 font-semibold text-forest-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-charcoal/68">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="group focus-ring relative h-80 overflow-hidden rounded-md"
              onClick={() => openLightbox("/house-photos/IMG_1454.JPG")}
              type="button"
              aria-label={copy.about.imageAltKitchen}
            >
              <Image src="/house-photos/IMG_1454.JPG" alt={copy.about.imageAltKitchen} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-forest-950/75 text-white opacity-0 transition group-hover:opacity-100">
                <Expand size={17} />
              </span>
            </button>
            <button
              className="group focus-ring relative mt-12 h-80 overflow-hidden rounded-md"
              onClick={() => openLightbox("/house-photos/IMG_1448.JPG")}
              type="button"
              aria-label={copy.about.imageAltBedroom}
            >
              <Image src="/house-photos/IMG_1448.JPG" alt={copy.about.imageAltBedroom} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-forest-950/75 text-white opacity-0 transition group-hover:opacity-100">
                <Expand size={17} />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-linen py-20" id="quiz">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading eyebrow={copy.quiz.eyebrow} title={copy.quiz.title} text={copy.quiz.text} />
          <div className="grid gap-4 sm:grid-cols-3">
            {copy.quiz.steps.map((step, index) => (
              <div className="rounded-md bg-white p-6 shadow-soft" key={step.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-700 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-semibold text-forest-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/68">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20" id="projects">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={copy.projectsSection.eyebrow} title={copy.projectsSection.title} text={copy.projectsSection.text} />
            <a className="focus-ring inline-flex h-12 w-fit items-center justify-center gap-2 rounded-md bg-forest-700 px-5 text-sm font-semibold text-white transition hover:bg-forest-900" href="#catalog">
              {copy.common.getCatalog}
              <FileText size={17} />
            </a>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {copy.projects.map((project) => (
              <article className="rounded-md border border-forest-900/10 bg-white shadow-soft" key={project.title}>
                <button
                  className="group focus-ring relative block h-64 w-full cursor-zoom-in overflow-hidden rounded-t-md bg-forest-950"
                  onClick={() => openLightbox(project.image)}
                  type="button"
                  aria-label={`Open ${project.title} photo preview`}
                >
                  <Image src={project.image} alt={`${project.title} modular house`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-forest-950/75 text-white opacity-0 transition group-hover:opacity-100">
                    <Expand size={17} />
                  </span>
                </button>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-forest-950">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-charcoal/68">{project.description}</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-forest-50 px-3 py-2 text-sm font-semibold text-forest-700">
                      {project.area}
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <span className="flex items-center gap-2 text-charcoal/72"><Users size={16} /> {project.rooms}</span>
                    <span className="flex items-center gap-2 text-charcoal/72"><Clock3 size={16} /> {project.time}</span>
                  </div>
                  <div className="mt-5">
                    <PlanPreview variant={project.plan} copy={copy.common} />
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <strong className="text-lg text-forest-950">{project.price}</strong>
                    <a className="focus-ring inline-flex h-11 items-center justify-center rounded-md bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-900" href="#consultation">
                      {copy.common.viewProject}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-white">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-sand">{copy.completed.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{copy.completed.title}</h2>
            <p className="mt-5 text-base leading-7 text-white/72">{copy.completed.text}</p>
            <blockquote className="mt-8 border-l-2 border-sand pl-5 text-lg leading-8 text-white/86">
              &quot;{copy.completed.quote}&quot;
            </blockquote>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-sand">
              <MapPin size={17} />
              {copy.completed.location}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {completedImages.map((src, index) => (
              <button
                className="group focus-ring relative h-56 cursor-zoom-in overflow-hidden rounded-md sm:h-72"
                key={src}
                onClick={() => setLightboxIndex(index)}
                type="button"
                aria-label={`${copy.completed.imageAlt} ${index + 1}`}
              >
                <Image src={src} alt={`${copy.completed.imageAlt} ${index + 1}`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-forest-950/75 text-white opacity-0 transition group-hover:opacity-100">
                  <Expand size={17} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell">
          <SectionHeading eyebrow={copy.foundationsSection.eyebrow} title={copy.foundationsSection.title} text={copy.foundationsSection.text} />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {copy.foundations.map((foundation) => (
              <article className="rounded-md border border-forest-900/10 bg-linen p-5" key={foundation.title}>
                <Building2 className="text-forest-700" size={24} />
                <h3 className="mt-5 text-lg font-semibold text-forest-950">{foundation.title}</h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/68">{foundation.description}</p>
                <p className="mt-4 text-sm font-semibold text-forest-700">{foundation.use}</p>
                <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                  {foundation.advantages.map((item) => (
                    <li className="flex items-center gap-2" key={item}>
                      <Check size={15} className="text-forest-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen py-20" id="process">
        <div className="section-shell">
          <SectionHeading eyebrow={copy.process.eyebrow} title={copy.process.title} text={copy.process.text} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.process.steps.map((step, index) => (
              <div className="relative rounded-md bg-white p-5 shadow-soft" key={step}>
                <span className="text-sm font-semibold text-forest-700">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-semibold text-forest-950">{step}</h3>
                <div className="mt-6 h-1 rounded-full bg-forest-100">
                  <div className="h-1 rounded-full bg-forest-700" style={{ width: `${((index + 1) / copy.process.steps.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading eyebrow={copy.trust.eyebrow} title={copy.trust.title} text={copy.trust.text} />
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.trust.cards.map((item) => (
              <div className="flex items-center gap-3 rounded-md border border-forest-900/10 bg-linen p-4" key={item}>
                <ShieldCheck className="shrink-0 text-forest-700" size={21} />
                <span className="text-sm font-semibold text-forest-950">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-white" id="catalog">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <p className="eyebrow text-sand">{copy.catalog.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{copy.catalog.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">{copy.catalog.text}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {copy.catalog.perks.map((text, index) => {
                const Icon = catalogIcons[index];
                return (
                  <div className="rounded-md border border-white/12 p-4" key={text}>
                    <Icon className="text-sand" size={23} />
                    <p className="mt-4 text-sm font-semibold">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-md border border-white/12 bg-white/6 p-6 shadow-soft">
            <FileText className="text-sand" size={28} />
            <h3 className="mt-5 text-2xl font-semibold">{copy.common.getCatalog}</h3>
            <p className="mt-3 text-sm leading-6 text-white/68">{copy.catalog.text}</p>
            <a
              className="focus-ring mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-sand px-5 text-sm font-semibold text-forest-950 transition hover:bg-white"
              href="#consultation"
            >
              {copy.common.getCatalog}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-linen py-20" id="consultation">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_0.75fr] lg:items-start">
          <SectionHeading eyebrow={copy.consultation.eyebrow} title={copy.consultation.title} text={copy.consultation.text} />
          <div className="rounded-md bg-white p-6 shadow-soft">
            <ContactForm forms={copy.forms} common={copy.common} />
          </div>
        </div>
      </section>

      <footer className="bg-forest-950 py-12 text-white" id="contacts">
        <div className="section-shell grid gap-8 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-sand/60 text-sand">
                <Home size={21} />
              </span>
              <span className="text-lg font-semibold uppercase tracking-[0.22em]">{copy.brand.name}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/62">{copy.brand.tagline}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sand">{copy.footer.contacts}</h3>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <a className="flex items-center gap-2 transition hover:text-white" href="tel:+375445702787"><Phone size={16} /> {copy.common.phone}</a>
              <a className="flex items-center gap-2 transition hover:text-white" href="#consultation"><MessageCircle size={16} /> {copy.common.telegram}</a>
              <a className="flex items-center gap-2 transition hover:text-white" href="#consultation"><MessageCircle size={16} /> {copy.common.viber}</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sand">{copy.footer.address}</h3>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/75"><MapPin size={16} /> {copy.brand.location}</p>
            <div className="mt-4 flex h-32 items-center justify-center rounded-md border border-white/12 bg-white/5 text-sm text-white/55">
              {copy.common.googleMapsArea}
            </div>
          </div>
        </div>
      </footer>

      {activeImage && (
        <div className="fixed inset-0 z-[80] bg-forest-950/95 text-white" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 cursor-zoom-out"
            onClick={() => setLightboxIndex(null)}
            type="button"
            aria-label="Close image preview"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <div className="relative h-[78vh] w-full max-w-6xl">
              <Image
                src={activeImage}
                alt={`${copy.completed.imageAlt} ${(lightboxIndex ?? 0) + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <button
            className="focus-ring absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white hover:text-forest-950"
            onClick={() => setLightboxIndex(null)}
            type="button"
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>
          <button
            className="focus-ring absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white hover:text-forest-950"
            onClick={showPreviousImage}
            type="button"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="focus-ring absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white hover:text-forest-950"
            onClick={showNextImage}
            type="button"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            {(lightboxIndex ?? 0) + 1} / {completedImages.length}
          </div>
        </div>
      )}
    </main>
  );
}
