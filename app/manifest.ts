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
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
