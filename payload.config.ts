import path from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type GlobalConfig } from "payload";
import sharp from "sharp";
import { Media } from "./cms/collections/Media";
import { Projects } from "./cms/collections/Projects";
import { Users } from "./cms/collections/Users";
import { categoryDefaults, categoryPageGlobal, infoPageGlobal, pageDefaults } from "./cms/page-globals";
import { authenticated, anyone } from "./cms/access";
import { content } from "./app/data/content";

nextEnv.loadEnvConfig(
  process.cwd(),
  process.env.PAYLOAD_LOAD_PRODUCTION_ENV === "1" ? false : process.env.NODE_ENV !== "production"
);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const homePage: GlobalConfig = {
  slug: "home-page",
  label: "Главная",
  admin: { group: "Страницы", preview: () => "/", livePreview: { url: () => "/" } },
  access: { read: anyone, update: authenticated },
  versions: { drafts: true },
  fields: [
    {
      name: "contentRu",
      label: "Весь текст и данные — русский",
      type: "json",
      required: true,
      admin: { description: "Структурированные тексты всех секций главной страницы. Проекты берутся из отдельного раздела «Проекты домов и бань»." }
    },
    {
      name: "contentEn",
      label: "Весь текст и данные — английский",
      type: "json",
      required: true
    },
    { name: "aboutKitchenImage", label: "Фото кухни в блоке о компании", type: "upload", relationTo: "media" },
    { name: "aboutBedroomImage", label: "Фото спальни в блоке о компании", type: "upload", relationTo: "media" },
    {
      name: "completedProjects",
      label: "Галереи реализованных объектов",
      type: "array",
      fields: [
        { name: "titleRu", label: "Название (RU)", type: "text", required: true },
        { name: "titleEn", label: "Название (EN)", type: "text", required: true },
        { name: "metaRu", label: "Подзаголовок (RU)", type: "text", required: true },
        { name: "metaEn", label: "Подзаголовок (EN)", type: "text", required: true },
        { name: "textRu", label: "Описание (RU)", type: "textarea", required: true },
        { name: "textEn", label: "Описание (EN)", type: "textarea", required: true },
        { name: "quote", label: "Отзыв", type: "textarea" },
        { name: "images", label: "Фотографии", type: "upload", relationTo: "media", hasMany: true, required: true }
      ]
    }
  ]
};

const siteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Настройки сайта и SEO",
  admin: { group: "Настройки" },
  access: { read: anyone, update: authenticated },
  fields: [
    { name: "siteName", label: "Название сайта", type: "text", required: true, defaultValue: "Modul S" },
    { name: "phone", label: "Телефон", type: "text", required: true, defaultValue: "+375445702727" },
    { name: "email", label: "Email", type: "email", required: true, defaultValue: "Modulsdom@mail.ru" },
    { name: "address", label: "Адрес", type: "textarea", required: true, defaultValue: "224000, г. Брест, ул. Сябровская, 90Д" },
    { name: "defaultMetaTitle", label: "SEO-заголовок по умолчанию", type: "text", required: true, defaultValue: "Модульные дома и бани под ключ в Беларуси | Modul S" },
    { name: "defaultMetaDescription", label: "SEO-описание по умолчанию", type: "textarea", required: true, defaultValue: "Проектируем и производим модульные каркасные дома и бани под ключ в Бресте с доставкой и монтажом по всей Беларуси." },
    { name: "socialImage", label: "Изображение для соцсетей", type: "upload", relationTo: "media" },
    { name: "catalog", label: "PDF-каталог", type: "upload", relationTo: "media" }
  ]
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — Modul S CMS" }
  },
  collections: [Users, Media, Projects],
  globals: [homePage, ...categoryDefaults.map(categoryPageGlobal), ...pageDefaults.map(infoPageGlobal), siteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || "postgresql://payload:payload@127.0.0.1:5432/modulsdom" } }),
  secret: process.env.PAYLOAD_SECRET || "build-time-placeholder-change-in-production",
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "https://modulsdom-brest.by",
  cors: ["https://modulsdom-brest.by"],
  csrf: ["https://modulsdom-brest.by"],
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") }
});
