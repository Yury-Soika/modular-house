"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Check,
  Download,
  Expand,
  Factory,
  Globe,
  Hammer,
  Home,
  ImageOff,
  Layers,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  X
} from "lucide-react";
import { content, type Content, type Lang, type Project } from "./data/content";

// Public assets (files in /public) are not prefixed with basePath by next/image or
// plain anchors, so we prefix them ourselves for the sub-path demo deployment.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${BASE_PATH}${path}`;
const CONTACT_PHONE = "+375445702727";
const TELEGRAM_URL = `https://t.me/${CONTACT_PHONE}`;
const VIBER_URL = `viber://chat?number=${encodeURIComponent(CONTACT_PHONE)}`;
const CONTACT_EMAIL = "Modulsdom@mail.ru";
const YANDEX_MAPS_URL = "https://yandex.by/maps/?ll=23.716577%2C52.064675&mode=whatshere&whatshere%5Bpoint%5D=23.716577%2C52.064675&whatshere%5Bzoom%5D=17&z=17";
const YANDEX_MAP_WIDGET_URL = "https://yandex.by/map-widget/v1/?ll=23.716577%2C52.064675&mode=whatshere&whatshere%5Bpoint%5D=23.716577%2C52.064675&whatshere%5Bzoom%5D=17&z=17";

const benefitIcons = [Factory, Truck, Hammer, Ruler];
const familyHouseImages = [
  "/family-house/IMG_0640.JPG",
  "/family-house/IMG_1444.JPG",
  "/family-house/IMG_1445.JPG",
  "/family-house/IMG_1447.JPG",
  "/family-house/IMG_1448.JPG",
  "/family-house/IMG_1451.JPG",
  "/family-house/IMG_1454.JPG"
];

const completedProjectImages = {
  familyHouse: familyHouseImages,
  oneRoomHouse: [
    "/one-room-house/IMG_8366.JPG",
    "/one-room-house/IMG_8369.JPG",
    "/one-room-house/IMG_8373.JPG",
    "/one-room-house/IMG_8377.JPG",
    "/one-room-house/IMG_8385.JPG",
    "/one-room-house/IMG_8386.JPG"
  ],
  sauna: [
    "/sauna/IMG_1319.JPG",
    "/sauna/IMG_1320.JPG",
    "/sauna/IMG_1322.JPG",
    "/sauna/IMG_1323.JPG",
    "/sauna/IMG_1326.JPG",
    "/sauna/IMG_1334.JPG",
    "/sauna/IMG_1337.JPG"
  ],
  cafe: [
    "/caffee/IMG_0788.JPG",
    "/caffee/IMG_0791.JPG",
    "/caffee/IMG_0798.JPG",
    "/caffee/IMG_0799.JPG",
    "/caffee/IMG_0802.JPG",
    "/caffee/IMG_0804.JPG",
    "/caffee/IMG_0806.JPG",
    "/caffee/IMG_0812.JPG"
  ]
};

type Gallery = { images: string[]; index: number };

function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 bg-forest-50 text-forest-700/70 ${className ?? ""}`}>
      <ImageOff size={26} />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      {title && <h2 className="mt-3 text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">{title}</h2>}
      {text && <p className="mt-4 text-base leading-7 text-charcoal/70">{text}</p>}
    </div>
  );
}

function ProjectModal({
  project,
  copy,
  onClose,
  onOpenImage
}: {
  project: Project;
  copy: Content["common"];
  onClose: () => void;
  onOpenImage: (images: string[], index: number) => void;
}) {
  const projectImages = [project.image, project.plan].filter(Boolean) as string[];
  const imageBlocks: { src?: string; label: string }[] = [
    { src: project.image, label: copy.render },
    { src: project.plan, label: copy.plan }
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-forest-950/80 p-4 sm:p-8" role="dialog" aria-modal="true">
      <button className="absolute inset-0 cursor-default" onClick={onClose} type="button" aria-label={copy.close} />
      <div className="relative z-10 my-4 w-full max-w-4xl rounded-lg bg-white shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-forest-900/10 p-6">
          <div>
            <h3 className="text-2xl font-semibold text-forest-950">{project.title}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-charcoal/45">{project.projectNo}</p>
          </div>
          <button
            className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-forest-900/10 text-forest-950 transition hover:bg-linen"
            onClick={onClose}
            type="button"
            aria-label={copy.close}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {imageBlocks.map((block, index) =>
              block.src ? (
                <button
                  key={block.label}
                  className="group focus-ring relative h-52 overflow-hidden rounded-md bg-forest-950"
                  onClick={() => onOpenImage(projectImages, projectImages.indexOf(block.src as string))}
                  type="button"
                  aria-label={block.label}
                >
                  <Image src={asset(block.src)} alt={`${project.title} — ${block.label}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-forest-950/75 text-white opacity-0 transition group-hover:opacity-100">
                    <Expand size={17} />
                  </span>
                  <span className="absolute bottom-2 left-2 rounded bg-forest-950/75 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">{block.label}</span>
                </button>
              ) : (
                <PhotoPlaceholder key={index} label={`${block.label} · ${copy.noPhoto}`} className="h-52 rounded-md" />
              )
            )}
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-forest-900/10 bg-linen px-4 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-charcoal/55">{copy.dimensions}</dt>
              <dd className="mt-1 text-sm font-medium text-forest-950">{project.size}</dd>
            </div>
            {project.terrace && (
              <div className="rounded-md border border-forest-900/10 bg-linen px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-charcoal/55">{copy.terrace}</dt>
                <dd className="mt-1 text-sm font-medium text-forest-950">{project.terrace}</dd>
              </div>
            )}
          </dl>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.priceWarm && (
              <div className="rounded-md border border-forest-900/10 bg-white px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-charcoal/55">{copy.priceWarm}</p>
                <strong className="mt-1 block text-lg text-forest-950">{project.priceWarm}</strong>
              </div>
            )}
            <div className="rounded-md border border-forest-700 bg-forest-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-forest-700">{project.singleColumn ? copy.priceFinished : copy.priceTurnkey}</p>
              <strong className="mt-1 block text-lg text-forest-950">{project.priceTurnkey}</strong>
              {project.priceNote && <span className="mt-1 block text-xs text-charcoal/60">{project.priceNote}</span>}
            </div>
          </div>

          <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-forest-700">{copy.specsTitle}</h4>
          <div className="mt-3 overflow-hidden rounded-md border border-forest-900/10">
            {!project.singleColumn && (
              <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-forest-950 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                <span className="px-3 py-2" />
                <span className="px-3 py-2">{copy.priceWarm}</span>
                <span className="px-3 py-2">{copy.priceTurnkey}</span>
              </div>
            )}
            {project.specs.map((row, index) => (
              <div
                key={`${row.label}-${index}`}
                className={`grid ${project.singleColumn ? "grid-cols-[1fr_1.6fr]" : "grid-cols-[1.1fr_1fr_1fr]"} border-t border-forest-900/10 text-sm ${index % 2 === 0 ? "bg-white" : "bg-linen"}`}
              >
                <span className="px-3 py-2 font-semibold text-forest-950">{row.label}</span>
                {!project.singleColumn && <span className="px-3 py-2 text-charcoal/72">{row.warm}</span>}
                <span className="px-3 py-2 text-charcoal/72">{row.turnkey}</span>
              </div>
            ))}
          </div>

          <a
            className="focus-ring mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-forest-700 px-5 text-sm font-semibold text-white transition hover:bg-forest-900"
            href="#consultation"
            onClick={onClose}
          >
            {copy.requestConsultation}
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </div>
  );
}

type ConsentChoice = "all" | "necessary";

function CookieNotice({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const ru = lang === "ru";

  useEffect(() => setVisible(!window.localStorage.getItem("modul-s-cookie-consent")), []);

  const choose = (choice: ConsentChoice) => {
    window.localStorage.setItem("modul-s-cookie-consent", choice);
    setVisible(false);
  };

  if (visible === null) return null;

  if (!visible && !privacyOpen) {
    return (
      <button className="focus-ring fixed bottom-3 right-3 z-40 rounded-md bg-white/90 px-3 py-2 text-[11px] font-semibold text-forest-700 shadow-md backdrop-blur" onClick={() => setPrivacyOpen(true)} type="button">
        {ru ? "Конфиденциальность" : "Privacy"}
      </button>
    );
  }

  return (
    <>
      {visible && (
        <aside className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-4xl rounded-xl border border-forest-900/15 bg-white p-5 shadow-2xl sm:p-6" role="dialog" aria-live="polite" aria-label={ru ? "Настройки конфиденциальности" : "Privacy settings"}>
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-forest-950">{ru ? "Конфиденциальность и cookies" : "Privacy and cookies"}</h2>
              <p className="mt-2 text-sm leading-6 text-charcoal/70">
                {ru ? "Мы используем необходимые технологии для работы сайта. С вашего согласия также могут использоваться аналитические cookies для улучшения сервиса." : "We use necessary technologies to operate the site. With your consent, analytics cookies may also be used to improve the service."}{" "}
                <button className="font-semibold text-forest-700 underline underline-offset-2" onClick={() => setPrivacyOpen(true)} type="button">{ru ? "Политика конфиденциальности" : "Privacy policy"}</button>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <button className="focus-ring h-11 rounded-md border border-forest-900/15 px-4 text-sm font-semibold text-forest-950" onClick={() => choose("necessary")} type="button">{ru ? "Только необходимые" : "Necessary only"}</button>
              <button className="focus-ring h-11 rounded-md bg-forest-700 px-4 text-sm font-semibold text-white hover:bg-forest-900" onClick={() => choose("all")} type="button">{ru ? "Принять все" : "Accept all"}</button>
            </div>
          </div>
        </aside>
      )}
      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/80 p-4" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
          <button className="absolute inset-0" onClick={() => setPrivacyOpen(false)} type="button" aria-label={ru ? "Закрыть" : "Close"} />
          <article className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8">
            <button className="focus-ring absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-forest-900/10" onClick={() => setPrivacyOpen(false)} type="button" aria-label={ru ? "Закрыть" : "Close"}><X size={20} /></button>
            <h2 className="pr-12 text-2xl font-semibold text-forest-950" id="privacy-title">{ru ? "Политика конфиденциальности" : "Privacy policy"}</h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-charcoal/72">
              <p>{ru ? "Modul S обрабатывает данные, которые вы добровольно указываете в форме: имя, телефон и текст сообщения — только для ответа на обращение и подготовки предложения." : "Modul S processes data you voluntarily submit in the form—name, phone number, and message—only to answer your enquiry and prepare an offer."}</p>
              <p>{ru ? "Необходимые локальные данные сохраняют решение о cookies. Аналитика и рекламные технологии не должны включаться до вашего согласия." : "Necessary local data stores your cookie choice. Analytics and advertising technologies must not be enabled before your consent."}</p>
              <p>{ru ? "Данные не продаются третьим лицам. Технические подрядчики могут получать доступ только в объёме, необходимом для работы сайта и обработки заявки." : "Data is not sold to third parties. Technical providers may access it only as required to operate the site and handle your request."}</p>
              <p>{ru ? "Чтобы запросить доступ, исправление или удаление данных, свяжитесь с нами по телефону +375 44 570 27 27. Политика действует с 29 июня 2026 года." : "To request access, correction, or deletion of your data, contact us at +375 44 570 27 27. Effective 29 June 2026."}</p>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCompleted, setActiveCompleted] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const copy = content[lang];
  const activeImage = gallery ? gallery.images[gallery.index] : null;
  const completedProjects = [
    {
      title: lang === "ru" ? "Готовый модульный дом с теплой деревянной отделкой" : "Finished modular house with warm timber interiors",
      meta: lang === "ru" ? "Дом с террасой и готовой отделкой" : "House with terrace and finished interiors",
      text:
        lang === "ru"
          ? "Готовый дом с террасой, панорамным остеклением, светлой кухней-гостиной, спальней и полностью готовыми интерьерами."
          : "A completed house with a terrace, panoramic glazing, bright kitchen-living space, bedroom, and fully finished interiors.",
      quote: copy.completed.quote,
      images: completedProjectImages.familyHouse
    },
    {
      title: lang === "ru" ? "Компактный дом-студия" : "Compact studio house",
      meta: lang === "ru" ? "Готовый дом для дачи или гостевого проживания" : "Finished house for a country plot or guest stay",
      text:
        lang === "ru"
          ? "Небольшой аккуратный формат, где все ключевые зоны собраны в удобном и светлом пространстве."
          : "A small, tidy format where every key zone fits into a bright and practical space.",
      images: completedProjectImages.oneRoomHouse
    },
    {
      title: lang === "ru" ? "Баня под ключ" : "Turnkey sauna",
      meta: lang === "ru" ? "Парная, душевая и зона отдыха" : "Steam room, shower, and rest area",
      text:
        lang === "ru"
          ? "Отдельная баня с чистовой отделкой, парной и готовыми инженерными решениями."
          : "A separate sauna with finished interiors, a steam room, and ready utility solutions.",
      images: completedProjectImages.sauna
    },
    {
      title: lang === "ru" ? "Коммерческий модуль" : "Commercial module",
      meta: lang === "ru" ? "Кафе в модульном формате" : "Cafe in a modular format",
      text:
        lang === "ru"
          ? "Готовое коммерческое пространство, которое показывает, как модульная технология работает не только для домов."
          : "A finished commercial space showing how modular construction works beyond residential houses.",
      images: completedProjectImages.cafe
    }
  ];
  const selectedCompleted = completedProjects[activeCompleted] ?? completedProjects[0];
  const contactActions = [
    { label: lang === "ru" ? "Позвонить" : "Call us", detail: copy.common.phone, href: `tel:${CONTACT_PHONE}`, icon: Phone },
    { label: "Email", detail: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
    { label: copy.common.telegram, detail: copy.common.phone, href: TELEGRAM_URL, icon: MessageCircle },
    { label: copy.common.viber, detail: copy.common.phone, href: VIBER_URL, icon: MessageCircle }
  ];

  const openGallery = (images: string[], index = 0) => {
    if (!images.length) {
      return;
    }
    setGallery({ images, index: Math.max(0, index) });
  };

  const openCompleted = (src: string) => openGallery(familyHouseImages, Math.max(0, familyHouseImages.indexOf(src)));

  const showPreviousImage = () =>
    setGallery((current) => (current === null ? current : { ...current, index: (current.index - 1 + current.images.length) % current.images.length }));

  const showNextImage = () =>
    setGallery((current) => (current === null ? current : { ...current, index: (current.index + 1) % current.images.length }));

  const scrollTrack = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.9, 680), behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.lang = copy.meta.htmlLang;
  }, [copy.meta.htmlLang]);

  useEffect(() => {
    if (!gallery) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGallery(null);
      }
      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }
      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gallery]);

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !gallery) {
        setActiveProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (!gallery) {
        document.body.style.overflow = "";
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, gallery]);

  return (
    <main id="home" className="overflow-hidden" lang={copy.meta.htmlLang}>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-forest-900/10 bg-white/95 shadow-sm backdrop-blur">
        <div className="section-shell flex h-20 items-center justify-between gap-5 text-forest-950">
          <a className="focus-ring flex items-center gap-3 rounded-md" href="#home" aria-label={`${copy.brand.name} home`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-forest-900/15 text-forest-700">
              <Home size={21} />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-semibold uppercase tracking-[0.22em]">{copy.brand.name}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-charcoal/55">{copy.brand.location}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-charcoal/70 lg:flex" aria-label="Primary">
            {copy.nav.map((item) => (
              <a className="transition hover:text-forest-950" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a className="hidden items-center gap-2 text-sm font-semibold text-forest-950 md:flex" href="tel:+375445702727">
              <Phone size={16} />
              {copy.common.phone}
            </a>
            <button
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border border-forest-900/10 px-3 text-xs font-semibold text-forest-950 transition hover:bg-linen"
              onClick={() => setLang(lang === "en" ? "ru" : "en")}
              aria-label={copy.meta.switchLabel}
              type="button"
            >
              <Globe size={15} />
              {copy.meta.switchTo}
            </button>
            <a
              className="focus-ring hidden h-11 items-center justify-center gap-2 rounded-md bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-900 sm:inline-flex"
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
          onClick={() => openCompleted("/family-house/IMG_0640.JPG")}
          type="button"
          aria-label="Open hero photo preview"
        >
          <Image
            src={asset("/family-house/IMG_0640.JPG")}
            alt="Modular timber house with terrace near forest"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
          />
        </button>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/45 to-forest-950/5" />
        <div className="section-shell relative flex min-h-[680px] items-center">
          <div className="max-w-3xl py-20">
            {copy.hero.eyebrow && <p className="eyebrow text-sand">{copy.hero.eyebrow}</p>}
            <h1 className={`${copy.hero.eyebrow ? "mt-5" : ""} text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl`}>{copy.hero.title}</h1>
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

      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading eyebrow={copy.seoIntro.eyebrow} title={copy.seoIntro.title} />
          <div>
            <div className="space-y-4 text-sm leading-7 text-charcoal/72 sm:text-base">
              {copy.seoIntro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {copy.seoIntro.items.map((item) => (
                <li className="flex items-center gap-2 rounded-md bg-linen px-4 py-3 text-sm font-semibold text-forest-950" key={item}>
                  <Check className="shrink-0 text-forest-700" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-linen py-20" id="packages">
        <div className="section-shell">
          <SectionHeading eyebrow={copy.packagesSection.eyebrow} title={copy.packagesSection.title} text={copy.packagesSection.text} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {copy.packages.map((pkg, index) => (
              <article
                className={`flex flex-col rounded-md border p-7 ${index === 1 ? "border-forest-700/30 bg-white" : "border-forest-900/10 bg-white"}`}
                key={pkg.name}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-md ${index === 1 ? "bg-forest-700 text-white" : "bg-forest-50 text-forest-700"}`}>
                  <Layers size={22} />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-forest-950">{pkg.name}</h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/68">{pkg.tagline}</p>
                <ul className="mt-6 space-y-3 text-sm text-charcoal/72">
                  {pkg.features.map((feature) => (
                    <li className="flex items-start gap-2" key={feature}>
                      <Check className="mt-0.5 shrink-0 text-forest-700" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {pkg.extras && (
                  <div className="mt-6 rounded-md bg-linen p-5 ring-1 ring-forest-900/10">
                    {pkg.extrasLabel && (
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-forest-700">
                        <Sparkles size={15} />
                        {pkg.extrasLabel}
                      </p>
                    )}
                    <ul className="mt-4 space-y-3 text-sm text-charcoal/72">
                      {pkg.extras.map((feature) => (
                        <li className="flex items-start gap-2" key={feature}>
                          <Check className="mt-0.5 shrink-0 text-forest-700" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20" id="projects">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={copy.projectsSection.eyebrow} title={copy.projectsSection.title} text={copy.projectsSection.text} />
            <div className="flex items-center gap-2">
              <a
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-forest-700 px-5 text-sm font-semibold text-white transition hover:bg-forest-900"
                href={asset("/catalog.pdf")}
                target="_blank"
                rel="noopener"
              >
                <Download size={17} />
                {copy.common.getCatalog}
              </a>
              <button
                className="focus-ring flex h-12 w-12 items-center justify-center rounded-md border border-forest-900/10 text-forest-950 transition hover:bg-linen"
                onClick={() => scrollTrack(-1)}
                type="button"
                aria-label={copy.common.prev}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="focus-ring flex h-12 w-12 items-center justify-center rounded-md border border-forest-900/10 text-forest-950 transition hover:bg-linen"
                onClick={() => scrollTrack(1)}
                type="button"
                aria-label={copy.common.next}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-white to-transparent sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-white to-transparent sm:block" />
            <div
              ref={trackRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-2"
            >
            {copy.projects.map((project) => (
              <article
                className="flex w-[290px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-forest-700/30 hover:shadow-lg sm:w-[320px]"
                key={project.id}
              >
                <div className="relative">
                  {project.image ? (
                    <button
                      className="group focus-ring relative block h-44 w-full cursor-zoom-in overflow-hidden bg-forest-950"
                      onClick={() => openGallery([project.image, project.plan].filter(Boolean) as string[], 0)}
                      type="button"
                      aria-label={`${project.title} — ${copy.common.render}`}
                    >
                      <Image src={asset(project.image)} alt={`${project.title} — ${copy.common.render}`} fill sizes="320px" className="object-cover transition duration-500 group-hover:scale-105" />
                    </button>
                  ) : (
                    <PhotoPlaceholder label={`${copy.common.render} · ${copy.common.noPhoto}`} className="h-44 w-full" />
                  )}
                  {project.plan ? (
                    <button
                      className="group focus-ring relative block h-28 w-full cursor-zoom-in overflow-hidden border-t border-forest-900/10 bg-white"
                      onClick={() => openGallery([project.image, project.plan].filter(Boolean) as string[], project.image ? 1 : 0)}
                      type="button"
                      aria-label={`${project.title} — ${copy.common.plan}`}
                    >
                      <Image src={asset(project.plan)} alt={`${project.title} — ${copy.common.plan}`} fill sizes="320px" className="object-contain" />
                    </button>
                  ) : (
                    <PhotoPlaceholder label={`${copy.common.plan} · ${copy.common.noPhoto}`} className="h-28 w-full border-t border-forest-900/10" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-forest-950">{project.title}</h3>
                      <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal/45">{project.projectNo}</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-forest-50 px-3 py-2 text-sm font-semibold text-forest-700">{project.area}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-charcoal/68">{project.summary}</p>

                  <div className="mt-5 mb-6 grid gap-2">
                    {project.priceWarm && (
                      <div className="flex items-center justify-between rounded-md border border-forest-900/10 bg-linen px-3 py-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-charcoal/55">{copy.common.priceWarm}</span>
                        <strong className="text-sm text-forest-950">{project.priceWarm}</strong>
                      </div>
                    )}
                    <div className="flex items-center justify-between rounded-md border border-forest-700 bg-forest-50 px-3 py-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-forest-700">{project.singleColumn ? copy.common.priceFinished : copy.common.priceTurnkey}</span>
                      <strong className="text-sm text-forest-950">{project.priceTurnkey}</strong>
                    </div>
                  </div>

                  <button
                    className="focus-ring mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-900"
                    onClick={() => setActiveProject(project)}
                    type="button"
                  >
                    {copy.common.viewProject}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linen py-20" id="options">
        <div className="section-shell">
          <SectionHeading
            eyebrow={copy.optionsSection.eyebrow}
            title={copy.optionsSection.title}
            text={copy.optionsSection.text}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {copy.options.map((option) => (
              <div className="flex items-start gap-3 rounded-md border border-forest-900/10 bg-white p-4" key={option}>
                <Check className="mt-0.5 shrink-0 text-forest-700" size={18} />
                <span className="text-sm font-semibold leading-6 text-forest-950">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20" id="faq">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeading eyebrow={copy.faq.eyebrow} title={copy.faq.title} text={copy.faq.text} />
          <div className="divide-y divide-forest-900/10 overflow-hidden rounded-md border border-forest-900/10 bg-white">
            {copy.faq.items.map((item, index) => (
              <details className="group p-5 open:bg-linen/60" key={item.question} open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-forest-950">
                  {item.question}
                  <span className="text-xl font-normal text-forest-700 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 pr-8 text-sm leading-7 text-charcoal/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-white">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="eyebrow text-sand">{copy.completed.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{copy.completed.title}</h2>
            <p className="mt-5 text-base leading-7 text-white/72">{copy.completed.text}</p>
            {copy.completed.location && (
              <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-sand">
                <MapPin size={17} />
                {copy.completed.location}
              </p>
            )}
            <div className="mt-9 grid gap-3">
              {completedProjects.map((project, index) => {
                const active = index === activeCompleted;
                return (
                  <button
                    className={`focus-ring group grid grid-cols-[72px_1fr] items-center gap-4 rounded-md border p-3 text-left transition ${
                      active ? "border-sand bg-white text-forest-950" : "border-white/12 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                    }`}
                    key={project.title}
                    onClick={() => setActiveCompleted(index)}
                    type="button"
                  >
                    <span className="relative h-16 overflow-hidden rounded-md bg-forest-900">
                      <Image src={asset(project.images[0])} alt={project.title} fill sizes="72px" className="object-cover transition duration-500 group-hover:scale-105" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{project.title}</span>
                      <span className={`mt-1 block text-xs leading-5 ${active ? "text-charcoal/62" : "text-white/58"}`}>{project.meta}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <button
              className="group focus-ring relative block h-[420px] w-full cursor-zoom-in overflow-hidden rounded-md bg-forest-900 shadow-2xl"
              onClick={() => openGallery(selectedCompleted.images, 0)}
              type="button"
              aria-label={`${copy.completed.imageAlt} ${selectedCompleted.title}`}
            >
              <Image src={asset(selectedCompleted.images[0])} alt={selectedCompleted.title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 to-transparent p-5">
                <span className="block text-xl font-semibold">{selectedCompleted.title}</span>
                <span className="mt-2 block max-w-2xl text-sm leading-6 text-white/72">{selectedCompleted.text}</span>
              </span>
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-forest-950/75 text-white opacity-0 transition group-hover:opacity-100">
                <Expand size={18} />
              </span>
            </button>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {selectedCompleted.images.slice(1).map((src, index) => (
              <button
                className="group focus-ring relative h-24 cursor-zoom-in overflow-hidden rounded-md bg-forest-900 sm:h-28"
                key={src}
                onClick={() => openGallery(selectedCompleted.images, index + 1)}
                type="button"
                aria-label={`${copy.completed.imageAlt} ${index + 1}`}
              >
                <Image src={asset(src)} alt={`${selectedCompleted.title} ${index + 2}`} fill sizes="160px" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-forest-950/75 text-white opacity-0 transition group-hover:opacity-100">
                  <Expand size={17} />
                </span>
              </button>
              ))}
            </div>
            {"quote" in selectedCompleted && selectedCompleted.quote && (
              <blockquote className="mt-5 rounded-md border border-sand/30 bg-white/8 p-5 text-base leading-7 text-white/86">
                &quot;{selectedCompleted.quote}&quot;
              </blockquote>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell">
          <SectionHeading eyebrow={copy.foundationsSection.eyebrow} title={copy.foundationsSection.title} text={copy.foundationsSection.text} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="bg-linen py-20" id="consultation">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_0.75fr] lg:items-start">
          <SectionHeading eyebrow={copy.consultation.eyebrow} title={copy.consultation.title} text={copy.consultation.text} />
          <div className="grid gap-3 sm:grid-cols-2">
            {contactActions.map(({ label, detail, href, icon: Icon }) => (
              <a
                className="focus-ring group flex min-h-32 flex-col justify-between rounded-md border border-forest-900/10 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-forest-700/30"
                href={href}
                key={label}
                target={href.startsWith("https://") ? "_blank" : undefined}
                rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
              >
                <Icon className="text-forest-700" size={24} />
                <span className="mt-5">
                  <span className="block text-sm font-semibold text-forest-950">{label}</span>
                  <span className="mt-1 block break-all text-xs text-charcoal/60">{detail}</span>
                </span>
              </a>
            ))}
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
              <a className="flex items-center gap-2 transition hover:text-white" href="tel:+375445702727"><Phone size={16} /> {copy.common.phone}</a>
              <a
                className="flex items-center gap-2 transition hover:text-white"
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.common.telegram}: ${copy.common.phone}`}
              >
                <MessageCircle size={16} /> {copy.common.telegram}
              </a>
              <a
                className="flex items-center gap-2 transition hover:text-white"
                href={VIBER_URL}
                aria-label={`${copy.common.viber}: ${copy.common.phone}`}
              >
                <MessageCircle size={16} /> {copy.common.viber}
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sand">{copy.footer.address}</h3>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/75">
              <MapPin size={16} /> {lang === "ru" ? "г. Брест, ул. Сябровская, 90Д" : "90D Syabrovskaya Street, Brest, Belarus"}
            </p>
            <div className="mt-4 overflow-hidden rounded-md border border-white/12 bg-white/5">
              <iframe
                className="h-52 w-full border-0"
                src={YANDEX_MAP_WIDGET_URL}
                title={lang === "ru" ? "Карта проезда — Сябровская, 90Д" : "Directions map — 90D Syabrovskaya Street"}
                loading="lazy"
                allowFullScreen
              />
              <a
                className="focus-ring flex items-center justify-center gap-2 border-t border-white/12 px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
                href={YANDEX_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="text-sand" size={16} />
                {copy.common.googleMapsArea}
              </a>
            </div>
          </div>
        </div>
        <div className="section-shell mt-10 border-t border-white/12 pt-8">
          <h3 className="text-sm font-semibold text-sand">{copy.footer.legalTitle}</h3>
          <p className="mt-3 max-w-6xl text-xs leading-6 text-white/55">{copy.footer.legalText}</p>
        </div>
      </footer>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          copy={copy.common}
          onClose={() => setActiveProject(null)}
          onOpenImage={(images, index) => openGallery(images, index)}
        />
      )}

      {activeImage && (
        <div className="fixed inset-0 z-[80] bg-forest-950/95 text-white" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 cursor-zoom-out"
            onClick={() => setGallery(null)}
            type="button"
            aria-label={copy.common.close}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <div className="relative h-[78vh] w-full max-w-6xl">
              <Image
                src={asset(activeImage)}
                alt={`${copy.completed.imageAlt} ${(gallery?.index ?? 0) + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <button
            className="focus-ring absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white hover:text-forest-950"
            onClick={() => setGallery(null)}
            type="button"
            aria-label={copy.common.close}
          >
            <X size={22} />
          </button>
          {gallery && gallery.images.length > 1 && (
            <>
              <button
                className="focus-ring absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white hover:text-forest-950"
                onClick={showPreviousImage}
                type="button"
                aria-label={copy.common.prev}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="focus-ring absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white hover:text-forest-950"
                onClick={showNextImage}
                type="button"
                aria-label={copy.common.next}
              >
                <ChevronRight size={28} />
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                {(gallery.index ?? 0) + 1} / {gallery.images.length}
              </div>
            </>
          )}
        </div>
      )}
      <CookieNotice lang={lang} />
    </main>
  );
}
