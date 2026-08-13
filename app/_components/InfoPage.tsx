import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";

const SITE_URL = "https://modulsdom-brest.by";

export type InfoPageCopy = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  introTitle: string;
  paragraphs: string[];
  sections: { title: string; text: string; items?: string[] }[];
  ctaTitle: string;
  ctaText: string;
  showContacts?: boolean;
};

export function infoPageMetadata(copy: InfoPageCopy): Metadata {
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: copy.path },
    openGraph: { title: copy.title, description: copy.description, url: copy.path, type: "website", images: ["/site-preview-ru.jpg"] },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: ["/site-preview-ru.jpg"] }
  };
}

export function InfoPage({ copy }: { copy: InfoPageCopy }) {
  const url = `${SITE_URL}${copy.path}`;
  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: copy.title,
    description: copy.description,
    inLanguage: "ru-BY",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` }
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: copy.eyebrow, item: url }
    ]
  };

  return (
    <main className="min-h-screen bg-linen text-charcoal">
      <section className="bg-forest-950 py-16 text-white sm:py-20">
        <div className="section-shell">
          <nav aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 text-sm text-white/65">
              <li><Link className="hover:text-white" href="/">Главная</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li className="font-semibold text-sand" aria-current="page">{copy.eyebrow}</li>
            </ol>
          </nav>
          <p className="eyebrow mt-10 text-sand">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{copy.title.replace(" | Modul S", "")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{copy.lead}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">{copy.introTitle}</h2>
          <div className="space-y-4 leading-7 text-charcoal/72">{copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </section>

      {copy.showContacts && (
        <section className="py-16">
          <div className="section-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a data-ym-goal="phone_click" className="rounded-xl bg-white p-6 shadow-soft" href="tel:+375445702727"><Phone className="text-forest-700" /><strong className="mt-5 block text-forest-950">Позвонить</strong><span className="mt-2 block text-sm text-charcoal/65">+375 44 570-27-27</span></a>
            <a data-ym-goal="email_click" className="rounded-xl bg-white p-6 shadow-soft" href="mailto:Modulsdom@mail.ru"><Mail className="text-forest-700" /><strong className="mt-5 block text-forest-950">Email</strong><span className="mt-2 block break-all text-sm text-charcoal/65">Modulsdom@mail.ru</span></a>
            <a data-ym-goal="telegram_click" className="rounded-xl bg-white p-6 shadow-soft" href="https://t.me/+375445702727" target="_blank" rel="noopener noreferrer"><MessageCircle className="text-forest-700" /><strong className="mt-5 block text-forest-950">Telegram</strong><span className="mt-2 block text-sm text-charcoal/65">Написать сообщение</span></a>
            <a data-ym-goal="viber_click" className="rounded-xl bg-white p-6 shadow-soft" href="viber://chat?number=%2B375445702727"><MessageCircle className="text-forest-700" /><strong className="mt-5 block text-forest-950">Viber</strong><span className="mt-2 block text-sm text-charcoal/65">Открыть чат</span></a>
          </div>
        </section>
      )}

      <section className={copy.showContacts ? "bg-white py-16" : "py-16"}>
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {copy.sections.map((section) => (
            <article className="rounded-xl bg-white p-6 shadow-soft lg:p-8" key={section.title}>
              <h2 className="text-2xl font-semibold text-forest-950">{section.title}</h2>
              <p className="mt-4 leading-7 text-charcoal/70">{section.text}</p>
              {section.items && <ul className="mt-5 space-y-3">{section.items.map((item) => <li className="flex items-start gap-2 text-sm leading-6 text-charcoal/72" key={item}><Check className="mt-1 shrink-0 text-forest-700" size={16} />{item}</li>)}</ul>}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest-950 py-16 text-white">
        <div className="section-shell flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div><h2 className="text-3xl font-semibold">{copy.ctaTitle}</h2><p className="mt-3 max-w-2xl leading-7 text-white/70">{copy.ctaText}</p></div>
          <Link data-ym-goal="consultation_click" className="focus-ring inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-sand px-6 text-sm font-semibold text-forest-950" href="/#consultation">Получить консультацию <ArrowRight size={17} /></Link>
        </div>
      </section>

      <nav aria-label="Разделы о компании" className="bg-white py-10">
        <div className="section-shell flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-forest-700">
          <Link href="/kontakty">Контакты</Link><Link href="/o-proizvodstve">О производстве</Link><Link href="/garantiya-i-servis">Гарантия и сервис</Link><Link href="/dostavka-i-montazh">Доставка и монтаж</Link><Link href="/individualnoe-proektirovanie">Индивидуальное проектирование</Link>
        </div>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageStructuredData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
