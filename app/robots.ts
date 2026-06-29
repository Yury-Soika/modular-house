import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://modulsdom-brest.by/sitemap.xml",
    host: "https://modulsdom-brest.by"
  };
}
