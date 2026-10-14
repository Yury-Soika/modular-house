import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Phone } from "lucide-react";
import { content, type Project } from "../data/content";
import BathPackageSection from "./BathPackageSection";
import ProjectCard from "./ProjectCard";
import EstimateButton from "./EstimateButton";
import CatalogDownload from "./CatalogDownload";

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

export function categoryMetadata(title: string, description: string, path: string, image = "/site-preview-ru.jpg"): Metadata {
  const isBaths = path === "/modulnye-bani";
  return {
    title,
    description,
    keywords: isBaths
      ? ["модульные бани Беларусь", "модульная баня под ключ", "проекты модульных бань", "модульные бани Брест", "Modul S"]
      : ["модульные дома Беларусь", "модульные дома под ключ", "проекты модульных домов", "модульные дома Брест", "Modul S"],
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] }
  };
}

export function ProjectCategoryPage({ copy, path, allProjects = content.ru.projects, settings = { phone: "+375445702727", email: "Modulsdom@mail.ru" } }: { copy: CategoryCopy; path: string; allProjects?: Project[]; settings?: { phone: string; email: string; catalog?: string } }) {
  const projects = allProjects.filter((project) => project.kind === copy.kind);
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
            <a data-ym-goal="phone_click" className="focus-ring inline-flex h-12 items-center gap-2 rounded-md bg-sand px-5 text-sm font-semibold text-forest-950" href={`tel:${settings.phone}`}><Phone size={17} /> {settings.phone}</a>
            <EstimateButton phone={settings.phone} email={settings.email} className="focus-ring inline-flex h-12 items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold text-white" />
            <CatalogDownload href={settings.catalog || "/catalog.pdf"} className="focus-ring inline-flex h-12 items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold text-white" />
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
            {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
          </div>
        </div>
      </section>

      {copy.kind === "bath" && <BathPackageSection />}

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
