import { Download } from "lucide-react";

export default function CatalogDownload({ href, lang = "ru", className }: { href: string; lang?: "ru" | "en"; className?: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const url = href.startsWith("/") ? `${basePath}${href}` : href;
  return <a data-ym-goal="catalog_download" className={className ?? "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-forest-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-900"} href={url} download target="_blank" rel="noopener noreferrer"><Download size={18} />{lang === "ru" ? "Скачать каталоги" : "Download catalogs"}</a>;
}
