import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://modulsdom-brest.by", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
