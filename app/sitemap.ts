import type { MetadataRoute } from "next";
import { content } from "./data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-13");
  const informationPages = [
    "/kontakty",
    "/o-proizvodstve",
    "/garantiya-i-servis",
    "/dostavka-i-montazh",
    "/individualnoe-proektirovanie"
  ];

  return [
    {
      url: "https://modulsdom-brest.by/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://modulsdom-brest.by/site-preview-ru.jpg",
        "https://modulsdom-brest.by/family-house/IMG_0640.JPG",
        "https://modulsdom-brest.by/one-room-house/IMG_8366.JPG",
        "https://modulsdom-brest.by/sauna/IMG_1319.JPG"
      ]
    },
    { url: "https://modulsdom-brest.by/modulnye-doma", lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: "https://modulsdom-brest.by/modulnye-bani", lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...informationPages.map((path) => ({
      url: `https://modulsdom-brest.by${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    ...content.ru.projects.map((project) => ({
      url: `https://modulsdom-brest.by/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [project.image, project.plan]
        .filter((image): image is string => Boolean(image))
        .map((image) => `https://modulsdom-brest.by${image}`)
    }))
  ];
}
