import path from "node:path";
import type { CollectionConfig } from "payload";
import { authenticated, anyone } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Файл", plural: "Медиатека" },
  admin: {
    group: "Контент",
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "updatedAt"]
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  upload: {
    staticDir: process.env.PAYLOAD_MEDIA_DIR || path.resolve(process.cwd(), "media"),
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 900, height: 650, position: "centre" }
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true
  },
  fields: [
    { name: "alt", label: "Описание изображения (alt)", type: "text", required: true },
    { name: "caption", label: "Подпись", type: "textarea" }
  ]
};
