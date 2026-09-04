import type { CollectionConfig } from "payload";
import { authenticated, anyone } from "../access";

const textItem = { name: "text", label: "Текст", type: "textarea" as const, required: true };

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Проект", plural: "Проекты домов и бань" },
  admin: {
    group: "Страницы",
    useAsTitle: "title",
    defaultColumns: ["projectNo", "title", "kind", "area", "updatedAt"],
    listSearchableFields: ["title", "projectNo", "slug"],
    preview: (doc) => `/projects/${doc.slug}`,
    livePreview: { url: ({ data }) => `/projects/${data.slug}` }
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  versions: { drafts: true, maxPerDoc: 25 },
  fields: [
    { name: "title", label: "Название", type: "text", required: true },
    { name: "slug", label: "Адрес (slug)", type: "text", required: true, unique: true, index: true },
    { name: "projectNo", label: "Номер проекта", type: "text", required: true, unique: true },
    { name: "kind", label: "Тип", type: "select", required: true, options: [{ label: "Дом", value: "house" }, { label: "Баня", value: "bath" }] },
    {
      type: "tabs",
      tabs: [
        {
          label: "Карточка проекта",
          fields: [
            { name: "summary", label: "Краткое описание", type: "textarea", required: true },
            { name: "feature", label: "Ключевая особенность", type: "text", required: true },
            { name: "rooms", label: "Планировка", type: "text", required: true },
            { name: "bedrooms", label: "Количество спален", type: "number", required: true, min: 0 },
            { name: "area", label: "Площадь", type: "text", required: true },
            { name: "size", label: "Габариты", type: "text", required: true },
            { name: "terrace", label: "Терраса", type: "text" },
            { name: "priceWarm", label: "Цена — тёплый контур", type: "text" },
            { name: "priceTurnkey", label: "Цена — под ключ", type: "text", required: true },
            { name: "priceNote", label: "Примечание к цене", type: "textarea" },
            { name: "singleColumn", label: "Одна колонка комплектации", type: "checkbox", defaultValue: false }
          ]
        },
        {
          label: "Изображения",
          fields: [
            { name: "image", label: "Визуализация / главное фото", type: "upload", relationTo: "media" },
            { name: "plan", label: "Планировка", type: "upload", relationTo: "media" },
            { name: "legacyImagePath", type: "text", admin: { hidden: true } },
            { name: "legacyPlanPath", type: "text", admin: { hidden: true } }
          ]
        },
        {
          label: "Подробности",
          fields: [
            { name: "layoutDescription", label: "Описание планировки", type: "textarea", required: true },
            { name: "suitableFor", label: "Для кого подходит", type: "textarea", required: true },
            { name: "highlights", label: "Ключевые особенности", type: "array", fields: [textItem] },
            {
              name: "specs",
              label: "Комплектация и характеристики",
              type: "array",
              fields: [
                { name: "label", label: "Параметр", type: "text", required: true },
                { name: "warm", label: "Тёплый контур", type: "textarea" },
                { name: "turnkey", label: "Под ключ", type: "textarea", required: true }
              ]
            }
          ]
        },
        {
          label: "SEO",
          fields: [
            { name: "seoTitle", label: "SEO-заголовок", type: "text", required: true },
            { name: "seoDescription", label: "SEO-описание", type: "textarea", required: true }
          ]
        }
      ]
    }
  ]
};
