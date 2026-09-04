import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Mail, Phone } from "lucide-react";
import type { Project } from "../../data/content";
import { getProjects, getSiteSettings } from "@/cms/content";

const SITE_URL = "https://modulsdom-brest.by";

async function findProject(id: string) {
  return (await getProjects()).find((project) => project.id === id);
}

function priceValue(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await findProject(id);
  if (!project) return {};

  const title = project.seoTitle;
  const description = project.seoDescription;
  const url = `/projects/${project.id}`;

  return {
    title,
    description,
    keywords: [project.title, `${project.kind === "bath" ? "модульная баня" : "модульный дом"} ${project.area}`, `проект ${project.projectNo}`, `${project.kind === "bath" ? "баня" : "дом"} под ключ Беларусь`, "Modul S"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: project.image ? [{ url: project.image, alt: project.title }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);
  const project = projects.find((candidate) => candidate.id === id);
  if (!project) notFound();

  const amount = priceValue(project.priceTurnkey);
  const url = `${SITE_URL}/projects/${project.id}`;
  const categoryPath = project.kind === "bath" ? "/modulnye-bani" : "/modulnye-doma";
  const categoryName = project.kind === "bath" ? "Модульные бани" : "Модульные дома";
  const categoryProjects = projects.filter((candidate) => candidate.kind === project.kind);
  const projectIndex = categoryProjects.findIndex((candidate) => candidate.id === project.id);
  const previousProject = categoryProjects[(projectIndex - 1 + categoryProjects.length) % categoryProjects.length];
  const nextProject = categoryProjects[(projectIndex + 1) % categoryProjects.length];
  const relatedProjects = categoryProjects
    .filter((candidate) => candidate.id !== project.id)
    .sort((a, b) => Math.abs(Number.parseFloat(a.area.replace(",", ".")) - Number.parseFloat(project.area.replace(",", "."))) - Math.abs(Number.parseFloat(b.area.replace(",", ".")) - Number.parseFloat(project.area.replace(",", "."))))
    .slice(0, 3);
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    url,
    name: project.title,
    sku: project.projectNo,
    mpn: project.projectNo,
    mainEntityOfPage: url,
    material: "Деревянный каркас, минеральная вата",
    description: project.seoDescription,
    category: project.kind === "bath" ? "Модульные бани" : "Модульные дома",
    image: [project.image, project.plan]
      .filter((image): image is string => Boolean(image))
      .map((image) => `${SITE_URL}${image}`),
    brand: { "@type": "Brand", name: "Modul S" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Площадь", value: project.area },
      { "@type": "PropertyValue", name: "Габариты", value: project.size },
      { "@type": "PropertyValue", name: "Планировка", value: project.rooms },
      ...(project.terrace ? [{ "@type": "PropertyValue", name: "Терраса", value: project.terrace }] : [])
    ],
    offers: amount ? {
      "@type": "Offer",
      url,
      priceCurrency: "BYN",
      price: amount,
      availability: "https://schema.org/PreOrder",
      seller: { "@id": `${SITE_URL}/#organization` }
    } : undefined
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: categoryName, item: `${SITE_URL}${categoryPath}` },
      { "@type": "ListItem", position: 3, name: project.title, item: url }
    ]
  };

  return (
    <main className="min-h-screen bg-linen pb-20 text-charcoal">
      <nav aria-label="Хлебные крошки" className="section-shell py-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-charcoal/60">
          <li><Link className="focus-ring hover:text-forest-700" href="/">Главная</Link></li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li><Link className="focus-ring hover:text-forest-700" href={categoryPath}>{categoryName}</Link></li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li className="font-semibold text-forest-950" aria-current="page">{project.title}</li>
        </ol>
      </nav>

      <article className="section-shell">
        <div className="grid gap-8 rounded-xl bg-white p-6 shadow-soft lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {project.image ? (
              <div className="relative h-80 overflow-hidden rounded-lg bg-forest-50 lg:h-[460px]">
                <Image src={project.image} alt={`${project.title} — внешний вид`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-lg bg-forest-50 text-sm font-semibold text-forest-700 lg:h-[460px]">Визуализация проекта готовится</div>
            )}
            {project.plan && (
              <div className="relative h-64 overflow-hidden rounded-lg border border-forest-900/10 bg-white">
                <Image src={project.plan} alt={`${project.title} — планировка`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow">Проект №{project.projectNo}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-forest-950 sm:text-5xl">{project.title}</h1>
            <p className="mt-5 text-base leading-7 text-charcoal/72">{project.summary} Производим в Бресте, организуем доставку и монтаж по Беларуси.</p>

            <dl className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-linen p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">Площадь</dt><dd className="mt-1 font-semibold text-forest-950">{project.area}</dd></div>
              <div className="rounded-md bg-linen p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">Габариты</dt><dd className="mt-1 font-semibold text-forest-950">{project.size}</dd></div>
              <div className="rounded-md bg-linen p-4 sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">Планировка</dt><dd className="mt-1 font-semibold text-forest-950">{project.rooms}</dd></div>
              {project.terrace && <div className="rounded-md bg-linen p-4 sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">Терраса</dt><dd className="mt-1 font-semibold text-forest-950">{project.terrace}</dd></div>}
            </dl>

            <div className="mt-6 space-y-3">
              {project.priceWarm && <div className="flex items-center justify-between rounded-md border border-forest-900/10 p-4"><span className="text-sm font-semibold">Тёплый контур</span><strong className="text-lg text-forest-950">{project.priceWarm}</strong></div>}
              <div className="flex items-center justify-between rounded-md border border-forest-700 bg-forest-50 p-4"><span className="text-sm font-semibold text-forest-700">{project.singleColumn ? "Чистовая отделка" : "Под ключ"}</span><strong className="text-lg text-forest-950">{project.priceTurnkey}</strong></div>
              {project.priceNote && <p className="text-xs leading-5 text-charcoal/60">{project.priceNote}</p>}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a data-ym-goal="phone_click" className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-forest-700 px-5 text-sm font-semibold text-white hover:bg-forest-900" href={`tel:${settings.phone}`}><Phone size={17} /> Позвонить</a>
              <a data-ym-goal="email_click" className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md border border-forest-700 px-5 text-sm font-semibold text-forest-700 hover:bg-forest-50" href={`mailto:${settings.email}`}><Mail size={17} /> Запросить расчёт</a>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-8 rounded-xl bg-forest-950 p-6 text-white shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <p className="eyebrow text-sand">Планировка проекта №{project.projectNo}</p>
            <h2 className="mt-3 text-3xl font-semibold">Что отличает этот проект</h2>
            <p className="mt-5 leading-7 text-white/75">{project.layoutDescription}</p>
            <p className="mt-4 leading-7 text-white/75">{project.suitableFor}</p>
          </div>
          <div className="rounded-lg bg-white/8 p-5">
            <h3 className="text-lg font-semibold">Ключевые особенности</h3>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => <li className="flex items-start gap-3 text-sm leading-6 text-white/80" key={item}><Check className="mt-1 shrink-0 text-sand" size={16} />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-xl bg-white p-6 shadow-soft lg:p-10">
          <h2 className="text-3xl font-semibold text-forest-950">Комплектация и характеристики</h2>
          <p className="mt-3 max-w-3xl leading-7 text-charcoal/70">Состав работ зависит от выбранной комплектации. Итоговую смету фиксируем после согласования планировки, участка, фундамента, доставки и инженерных решений.</p>
          <div className="mt-7 overflow-hidden rounded-md border border-forest-900/10">
            {project.specs.map((row) => (
              <div className={`grid ${project.singleColumn ? "grid-cols-[0.8fr_1.2fr]" : "grid-cols-[0.8fr_1fr_1fr]"} border-b border-forest-900/10 text-sm last:border-b-0`} key={row.label}>
                <strong className="bg-linen p-3 text-forest-950">{row.label}</strong>
                {!project.singleColumn && <span className="p-3 leading-6 text-charcoal/72">{row.warm}</span>}
                <span className="p-3 leading-6 text-charcoal/72">{row.turnkey}</span>
              </div>
            ))}
          </div>
          <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">
            {["Производство в Бресте", "Доставка и монтаж по Беларуси", "Возможна корректировка планировки"].map((item) => <li className="flex items-center gap-2 font-semibold text-forest-950" key={item}><Check className="text-forest-700" size={17} />{item}</li>)}
          </ul>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Сравнить варианты</p><h2 className="mt-2 text-3xl font-semibold text-forest-950">Похожие проекты</h2></div>
            <Link className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-forest-700" href={categoryPath}>Все проекты категории <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {relatedProjects.map((related) => (
              <article className="overflow-hidden rounded-xl bg-white shadow-soft" key={related.id}>
                <Link data-ym-goal="project_open" data-project-id={related.id} className="group block" href={`/projects/${related.id}`}>
                  <div className="relative h-48 bg-forest-50"><Image src={related.image!} alt={`${related.title} — визуализация`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" /></div>
                  <div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-forest-700">Проект №{related.projectNo}</p><h3 className="mt-2 text-lg font-semibold leading-6 text-forest-950">{related.title}</h3><p className="mt-3 text-sm leading-6 text-charcoal/65">{related.summary}</p></div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <nav aria-label="Навигация между проектами" className="mt-10 grid gap-4 border-t border-forest-900/10 pt-8 sm:grid-cols-2">
          <Link className="focus-ring rounded-xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg" href={`/projects/${previousProject.id}`} rel="prev">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-700">Предыдущий проект</span>
            <strong className="mt-2 block leading-6 text-forest-950">{previousProject.title}</strong>
          </Link>
          <Link className="focus-ring rounded-xl bg-white p-5 text-right shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg" href={`/projects/${nextProject.id}`} rel="next">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-700">Следующий проект</span>
            <strong className="mt-2 block leading-6 text-forest-950">{nextProject.title}</strong>
          </Link>
        </nav>

        <nav aria-label="Полезные разделы" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-forest-900/10 pt-8 text-sm font-semibold text-forest-700">
          <Link href={categoryPath}>Все проекты категории «{categoryName}»</Link><Link href="/o-proizvodstve">О производстве</Link><Link href="/garantiya-i-servis">Гарантия и сервис</Link><Link href="/dostavka-i-montazh">Доставка и монтаж</Link><Link href="/individualnoe-proektirovanie">Изменить проект под себя</Link><Link href="/kontakty">Контакты</Link>
        </nav>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
