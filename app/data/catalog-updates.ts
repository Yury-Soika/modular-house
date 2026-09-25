import type { Project, SpecRow } from "./content";

const asset = (name: string) => `/catalog/${name}.webp`;
const money = (amount: number) => `${amount.toLocaleString("ru-RU")} BYN`;

const bathSpecs: SpecRow[] = [
  ["Комплектация", "Полностью готовая баня с чистовой отделкой"],
  ["Силовой каркас", "Доска сухая 45×145"],
  ["Кровля", "Металлопрофиль (цвет на выбор)"],
  ["Утепление", "Минеральная вата 150 мм: пол, кровля, стены"],
  ["Мембраны", "Ветро-влагозащитная и пароизоляционная мембраны с вентиляционными зазорами"],
  ["Наружная отделка", "Окрашенная имитация бруса, сорт АВ"],
  ["Окна и входная дверь", "Окна ПВХ с двухкамерными стеклопакетами, входная пластиковая дверь"],
  ["Внутренняя отделка", "Окрашенная имитация бруса, сорт АВ, или гипсокартон; в парной — вагонка из ольхи"],
  ["Пол", "Кварцвинил (цвет на выбор); в ванной комнате и парной — плитка (цвет на выбор)"],
  ["Межкомнатные двери", "Двери МДФ, стеклянная дверь в парную"],
  ["Электрика", "Скрытый или открытый монтаж, розетки, выключатели, светильники, электрический щит"],
  ["Водоснабжение", "Раковина, душ, водонагреватель, гигиенический душ, унитаз"],
  ["Парная", "Печь и дымоход"]
].map(([label, turnkey]) => ({ label, warm: "", turnkey }));

const houseOrder = ["6970893", "6971406", "7004381", "6972660", "6971491", "6972735", "7066580", "7718259", "6966147", "7055054", "7068240", "6964526", "6985270", "7042179", "6915271", "6964606"];
const bathOrder = ["7068511", "7724257", "6909223", "7541392", "7724360", "7353288", "6920434", "7518651", "7291485", "7721941", "7278116"];

type Change = {
  numbers?: string;
  area?: string;
  size?: string;
  warm?: number;
  turnkey?: number;
  terrace?: string;
  image?: string | null;
  plans?: string[];
  photos?: string[];
};

const changes: Record<string, Change> = {
  "6970893": { numbers: "6970893 и 7422347", plans: ["img-2704"] },
  "7066580": { image: "img-3504" },
  "7718259": { area: "54,6 м²", size: "7 × 7,8 м", warm: 80535, turnkey: 102375, image: "img-3507", plans: ["photo-2026-09-25-16.02.35"] },
  "7055054": { area: "60 м²", size: "6 × 10 м", terrace: "Терраса 2 × 10 м", warm: 101000, turnkey: 125000, image: "photo-2026-09-25-16.02.55" },
  "6964526": { numbers: "6964526 и 7718263", area: "63 м²", size: "7 × 9 м", warm: 92925, turnkey: 118125, image: "img-0640", plans: ["photo-2026-09-25-16.03.49", "photo-2026-09-25-16.04.07"] },
  "7068240": { image: "img-3511" },
  "6985270": { image: "img-3512" },
  "6915271": { area: "63,6 м²", size: "6 × 10,6 м", warm: 107060, turnkey: 132500, image: "photo-2026-09-25-16.04.58" },
  "7042179": { area: "72 м²", size: "8 × 9 м", warm: 117200, turnkey: 146000, image: "photo-2026-09-25-16.05.24" },
  "6964606": { area: "84 м²", size: "7 × 12 м", warm: 143400, turnkey: 177000, image: "photo-2026-09-25-16.05.47" },
  "7068511": { numbers: "7068511 и 7718287", area: "15,6 м²", size: "6 × 2,6 м", turnkey: 31200, image: "img-1301", plans: ["img-1296", "photo-2026-09-25-16.06.56"] },
  "7724257": { area: "24 м²", size: "3 × 8 м", turnkey: 38500, image: "img-3527", plans: ["photo-2026-09-25-16.07.15"] },
  "6909223": { numbers: "6909223 и 6909183", area: "21 м²", size: "7 × 3 м", turnkey: 42000, image: "img-1302", plans: ["img-1294", "img-1297"] },
  "7541392": { area: "24 м²", size: "8 × 3 м", turnkey: 48000, image: "img-2868", plans: ["photo-2026-09-25-16.08.07"] },
  "7724360": { area: "30 м²", size: "10 × 3 м", turnkey: 53300, image: "img-2871", plans: ["photo-2026-09-25-16.08.32"] },
  "7353288": { area: "31,2 м²", size: "5,2 × 6 м", turnkey: 58600, image: "img-2874", plans: ["photo-2026-09-25-16.08.56"] },
  "6920434": { numbers: "6920434, 6892350 и 7353209", area: "36,4 м²", size: "5,2 × 7 м", turnkey: 67700, image: "img-2879", plans: ["img-0440", "img-0467", "plan-image-3.0-7353209-2026-09-25-00.05"] },
  "7518651": { area: "42 м²", size: "6 × 7 м", turnkey: 77500, image: "img-2882", plans: ["photo-2026-09-25-16.10.06"] },
  "7291485": { area: "48 м²", size: "6 × 8 м", turnkey: 88000, image: null, plans: ["photo-2026-09-25-16.10.31"] },
  "7721941": { area: "70 м²", size: "7 × 10 м", turnkey: 126500, image: null, plans: ["photo-2026-09-25-16.10.50"] },
  "7278116": { area: "63 + 17,5 м²", size: "7 × 9 м", turnkey: 131750, image: null, plans: ["photo-2026-09-25-16.11.15"] }
};

export function applyCatalogUpdates(projects: Project[], lang: "ru" | "en" = "ru"): Project[] {
  const byId = new Map(projects.map((project) => [project.id, project]));
  const make = (id: string, kind: Project["kind"]): Project => {
    const base = byId.get(id) ?? byId.get(kind === "bath" ? "7068511" : "7066580");
    if (!base) throw new Error(`Missing project template for ${id}`);
    const change = changes[id] ?? {};
    const area = change.area ? lang === "en" ? change.area.replace(",", ".").replace("м²", "m²") : change.area : base.area;
    const size = change.size ? lang === "en" ? change.size.replaceAll(",", ".").replace("м", "m") : change.size : base.size;
    const isNew = !byId.has(id);
    const genericTitle = `${kind === "bath" ? (lang === "ru" ? "Модульная баня" : "Modular sauna") : (lang === "ru" ? "Модульный дом" : "Modular house")} ${area}`;
    const numbers = change.numbers ?? id;
    const plan = change.plans?.[0] ? asset(change.plans[0]) : base.plan;
    const image = change.image === null ? undefined : change.image ? asset(change.image) : base.image;
    const gallery = [...new Set([image, ...(change.photos ?? []).map(asset), ...(change.plans ?? []).map(asset), ...(base.plan && !isNew ? [base.plan] : [])].filter((value): value is string => Boolean(value)))];
    const bath = kind === "bath";
    return {
      ...base,
      id,
      kind,
      bedrooms: bath ? 0 : base.bedrooms,
      title: isNew || bath ? genericTitle : base.title.replace(base.area, area),
      projectNo: numbers,
      area,
      size,
      terrace: change.terrace ?? base.terrace,
      priceWarm: bath ? undefined : change.warm !== undefined ? money(change.warm) : base.priceWarm,
      priceTurnkey: change.turnkey !== undefined ? money(change.turnkey) : base.priceTurnkey,
      priceNote: bath ? undefined : base.priceNote,
      image,
      plan,
      gallery,
      singleColumn: bath,
      specs: bath ? bathSpecs : change.terrace && !base.terrace ? [...base.specs, { label: "Терраса", warm: "2 × 10 м", turnkey: "2 × 10 м" }] : base.specs,
      rooms: isNew ? (lang === "ru" ? "Варианты планировки показаны на изображениях" : "Layout options are shown in the gallery") : base.rooms,
      summary: isNew || bath || change.area || change.size ? lang === "ru" ? `${genericTitle} размером ${size}. ${bath ? "Полностью готовая баня с чистовой отделкой." : "Планировку можно обсудить с производителем."}` : `${genericTitle}, ${size}. ${bath ? "A finished sauna with turnkey interior." : "Ask the manufacturer about layout options."}` : base.summary,
      layoutDescription: isNew || bath ? lang === "ru" ? `Посмотрите планировку проекта ${numbers} в галерее. Возможна корректировка под ваш участок и задачи.` : `View the layout of project ${numbers} in the gallery. The layout can be adapted to your needs.` : base.layoutDescription,
      suitableFor: isNew || bath ? lang === "ru" ? "Подробности планировки и комплектации уточните у производителя." : "Ask the manufacturer for layout and package details." : base.suitableFor,
      highlights: isNew || bath ? lang === "ru" ? ["Производство в Бресте", "Доставка и монтаж по Беларуси", "Возможна корректировка планировки"] : ["Made in Brest", "Delivery and installation across Belarus", "Layout can be adapted"] : base.highlights,
      seoTitle: `${genericTitle} — проект ${numbers} | Modul S`,
      seoDescription: `${genericTitle}, размер ${size}, цена под ключ ${change.turnkey !== undefined ? money(change.turnkey) : base.priceTurnkey}. Планировки и комплектация, доставка и монтаж по Беларуси.`
    };
  };
  return [
    ...houseOrder.map((id) => make(id, "house")),
    ...bathOrder.map((id) => make(id, "bath"))
  ];
}
