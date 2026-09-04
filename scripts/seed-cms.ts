import path from "node:path";
import { readdir } from "node:fs/promises";
import { getPayload } from "payload";
import config from "../payload.config";
import { content } from "../app/data/content";

const adminEmail = process.env.CMS_ADMIN_EMAIL;
const adminPassword = process.env.CMS_ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  throw new Error("CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD are required for cms:seed");
}

const payload = await getPayload({ config });

const existingUsers = await payload.find({
  collection: "users",
  where: { email: { equals: adminEmail } },
  limit: 1,
  overrideAccess: true
});

if (!existingUsers.docs.length) {
  await payload.create({
    collection: "users",
    data: { email: adminEmail, password: adminPassword, name: "Администратор" },
    overrideAccess: true
  });
  payload.logger.info(`Created CMS administrator ${adminEmail}`);
} else {
  payload.logger.info(`CMS administrator ${adminEmail} already exists`);
}

const mediaBySource = new Map<string, number>();

async function importMedia(source: string, alt: string) {
  if (mediaBySource.has(source)) return mediaBySource.get(source)!;
  const filename = path.basename(source);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true
  });
  if (existing.docs[0]) {
    mediaBySource.set(source, existing.docs[0].id as number);
    return existing.docs[0].id as number;
  }
  const document = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.resolve(process.cwd(), source.replace(/^\//, "public/")),
    overrideAccess: true
  });
  mediaBySource.set(source, document.id as number);
  return document.id as number;
}

for (const project of content.ru.projects) {
  const existing = await payload.find({
    collection: "projects",
    where: { slug: { equals: project.id } },
    limit: 1,
    overrideAccess: true
  });
  const image = project.image ? await importMedia(project.image, `${project.title} — внешний вид`) : undefined;
  const plan = project.plan ? await importMedia(project.plan, `${project.title} — планировка`) : undefined;
  const data = {
    title: project.title,
    slug: project.id,
    projectNo: project.projectNo,
    kind: project.kind,
    summary: project.summary,
    feature: project.feature,
    rooms: project.rooms,
    bedrooms: project.bedrooms,
    area: project.area,
    size: project.size,
    terrace: project.terrace,
    priceWarm: project.priceWarm,
    priceTurnkey: project.priceTurnkey,
    priceNote: project.priceNote,
    singleColumn: project.singleColumn,
    image,
    plan,
    legacyImagePath: project.image,
    legacyPlanPath: project.plan,
    layoutDescription: project.layoutDescription,
    suitableFor: project.suitableFor,
    highlights: project.highlights.map((text) => ({ text })),
    specs: project.specs,
    seoTitle: project.seoTitle,
    seoDescription: project.seoDescription,
    _status: "published" as const
  };
  if (existing.docs[0]) {
    await payload.update({ collection: "projects", id: existing.docs[0].id, data: data as any, overrideAccess: true });
  } else {
    await payload.create({ collection: "projects", data: data as any, overrideAccess: true });
  }
}

const galleryDefinitions = [
  {
    directory: "family-house",
    titleRu: "Готовый модульный дом с теплой деревянной отделкой",
    titleEn: "Finished modular house with warm timber interiors",
    metaRu: "Дом с террасой и готовой отделкой",
    metaEn: "House with terrace and finished interiors",
    textRu: "Готовый дом с террасой, панорамным остеклением, светлой кухней-гостиной, спальней и полностью готовыми интерьерами.",
    textEn: "A completed house with a terrace, panoramic glazing, bright kitchen-living space, bedroom, and fully finished interiors.",
    quote: content.ru.completed.quote
  },
  {
    directory: "one-room-house",
    titleRu: "Компактный дом-студия",
    titleEn: "Compact studio house",
    metaRu: "Готовый дом для дачи или гостевого проживания",
    metaEn: "Finished house for a country plot or guest stay",
    textRu: "Небольшой аккуратный формат, где все ключевые зоны собраны в удобном и светлом пространстве.",
    textEn: "A small, tidy format where every key zone fits into a bright and practical space."
  },
  {
    directory: "sauna",
    titleRu: "Баня под ключ",
    titleEn: "Turnkey sauna",
    metaRu: "Парная, душевая и зона отдыха",
    metaEn: "Steam room, shower, and rest area",
    textRu: "Отдельная баня с чистовой отделкой, парной и готовыми инженерными решениями.",
    textEn: "A separate sauna with finished interiors, a steam room, and ready utility solutions."
  },
  {
    directory: "caffee",
    titleRu: "Коммерческий модуль",
    titleEn: "Commercial module",
    metaRu: "Кафе в модульном формате",
    metaEn: "Cafe in a modular format",
    textRu: "Готовое коммерческое пространство, которое показывает, как модульная технология работает не только для домов.",
    textEn: "A finished commercial space showing how modular construction works beyond residential houses."
  }
];

const completedProjects = [];
for (const gallery of galleryDefinitions) {
  const filenames = (await readdir(path.resolve(process.cwd(), "public", gallery.directory)))
    .filter((filename) => /\.(jpe?g|png|webp|avif)$/i.test(filename))
    .sort();
  const images = [];
  for (const filename of filenames) {
    images.push(await importMedia(`/${gallery.directory}/${filename}`, `${gallery.titleRu} — фото`));
  }
  completedProjects.push({ ...gallery, images });
}

await payload.updateGlobal({
  slug: "home-page",
  data: {
    contentRu: content.ru,
    contentEn: content.en,
    aboutKitchenImage: completedProjects[0].images[0],
    aboutBedroomImage: completedProjects[0].images[1],
    completedProjects,
    _status: "published"
  },
  overrideAccess: true
});

const socialImage = await importMedia("/site-preview-ru.jpg", "Modul S — модульные дома и бани в Беларуси");
const catalog = await importMedia("/catalog.pdf", "Каталог проектов Modul S");
await payload.updateGlobal({
  slug: "site-settings",
  data: { socialImage, catalog },
  overrideAccess: true
});

payload.logger.info(`CMS seed complete: ${content.ru.projects.length} projects and ${mediaBySource.size} media files`);
await payload.destroy();
