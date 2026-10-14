// Change the version when replacing the bundled PDF so previously cached files
// cannot be reused by the download buttons.
export const DEFAULT_CATALOG_URL = "/catalog.pdf?v=536bf95bf575";
export const DEFAULT_CATALOG_FILENAMES = {
  ru: "Каталог проектов.pdf",
  en: "Projects catalog.pdf"
} as const;
