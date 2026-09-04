import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Администратор", plural: "Администраторы" },
  admin: { group: "Система", useAsTitle: "email", defaultColumns: ["email", "updatedAt"] },
  auth: { tokenExpiration: 60 * 60 * 8 },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated
  },
  fields: [
    { name: "name", label: "Имя", type: "text", defaultValue: "Администратор" }
  ]
};
