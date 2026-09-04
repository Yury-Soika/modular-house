import { ProjectCategoryPage, categoryMetadata } from "../_components/ProjectCategoryPage";
import { getCategoryPage, getProjects, getSiteSettings } from "@/cms/content";

const title = "Модульные дома под ключ в Бресте — проекты и цены | Modul S";
const description = "Проекты и цены модульных каркасных домов от производителя в Бресте. Дома для постоянного проживания и дачи с доставкой и монтажом по Беларуси.";

const fallback = {
  kind: "house" as const,
  eyebrow: "Производство в Бресте · доставка по Беларуси",
  title: "Модульные дома под ключ в Бресте",
  lead: "Каталог каркасно-модульных домов для постоянного проживания, дачи и гостевого размещения. Готовые проекты, планировки, размеры и актуальные ориентировочные цены.",
  introTitle: "Дом от производителя — от проекта до монтажа",
  paragraphs: [
    "Modul S проектирует и производит тёплые модульные дома в Бресте. Основные работы выполняются на производстве, после чего готовые модули доставляются на участок и устанавливаются на подготовленный фундамент.",
    "Можно выбрать компактный мини-дом, семейный одноэтажный дом с террасой или адаптировать планировку под ваш участок. Доступны комплектации «тёплый контур» и «под ключ» с отделкой и инженерными системами."
  ],
  benefits: ["Для круглогодичного проживания", "Проекты от 22 до 84 м²", "Доставка и монтаж по Беларуси", "Индивидуальная планировка"],
  catalogTitle: "Проекты модульных домов с ценами"
};

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { meta } = await getCategoryPage("houses-page", fallback, { title, description });
  return categoryMetadata(meta.title, meta.description, "/modulnye-doma", meta.image);
}

export default async function ModularHousesPage() {
  const [{ copy }, projects, settings] = await Promise.all([getCategoryPage("houses-page", fallback, { title, description }), getProjects(), getSiteSettings()]);
  return <ProjectCategoryPage path="/modulnye-doma" copy={copy} allProjects={projects} settings={settings} />;
}
