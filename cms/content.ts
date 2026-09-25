import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { content, type Content, type Lang, type Project } from "@/app/data/content";
import { applyCatalogUpdates } from "@/app/data/catalog-updates";
import type { CompletedProjectContent } from "@/app/_components/HomePageClient";
import type { InfoPageCopy } from "@/app/_components/InfoPage";

type UnknownRecord = Record<string, any>;

const cmsConfigured = Boolean(process.env.DATABASE_URI && process.env.PAYLOAD_SECRET);

const payloadClient = cache(async () => {
  if (!cmsConfigured) return null;
  try {
    return await getPayload({ config });
  } catch (error) {
    console.error("Payload CMS is unavailable; serving bundled content.", error);
    return null;
  }
});

export const mediaUrl = (value: unknown, fallback?: string): string | undefined => {
  if (value && typeof value === "object" && "url" in value && typeof (value as UnknownRecord).url === "string") {
    const url = (value as UnknownRecord).url as string;
    if (/^https?:\/\//.test(url)) {
      try {
        const parsed = new URL(url);
        if (parsed.pathname.startsWith("/api/media/")) return `${parsed.pathname}${parsed.search}`;
      } catch {
        return fallback;
      }
    }
    return url;
  }
  return fallback;
};

const textArray = (value: unknown, fallback: string[]): string[] => {
  if (!Array.isArray(value)) return fallback;
  const result = value.map((item) => typeof item?.text === "string" ? item.text : "").filter(Boolean);
  return result.length ? result : fallback;
};

export const getInfoPage = cache(async (slug: string, fallback: InfoPageCopy): Promise<InfoPageCopy> => {
  const payload = await payloadClient();
  if (!payload) return fallback;
  try {
    const page = await payload.findGlobal({ slug: slug as any, depth: 1 });
    const data = page as UnknownRecord;
    return {
      ...fallback,
      title: data.seo?.metaTitle || fallback.title,
      description: data.seo?.metaDescription || fallback.description,
      seoImage: mediaUrl(data.seo?.ogImage, fallback.seoImage),
      eyebrow: data.eyebrow || fallback.eyebrow,
      lead: data.lead || fallback.lead,
      introTitle: data.introTitle || fallback.introTitle,
      paragraphs: textArray(data.paragraphs, fallback.paragraphs),
      sections: Array.isArray(data.sections) && data.sections.length
        ? data.sections.map((section: UnknownRecord) => ({
            title: section.title,
            text: section.text,
            items: textArray(section.items, [])
          }))
        : fallback.sections,
      ctaTitle: data.ctaTitle || fallback.ctaTitle,
      ctaText: data.ctaText || fallback.ctaText,
      showContacts: typeof data.showContacts === "boolean" ? data.showContacts : fallback.showContacts
    };
  } catch (error) {
    console.error(`Unable to read CMS global ${slug}; serving bundled content.`, error);
    return fallback;
  }
});

export type CategoryPageCopy = {
  kind: Project["kind"];
  eyebrow: string;
  title: string;
  lead: string;
  introTitle: string;
  paragraphs: string[];
  benefits: string[];
  catalogTitle: string;
};

export const getCategoryPage = cache(async (
  slug: string,
  fallback: CategoryPageCopy,
  fallbackMeta: { title: string; description: string }
): Promise<{ copy: CategoryPageCopy; meta: { title: string; description: string; image?: string } }> => {
  const payload = await payloadClient();
  if (!payload) return { copy: fallback, meta: fallbackMeta };
  try {
    const page = await payload.findGlobal({ slug: slug as any, depth: 1 }) as UnknownRecord;
    return {
      copy: {
        ...fallback,
        eyebrow: page.eyebrow || fallback.eyebrow,
        title: page.title || fallback.title,
        lead: page.lead || fallback.lead,
        introTitle: page.introTitle || fallback.introTitle,
        paragraphs: textArray(page.paragraphs, fallback.paragraphs),
        benefits: textArray(page.benefits, fallback.benefits),
        catalogTitle: page.catalogTitle || fallback.catalogTitle
      },
      meta: {
        title: page.seo?.metaTitle || fallbackMeta.title,
        description: page.seo?.metaDescription || fallbackMeta.description,
        image: mediaUrl(page.seo?.ogImage)
      }
    };
  } catch (error) {
    console.error(`Unable to read CMS global ${slug}; serving bundled content.`, error);
    return { copy: fallback, meta: fallbackMeta };
  }
});

const mapProject = (doc: UnknownRecord): Project => ({
  id: doc.slug,
  kind: doc.kind,
  title: doc.title,
  seoTitle: doc.seoTitle,
  seoDescription: doc.seoDescription,
  feature: doc.feature,
  rooms: doc.rooms,
  layoutDescription: doc.layoutDescription,
  suitableFor: doc.suitableFor,
  highlights: textArray(doc.highlights, []),
  bedrooms: doc.bedrooms,
  projectNo: doc.projectNo,
  area: doc.area,
  size: doc.size,
  terrace: doc.terrace || undefined,
  priceWarm: doc.priceWarm || undefined,
  priceTurnkey: doc.priceTurnkey,
  priceNote: doc.priceNote || undefined,
  summary: doc.summary,
  image: mediaUrl(doc.image, doc.legacyImagePath),
  plan: mediaUrl(doc.plan, doc.legacyPlanPath),
  singleColumn: Boolean(doc.singleColumn),
  specs: Array.isArray(doc.specs) ? doc.specs.map((row: UnknownRecord) => ({ label: row.label, warm: row.warm || "", turnkey: row.turnkey })) : []
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await payloadClient();
  if (!payload) return content.ru.projects;
  try {
    const result = await payload.find({ collection: "projects", depth: 1, limit: 200, pagination: false, sort: "projectNo" });
    return result.docs.length ? applyCatalogUpdates(result.docs.map((doc) => mapProject(doc as UnknownRecord))) : content.ru.projects;
  } catch (error) {
    console.error("Unable to read CMS projects; serving bundled projects.", error);
    return content.ru.projects;
  }
});

export const getSiteSettings = cache(async () => {
  const fallback = {
    siteName: "Modul S",
    phone: "+375445702727",
    email: "Modulsdom@mail.ru",
    address: "224000, г. Брест, ул. Сябровская, 90Д",
    defaultMetaTitle: "Модульные дома и бани под ключ в Беларуси | Modul S",
    defaultMetaDescription: "Проектируем и производим модульные каркасные дома и бани под ключ в Бресте с доставкой и монтажом по всей Беларуси.",
    socialImage: "/site-preview-ru.jpg",
    catalog: "/catalog.pdf"
  };
  const payload = await payloadClient();
  if (!payload) return fallback;
  try {
    const settings = await payload.findGlobal({ slug: "site-settings", depth: 1 }) as UnknownRecord;
    return {
      ...fallback,
      siteName: settings.siteName || fallback.siteName,
      phone: settings.phone || fallback.phone,
      email: settings.email || fallback.email,
      address: settings.address || fallback.address,
      defaultMetaTitle: settings.defaultMetaTitle || fallback.defaultMetaTitle,
      defaultMetaDescription: settings.defaultMetaDescription || fallback.defaultMetaDescription,
      socialImage: mediaUrl(settings.socialImage, fallback.socialImage)!,
      catalog: mediaUrl(settings.catalog, fallback.catalog)!
    };
  } catch (error) {
    console.error("Unable to read CMS settings; serving bundled settings.", error);
    return fallback;
  }
});

export const getHomeContent = cache(async (): Promise<{
  content: Record<Lang, Content>;
  heroImage: string;
  completedContent?: CompletedProjectContent[];
}> => {
  const payload = await payloadClient();
  const projects = await getProjects();
  const fallback: Record<Lang, Content> = {
    ru: { ...content.ru, projects },
    en: {
      ...content.en,
      projects: content.en.projects.map((project) => {
        const current = projects.find((candidate) => candidate.id === project.id);
        return current ? { ...project, image: current.image, plan: current.plan, priceWarm: current.priceWarm, priceTurnkey: current.priceTurnkey } : project;
      })
    }
  };
  if (!payload) return { content: fallback, heroImage: "/family-house/IMG_0640.JPG" };
  try {
    const page = await payload.findGlobal({ slug: "home-page", depth: 1 }) as UnknownRecord;
    const cmsContent = {
      ru: { ...(page.contentRu || fallback.ru), projects },
      en: { ...(page.contentEn || fallback.en), projects: fallback.en.projects }
    } as Record<Lang, Content>;
    const completedContent = Array.isArray(page.completedProjects)
      ? page.completedProjects.map((project: UnknownRecord) => ({
          titleRu: project.titleRu,
          titleEn: project.titleEn,
          metaRu: project.metaRu,
          metaEn: project.metaEn,
          textRu: project.textRu,
          textEn: project.textEn,
          quote: project.quote || undefined,
          images: Array.isArray(project.images) ? project.images.map((image: unknown) => mediaUrl(image)).filter((url: string | undefined): url is string => Boolean(url)) : []
        } as CompletedProjectContent)).filter((project: CompletedProjectContent) => project.images.length > 0)
      : undefined;
    return {
      content: cmsContent,
      heroImage: mediaUrl(page.aboutKitchenImage, completedContent?.[0]?.images[0] || "/family-house/IMG_0640.JPG")!,
      completedContent
    };
  } catch (error) {
    console.error("Unable to read CMS home page; serving bundled content.", error);
    return { content: fallback, heroImage: "/family-house/IMG_0640.JPG" };
  }
});
