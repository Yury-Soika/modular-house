import { ProjectCategoryPage, categoryMetadata } from "../_components/ProjectCategoryPage";
import { getCategoryPage, getProjects, getSiteSettings } from "@/cms/content";

const title = "Модульные бани под ключ в Бресте — проекты и цены | Modul S";
const description = "Модульные бани под ключ от производителя в Бресте: проекты, планировки, комплектации и цены. Производство, доставка и монтаж по Беларуси.";

const fallback = {
  kind: "bath" as const,
  eyebrow: "Готовые проекты · производство в Бресте",
  title: "Модульные бани под ключ",
  lead: "Проекты мобильных каркасных бань с парной, моечной и комнатой отдыха. Публикуем размеры, варианты отделки и ориентировочные цены.",
  introTitle: "Готовая баня с доставкой и монтажом",
  paragraphs: [
    "Модульная баня изготавливается в контролируемых условиях на производстве и приезжает на участок в высокой степени готовности. Это сокращает объём работ на территории и помогает заранее согласовать планировку и отделку.",
    "Подберём размеры парной и зоны отдыха, вариант печи, внутреннюю и наружную отделку. Организуем доставку из Бреста и монтаж в вашем регионе Беларуси после проверки подъезда и готовности основания."
  ],
  benefits: ["Парная и зона отдыха", "Варианты отделки", "Доставка по Беларуси", "Планировка под участок"],
  catalogTitle: "Проекты модульных бань с ценами"
};

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { meta } = await getCategoryPage("baths-page", fallback, { title, description });
  return categoryMetadata(meta.title, meta.description, "/modulnye-bani", meta.image);
}

export default async function ModularBathsPage() {
  const [{ copy }, projects, settings] = await Promise.all([getCategoryPage("baths-page", fallback, { title, description }), getProjects(), getSiteSettings()]);
  return <ProjectCategoryPage path="/modulnye-bani" copy={copy} allProjects={projects} settings={settings} />;
}
