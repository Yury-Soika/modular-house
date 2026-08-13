import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Mail, Phone } from "lucide-react";
import { content, type Project } from "../data/content";

const SITE_URL = "https://modulsdom-brest.by";

type CategoryCopy = {
  kind: Project["kind"];
  eyebrow: string;
  title: string;
  lead: string;
  introTitle: string;
  paragraphs: string[];
  benefits: string[];
  catalogTitle: string;
};

export function categoryMetadata(title: string, description: string, path: string): Metadata {
  const isBaths = path === "/modulnye-bani";
  return {
    title,
    description,
    keywords: isBaths
      ? ["модульные бани Беларусь", "модульная баня под ключ", "проекты модульных бань", "модульные бани Брест", "Modul S"]
      : ["модульные дома Беларусь", "модульные дома под ключ", "проекты модульных домов", "модульные дома Брест", "Modul S"],
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", images: ["/site-preview-ru.jpg"] },
    twitter: { card: "summary_large_image", title, description, images: ["/site-preview-ru.jpg"] }
  };
}

export function ProjectCategoryPage({ copy, path }: { copy: CategoryCopy; path: string }) {
  const projects = content.ru.projects.filter((project) => project.kind === copy.kind);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.catalogTitle,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `${SITE_URL}/projects/${project.id}`
    }))
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: copy.title, item: `${SITE_URL}${path}` }
    ]
  };

  return (
    <main className="min-h-screen bg-linen text-charcoal">
      <section className="bg-forest-950 py-20 text-white">
        <div className="section-shell">
          <nav aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 text-sm text-white/65">
              <li><Link className="hover:text-white" href="/">Главная</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li className="font-semibold text-sand" aria-current="page">{copy.title}</li>
            </ol>
          </nav>
          <p className="eyebrow mt-10 text-sand">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{copy.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a data-ym-goal="phone_click" className="focus-ring inline-flex h-12 items-center gap-2 rounded-md bg-sand px-5 text-sm font-semibold text-forest-950" href="tel:+375445702727"><Phone size={17} /> +375 44 570-27-27</a>
            <a data-ym-goal="email_click" className="focus-ring inline-flex h-12 items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold text-white" href="mailto:Modulsdom@mail.ru"><Mail size={17} /> Получить расчёт</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">{copy.introTitle}</h2>
          <div>
            <div className="space-y-4 leading-7 text-charcoal/72">{copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">{copy.benefits.map((benefit) => <li className="flex items-center gap-2 rounded-md bg-linen p-4 text-sm font-semibold text-forest-950" key={benefit}><Check className="shrink-0 text-forest-700" size={17} />{benefit}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-shell">
          <h2 className="text-3xl font-semibold text-forest-950 sm:text-4xl">{copy.catalogTitle}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-charcoal/70">Сравните площадь, размеры и ориентировочную стоимость. На странице каждого проекта опубликованы характеристики и состав комплектаций.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article className="flex flex-col overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-soft" key={project.id}>
                {project.image ? <Link className="focus-ring relative block h-52 overflow-hidden bg-forest-50" href={`/projects/${project.id}`} aria-label={`${project.title} — открыть проект`}><Image src={project.image} alt={`${project.title} — внешний вид`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition duration-300 hover:scale-105" /></Link> : <div className="flex h-52 items-center justify-center bg-forest-50 text-xs font-semibold uppercase tracking-wider text-forest-700">Фото готовится</div>}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold text-forest-950"><Link className="focus-ring rounded-sm transition hover:text-forest-700" href={`/projects/${project.id}`}>{project.title}</Link></h3>
                  <p className="mt-2 text-sm leading-6 text-charcoal/68">{project.summary}</p>
                  <div className="mt-5 flex items-center justify-between rounded-md bg-forest-50 p-3"><span className="text-xs font-semibold uppercase text-forest-700">Под ключ</span><strong>{project.priceTurnkey}</strong></div>
                  <Link data-ym-goal="project_open" data-project-id={project.id} className="focus-ring mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-forest-700 px-4 text-sm font-semibold text-white hover:bg-forest-900" href={`/projects/${project.id}`}>Проект и комплектация <ArrowRight size={16} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell"><h2 className="text-3xl font-semibold text-forest-950">Как получить точную стоимость</h2><p className="mt-4 max-w-3xl leading-7 text-charcoal/72">Цена зависит от проекта, отделки, инженерных систем, фундамента и расстояния доставки. Расскажите о вашем участке и задачах — подготовим понятную комплектацию и расчёт без скрытых работ.</p><Link data-ym-goal="consultation_click" className="mt-7 inline-flex items-center gap-2 font-semibold text-forest-700" href="/#consultation">Связаться с производителем <ArrowRight size={17} /></Link></div>
      </section>

      <nav aria-label="Полезные разделы" className="border-t border-forest-900/10 bg-linen py-10">
        <div className="section-shell flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-forest-700">
          <Link href="/modulnye-doma">Проекты модульных домов</Link><Link href="/modulnye-bani">Проекты модульных бань</Link><Link href="/o-proizvodstve">О производстве</Link><Link href="/garantiya-i-servis">Гарантия и сервис</Link><Link href="/dostavka-i-montazh">Доставка и монтаж</Link><Link href="/individualnoe-proektirovanie">Индивидуальное проектирование</Link><Link href="/kontakty">Контакты</Link>
        </div>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
    </main>
  );
}
