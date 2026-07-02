import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Modul S — модульные дома и бани",
    short_name: "Modul S",
    description: "Модульные дома и бани под ключ с доставкой по Беларуси.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e7",
    theme_color: "#1f3024",
    lang: "ru",
    icons: [
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}
