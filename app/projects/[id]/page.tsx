import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Mail, Phone } from "lucide-react";
import { content, type Project } from "../../data/content";

const SITE_URL = "https://modulsdom-brest.by";

function findProject(id: string) {
  return content.ru.projects.find((project) => project.id === id);
}

function priceValue(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
}

function projectDescription(project: Project) {
  const kind = project.kind === "bath" ? "модульной бани" : "модульного дома";
  return `Проект ${kind} ${project.area} в Бресте: планировка, размеры ${project.size}, комплектация и цена под ключ. Производство, доставка и монтаж по Беларуси.`;
}

export function generateStaticParams() {
  return content.ru.projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = findProject(id);
  if (!project) return {};

  const title = `${project.title} — цена под ключ в Бресте | Modul S`;
  const description = projectDescription(project);
  const url = `/projects/${project.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: project.image ? [{ url: project.image, alt: project.title }] : undefined
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = findProject(id);
  if (!project) notFound();

  const amount = priceValue(project.priceTurnkey);
  const url = `${SITE_URL}/projects/${project.id}`;
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: project.title,
    sku: project.projectNo,
    description: projectDescription(project),
    category: project.kind === "bath" ? "Модульные бани" : "Модульные дома",
    image: project.image ? `${SITE_URL}${project.image}` : undefined,
    brand: { "@type": "Brand", name: "Modul S" },
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
      { "@type": "ListItem", position: 2, name: "Проекты", item: `${SITE_URL}/#projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: url }
    ]
  };

  return (
    <main className="min-h-screen bg-linen pb-20 text-charcoal">
      <div className="section-shell py-6">
        <Link className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-950" href="/#projects">
          <ArrowLeft size={17} /> Все проекты
        </Link>
      </div>

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
            <p className="eyebrow">Проект № {project.projectNo}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-forest-950 sm:text-5xl">{project.title}</h1>
            <p className="mt-5 text-base leading-7 text-charcoal/72">{project.summary} Производим в Бресте, организуем доставку и монтаж по Беларуси.</p>

            <dl className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-linen p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">Площадь</dt><dd className="mt-1 font-semibold text-forest-950">{project.area}</dd></div>
              <div className="rounded-md bg-linen p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">Габариты</dt><dd className="mt-1 font-semibold text-forest-950">{project.size}</dd></div>
              {project.terrace && <div className="rounded-md bg-linen p-4 sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">Терраса</dt><dd className="mt-1 font-semibold text-forest-950">{project.terrace}</dd></div>}
            </dl>

            <div className="mt-6 space-y-3">
              {project.priceWarm && <div className="flex items-center justify-between rounded-md border border-forest-900/10 p-4"><span className="text-sm font-semibold">Тёплый контур</span><strong className="text-lg text-forest-950">{project.priceWarm}</strong></div>}
              <div className="flex items-center justify-between rounded-md border border-forest-700 bg-forest-50 p-4"><span className="text-sm font-semibold text-forest-700">{project.singleColumn ? "Чистовая отделка" : "Под ключ"}</span><strong className="text-lg text-forest-950">{project.priceTurnkey}</strong></div>
              {project.priceNote && <p className="text-xs leading-5 text-charcoal/60">{project.priceNote}</p>}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-forest-700 px-5 text-sm font-semibold text-white hover:bg-forest-900" href="tel:+375445702727"><Phone size={17} /> Позвонить</a>
              <a className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md border border-forest-700 px-5 text-sm font-semibold text-forest-700 hover:bg-forest-50" href="mailto:Modulsdom@mail.ru"><Mail size={17} /> Запросить расчёт</a>
            </div>
          </div>
        </div>

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
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
