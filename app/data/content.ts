export type Lang = "en" | "ru";

export type SpecRow = { label: string; warm: string; turnkey: string };

export type Project = {
  id: string;
  kind: "house" | "bath";
  title: string;
  projectNo: string;
  area: string;
  size: string;
  terrace?: string;
  priceWarm?: string;
  priceTurnkey: string;
  priceNote?: string;
  summary: string;
  image?: string;
  plan?: string;
  singleColumn?: boolean;
  specs: SpecRow[];
};

export type Content = {
  meta: {
    htmlLang: string;
    switchLabel: string;
    switchTo: string;
  };
  nav: { label: string; href: string }[];
  brand: {
    name: string;
    location: string;
    tagline: string;
  };
  common: {
    phone: string;
    consultation: string;
    browseProjects: string;
    viewProject: string;
    getCatalog: string;
    requestConsultation: string;
    plan: string;
    render: string;
    noPhoto: string;
    scaledPreview: string;
    googleMapsArea: string;
    telegram: string;
    viber: string;
    priceWarm: string;
    priceTurnkey: string;
    priceFinished: string;
    dimensions: string;
    terrace: string;
    specsTitle: string;
    close: string;
    prev: string;
    next: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  benefits: string[];
  about: {
    eyebrow: string;
    title: string;
    text: string;
    cards: { title: string; text: string }[];
    imageAltKitchen: string;
    imageAltBedroom: string;
  };
  quiz: {
    eyebrow: string;
    title: string;
    text: string;
    steps: { title: string; text: string }[];
  };
  packagesSection: {
    eyebrow: string;
    title: string;
    text: string;
  };
  packages: {
    name: string;
    tagline: string;
    features: string[];
    extrasLabel?: string;
    extras?: string[];
  }[];
  projectsSection: {
    eyebrow: string;
    title: string;
    text: string;
  };
  projects: Project[];
  completed: {
    eyebrow: string;
    title: string;
    text: string;
    quote: string;
    location: string;
    imageAlt: string;
  };
  foundationsSection: {
    eyebrow: string;
    title: string;
    text: string;
  };
  foundations: {
    title: string;
    use: string;
    description: string;
    advantages: string[];
  }[];
  trust: {
    eyebrow: string;
    title: string;
    text: string;
    cards: string[];
  };
  catalog: {
    eyebrow: string;
    title: string;
    text: string;
    cardText: string;
    perks: string[];
  };
  consultation: {
    eyebrow: string;
    title: string;
    text: string;
  };
  forms: {
    requestType: string;
    requestCatalog: string;
    requestConsultation: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    telegram: string;
    telegramPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    contacts: string;
    address: string;
  };
};

/* ---------------------------------------------------------------------------
 * Project catalog — generated from the June 2026 catalog.
 * Each entry is one house/bath. Real render + plan images will be added later;
 * for now the cards show "no photo" placeholders (image/plan left undefined).
 * ------------------------------------------------------------------------ */

type Terrace = { w: number; l: number; m2: number; roofed: boolean; fence?: boolean };

type Seed = {
  no: string;
  kind: "house" | "bath";
  area: number;
  dims: [number, number, number];
  heightLow?: number;
  terrace?: Terrace;
  warm?: number;
  turnkey: number;
  noTerrace?: number;
};

const seeds: Seed[] = [
  { no: "6920353", kind: "house", area: 22, dims: [5000, 6000, 2700], terrace: { w: 3350, l: 2500, m2: 8, roofed: true, fence: true }, warm: 37700, turnkey: 46500 },
  { no: "6970893", kind: "house", area: 24, dims: [3000, 8000, 2700], warm: 32400, turnkey: 42000 },
  { no: "6971406", kind: "house", area: 25, dims: [5000, 6000, 2700], terrace: { w: 2100, l: 2350, m2: 5, roofed: true }, warm: 38770, turnkey: 48800 },
  { no: "7004381", kind: "house", area: 28, dims: [5200, 7000, 2700], terrace: { w: 2500, l: 3500, m2: 8.75, roofed: false }, warm: 40390, turnkey: 51450 },
  { no: "6920434", kind: "house", area: 36, dims: [5200, 7000, 2700], warm: 53600, turnkey: 66700 },
  { no: "6892350", kind: "house", area: 36, dims: [5200, 7000, 2700], warm: 53600, turnkey: 66700 },
  { no: "6972660", kind: "house", area: 39, dims: [6000, 6500, 2700], terrace: { w: 3000, l: 6000, m2: 18, roofed: true, fence: true }, warm: 70650, turnkey: 86250 },
  { no: "6971491", kind: "house", area: 39, dims: [6000, 6500, 2700], terrace: { w: 2000, l: 6000, m2: 12, roofed: true }, warm: 64650, turnkey: 80250 },
  { no: "6972735", kind: "house", area: 39, dims: [5200, 7000, 2700], terrace: { w: 2000, l: 6450, m2: 13, roofed: true, fence: true }, warm: 65650, turnkey: 81250 },
  { no: "7066580", kind: "house", area: 47, dims: [6000, 7800, 2800], warm: 63180, turnkey: 81900 },
  { no: "6966147", kind: "house", area: 60, dims: [8000, 9000, 2800], terrace: { w: 6000, l: 2000, m2: 12, roofed: true }, warm: 93000, turnkey: 117000 },
  { no: "7055054", kind: "house", area: 60, dims: [6000, 10000, 2800], warm: 81000, turnkey: 105000 },
  { no: "7068240", kind: "house", area: 63, dims: [7000, 9000, 2800], warm: 85050, turnkey: 110250 },
  { no: "6964526", kind: "house", area: 63, dims: [7000, 9000, 2800], warm: 85050, turnkey: 110250 },
  { no: "6985270", kind: "house", area: 63, dims: [9000, 7000, 2800], terrace: { w: 7000, l: 2000, m2: 14, roofed: true }, warm: 99050, turnkey: 124500 },
  { no: "7042179", kind: "house", area: 72, dims: [8000, 9000, 2800], warm: 97200, turnkey: 126000 },
  { no: "6915271", kind: "house", area: 72, dims: [6000, 12000, 2800], warm: 97200, turnkey: 126000 },
  { no: "6964606", kind: "house", area: 84, dims: [12000, 7000, 2800], warm: 113400, turnkey: 147000 },
  { no: "7068511", kind: "bath", area: 15.6, dims: [2600, 6000, 2600], heightLow: 2300, terrace: { w: 0, l: 0, m2: 0, roofed: true }, turnkey: 42500, noTerrace: 30500 },
  { no: "6909223", kind: "bath", area: 21, dims: [3000, 7000, 2600], heightLow: 2300, terrace: { w: 0, l: 0, m2: 0, roofed: true }, turnkey: 49000, noTerrace: 42000 },
  { no: "6909183", kind: "bath", area: 21, dims: [3000, 7000, 2600], heightLow: 2300, terrace: { w: 0, l: 0, m2: 0, roofed: true }, turnkey: 49000, noTerrace: 42000 }
];

const decimal = (n: number, lang: Lang) => {
  const s = Number.isInteger(n) ? String(n) : String(n);
  return lang === "ru" ? s.replace(".", ",") : s;
};

const meters = (mm: number, lang: Lang) => decimal(Math.round(mm / 10) / 100, lang);

const group = (n: number, sep: string) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
const price = (n: number, lang: Lang) => `${group(n, lang === "ru" ? " " : ",")} BYN`;

const areaStr = (a: number, lang: Lang) => `${decimal(a, lang)} ${lang === "ru" ? "м²" : "m²"}`;

const sizeStr = (s: Seed, lang: Lang) => {
  const [w, l, h] = s.dims;
  const u = lang === "ru" ? "м" : "m";
  const height =
    s.heightLow !== undefined
      ? `${meters(s.heightLow, lang)}–${meters(h, lang)}`
      : meters(h, lang);
  const hLabel = lang === "ru" ? "высота" : "height";
  return `${meters(w, lang)} × ${meters(l, lang)} ${u}, ${hLabel} ${height} ${u}`;
};

const terraceStr = (t: Terrace, lang: Lang) => {
  if (!t.m2) {
    return lang === "ru" ? "Терраса с кровлей" : "Roofed terrace";
  }
  const u = lang === "ru" ? "м" : "m";
  const head = lang === "ru" ? (t.roofed ? "Терраса с кровлей" : "Терраса без кровли") : t.roofed ? "Roofed terrace" : "Open terrace";
  return `${head} ${meters(t.w, lang)} × ${meters(t.l, lang)} ${u} — ${decimal(t.m2, lang)} ${lang === "ru" ? "м²" : "m²"}`;
};

const terraceFinish = (t: Terrace, lang: Lang) => {
  const base = lang === "ru" ? "Доска палубная, антисептированная" : "Anti-septic deck boards";
  if (t.fence) {
    return base + (lang === "ru" ? ". Ограждение по периметру" : ". Perimeter railing");
  }
  return base;
};

const same = (label: string, value: string): SpecRow => ({ label, warm: value, turnkey: value });

const houseSpecs = (lang: Lang, t?: Terrace): SpecRow[] => {
  const r = lang === "ru";
  const rows: SpecRow[] = [
    same(r ? "Силовой каркас" : "Structural frame", r ? "Стены, лаги пола и стропила — сухая доска 45×145" : "Walls, floor joists and rafters — dry timber 45×145"),
    same(r ? "Отделка кровли" : "Roof finish", r ? "Металлопрофиль (цвет на выбор)" : "Metal profile (color of choice)"),
    same(r ? "Утепление" : "Insulation", r ? "Пол, кровля и стены — минеральная вата 150 мм" : "Floor, roof and walls — 150 mm mineral wool"),
    same(r ? "Мембраны" : "Membranes", r ? "Ветро-влагозащитная мембрана снаружи и пароизоляция внутри (вент. зазор 25 мм)" : "Wind/moisture membrane outside and vapor barrier inside (25 mm vent gap)"),
    same(r ? "Наружная отделка" : "Exterior finish", r ? "Имитация бруса, сорт АВ, окрашенная (цвет на выбор)" : "Painted timber-look cladding, grade AB (color of choice)"),
    {
      label: r ? "Внутренняя отделка" : "Interior finish",
      warm: r ? "—" : "—",
      turnkey: r ? "Имитация бруса, сорт АВ, окрашенная (цвет на выбор)" : "Painted timber-look cladding, grade AB (color of choice)"
    },
    {
      label: r ? "Пол" : "Floor",
      warm: r ? "Обрешётка под влагостойкие плиты ДСП" : "Battens for moisture-resistant chipboard",
      turnkey: r ? "Ламинат 33 класс (цвет на выбор)" : "Class 33 laminate (color of choice)"
    },
    {
      label: r ? "Двери" : "Doors",
      warm: r ? "Входная пластиковая дверь" : "Plastic entrance door",
      turnkey: r ? "Входная пластиковая + межкомнатные двери МДФ" : "Plastic entrance + MDF interior doors"
    },
    same(r ? "Окна" : "Windows", r ? "ПВХ в ламинации, двухкамерные стеклопакеты (цвет на выбор)" : "Laminated PVC, double-glazed (color of choice)"),
    {
      label: r ? "Коммуникации" : "Utilities",
      warm: r ? "Проход в полу для ввода и вывода коммуникаций" : "Floor pass-through for utility inlet/outlet",
      turnkey: r
        ? "Электропроводка (скрытый/открытый монтаж), розетки, выключатели, светильники, щит; 5 водо-точек; водонагреватель 50 л, душевая кабина со смесителем"
        : "Wiring (concealed/surface), sockets, switches, lights, panel; 5 water points; 50 L water heater, shower cabin with mixer"
    }
  ];
  if (t) {
    rows.push(same(r ? "Терраса" : "Terrace", terraceFinish(t, lang)));
  }
  return rows;
};

const bathSpecs = (lang: Lang): SpecRow[] => {
  const r = lang === "ru";
  const val = (v: string): SpecRow => ({ label: "", warm: "", turnkey: v });
  return [
    { label: r ? "Силовой каркас" : "Structural frame", warm: "", turnkey: r ? "Стены, лаги пола и стропила — сухая доска 45×145" : "Walls, floor joists and rafters — dry timber 45×145" },
    { label: r ? "Отделка кровли" : "Roof finish", warm: "", turnkey: r ? "Металлопрофиль (цвет на выбор)" : "Metal profile (color of choice)" },
    { label: r ? "Утепление" : "Insulation", warm: "", turnkey: r ? "Пол, кровля и стены — минеральная вата 150 мм" : "Floor, roof and walls — 150 mm mineral wool" },
    { label: r ? "Мембраны" : "Membranes", warm: "", turnkey: r ? "Ветро-влагозащитная мембрана снаружи и пароизоляция внутри (зазор 25 мм)" : "Wind/moisture membrane outside and vapor barrier inside (25 mm gap)" },
    { label: r ? "Наружная отделка" : "Exterior finish", warm: "", turnkey: r ? "Имитация бруса, сорт АВ, окрашенная (цвет на выбор)" : "Painted timber-look cladding, grade AB" },
    { label: r ? "Внутренняя отделка" : "Interior finish", warm: "", turnkey: r ? "Имитация бруса, сорт АВ, окрашенная (цвет на выбор)" : "Painted timber-look cladding, grade AB" },
    { label: r ? "Пол" : "Floor", warm: "", turnkey: r ? "Ламинат 33 класс (цвет на выбор), плитка" : "Class 33 laminate (color of choice), tiles" },
    { label: r ? "Двери" : "Doors", warm: "", turnkey: r ? "Входная пластиковая, межкомнатные МДФ, стеклянная дверь в парную" : "Plastic entrance, MDF interior doors, glass steam-room door" },
    { label: r ? "Окна" : "Windows", warm: "", turnkey: r ? "ПВХ в ламинации, двухкамерные стеклопакеты (цвет на выбор)" : "Laminated PVC, double-glazed (color of choice)" },
    { label: r ? "Парная" : "Steam room", warm: "", turnkey: r ? "Внутренняя отделка вагонкой из ольхи, полки из ольхи, дровяная печь с выносом топки" : "Alder lining, alder benches, wood-fired stove with remote firebox" },
    val("")
  ].filter((row) => row.turnkey !== "");
};

const summaryFor = (s: Seed, lang: Lang): string => {
  const r = lang === "ru";
  const ruSummaries: Record<string, string> = {
    "6920353": "Уютный домик для комфортной жизни на природе.",
    "6970893": "Компактный и функциональный дом для дачи или постоянного проживания.",
    "6971406": "Идеальное решение для небольшой семьи с продуманной планировкой.",
    "7004381": "Минималистичный дом — идеальное пространство для жизни.",
    "6920434": "Небольшой дачный дом с парной.",
    "6892350": "Небольшой дачный дом с парной.",
    "6972660": "Современный дом с продуманной планировкой и стильным дизайном.",
    "6971491": "Удобное пространство для создания уютного семейного гнездышка.",
    "6972735": "Энергоэффективный дом, который обеспечит комфорт круглый год.",
    "7066580": "Прекрасное сочетание стиля и функциональности в доме.",
    "6966147": "Просторный дом для комфортной жизни всей семьи.",
    "7055054": "Дом с возможностью индивидуальной настройки под ваши нужды.",
    "7068240": "Просторные комнаты и светлые интерьеры для активной жизни.",
    "6964526": "Идеальное решение для большой семьи с несколькими спальнями.",
    "6985270": "Уютное пространство для создания теплой атмосферы в вашем доме.",
    "7042179": "Просторный и функциональный дом для активного отдыха.",
    "6915271": "Идеальное место для семейных встреч с большой гостиной.",
    "6964606": "Стильный и современный дом, который вдохновляет на новые идеи."
  };
  const enSummaries: Record<string, string> = {
    "6920353": "A cozy house for comfortable living close to nature.",
    "6970893": "A compact, functional house for a country plot or year-round living.",
    "6971406": "A smart solution for a small family with a well-planned layout.",
    "7004381": "A minimalist house with flexible space for everyday life.",
    "6920434": "A small country house with a steam room.",
    "6892350": "A small country house with a steam room.",
    "6972660": "A modern home with a thoughtful layout and clean design.",
    "6971491": "A comfortable space for creating a warm family home.",
    "6972735": "An energy-efficient house designed for comfort in every season.",
    "7066580": "A balanced mix of style and practical planning.",
    "6966147": "A spacious house for comfortable living with the whole family.",
    "7055054": "A home that can be adjusted to your needs and lifestyle.",
    "7068240": "Bright rooms and generous interiors for active family life.",
    "6964526": "A strong choice for a larger family with several bedrooms.",
    "6985270": "A warm, inviting home for creating a calm everyday atmosphere.",
    "7042179": "A spacious and functional house for active rest and family time.",
    "6915271": "An ideal place for family gatherings with a large living area.",
    "6964606": "A stylish modern home that leaves room for your own ideas."
  };
  const custom = r ? ruSummaries[s.no] : enSummaries[s.no];
  if (custom) {
    return custom;
  }
  if (s.kind === "bath") {
    return r ? "Баня под ключ с парной из ольхи и дровяной печью." : "A turnkey bath with an alder steam room and a wood-fired stove.";
  }
  if (s.area <= 28) {
    return r ? "Компактный дом для круглогодичного проживания с продуманной планировкой." : "A compact year-round house with a smart, efficient layout.";
  }
  if (s.area <= 47) {
    return r ? "Просторный дом для комфортной жизни всей семьёй." : "A spacious house for comfortable family living.";
  }
  return r ? "Большой дом для постоянного проживания с несколькими спальнями." : "A large house for permanent living with several bedrooms.";
};

const buildProjects = (lang: Lang): Project[] =>
  seeds.map((s) => {
    const r = lang === "ru";
    const kindWord = s.kind === "bath" ? (r ? "Баня" : "Bath") : r ? "Дом" : "House";
    const isBath = s.kind === "bath";
    return {
      id: s.no,
      kind: s.kind,
      title: `${kindWord} ${areaStr(s.area, lang)}`,
      projectNo: r ? `Проект №${s.no}` : `Project No. ${s.no}`,
      area: areaStr(s.area, lang),
      size: sizeStr(s, lang),
      terrace: s.terrace ? terraceStr(s.terrace, lang) : undefined,
      priceWarm: isBath ? undefined : s.warm !== undefined ? price(s.warm, lang) : undefined,
      priceTurnkey: price(s.turnkey, lang),
      priceNote:
        isBath && s.noTerrace !== undefined
          ? r
            ? `${price(s.noTerrace, lang)} без террасы`
            : `${price(s.noTerrace, lang)} without terrace`
          : undefined,
      summary: summaryFor(s, lang),
      image: `/projects/${s.no}-render.jpg`,
      plan: `/projects/${s.no}-plan.jpg`,
      singleColumn: isBath,
      specs: isBath ? bathSpecs(lang) : houseSpecs(lang, s.terrace)
    };
  });

export const content: Record<Lang, Content> = {
  en: {
    meta: {
      htmlLang: "en",
      switchLabel: "Switch language",
      switchTo: "RU"
    },
    nav: [
      { label: "Home", href: "#home" },
      { label: "Packages", href: "#packages" },
      { label: "Catalog", href: "#projects" },
      { label: "Contacts", href: "#contacts" }
    ],
    brand: {
      name: "Modul S",
      location: "Brest, Belarus",
      tagline: "Modern modular timber-frame houses and baths turnkey from Brest, Belarus."
    },
    common: {
      phone: "+375 44 570 27 27",
      consultation: "Get a Consultation",
      browseProjects: "Browse Projects",
      viewProject: "View Project",
      getCatalog: "Catalog",
      requestConsultation: "Request Consultation",
      plan: "Plan",
      render: "Render",
      noPhoto: "Photo coming soon",
      scaledPreview: "Scaled preview",
      googleMapsArea: "Open in Yandex Maps",
      telegram: "Telegram",
      viber: "Viber",
      priceWarm: "Warm shell",
      priceTurnkey: "Turnkey",
      priceFinished: "Finished",
      dimensions: "Dimensions",
      terrace: "Terrace",
      specsTitle: "Configuration & specifications",
      close: "Close",
      prev: "Previous",
      next: "Next"
    },
    hero: {
      eyebrow: "",
      title: "Modular Timber-Frame Houses & Baths",
      lead: "Design, manufacturing, delivery, and installation of high-quality modular houses and baths across Belarus."
    },
    benefits: ["Own Manufacturing Facility", "Delivery Across Belarus", "Turnkey Construction", "Custom House Designs"],
    about: {
      eyebrow: "About company",
      title: "",
      text: "We create modular homes and baths where comfort, aesthetics, and harmony with nature come together. Every project starts with a consultation and moves through manufacturing, delivery, installation, and handover of the finished house kit.",
      cards: [
        { title: "Quality control", text: "Each module is checked before delivery and during installation." },
        { title: "Experienced specialists", text: "A focused team supervises design, production, and site work." },
        { title: "Customer support", text: "Clear answers from first call to post-construction support." },
        { title: "Project supervision", text: "One process owner keeps deadlines and details visible." }
      ],
      imageAltKitchen: "Kitchen in modular house",
      imageAltBedroom: "Bedroom with timber walls"
    },
    quiz: {
      eyebrow: "House selection quiz",
      title: "Find the perfect house for your needs",
      text: "A short guided request helps match size, budget, foundation type, and deadline before the specialist calls back.",
      steps: [
        { title: "Choose house size", text: "Select compact, family, or custom layouts." },
        { title: "Share plot details", text: "Clarify access, utilities, and foundation needs." },
        { title: "Get recommendation", text: "Receive suitable projects and a consultation." }
      ]
    },
    packagesSection: {
      eyebrow: "Package types",
      title: "Choose your package",
      text: "Every project is available in two configurations — an insulated warm shell, or a fully finished turnkey house."
    },
    packages: [
      {
        name: "Warm Shell",
        tagline: "A fully insulated, weatherproof structure ready for your own interior finishing.",
        features: [
          "Structural frame — dry timber 45×145",
          "Roof — metal profile (color of choice)",
          "Insulation 150 mm: floor, roof, walls (mineral wool)",
          "Wind/moisture and vapor membranes with ventilation gaps",
          "Exterior — painted timber-look cladding, grade AB",
          "Floor — battens ready for moisture-resistant boards",
          "PVC laminated windows, double-glazed; plastic entrance door",
          "Floor pass-through for utility connections"
        ]
      },
      {
        name: "Turnkey",
        tagline: "A fully finished house — move in and live, nothing left to do.",
        features: [
          "Structural frame — dry timber 45×145",
          "Roof — metal profile (color of choice)",
          "Insulation 150 mm: floor, roof, walls (mineral wool)",
          "Wind/moisture and vapor membranes with ventilation gaps",
          "Exterior — painted timber-look cladding, grade AB",
          "PVC laminated windows, double-glazed; plastic entrance door"
        ],
        extrasLabel: "Added on top of the Warm Shell",
        extras: [
          "Interior finish — painted timber-look cladding, grade AB",
          "Finish floor — class 33 laminate (color of choice)",
          "MDF interior doors",
          "Electrical: concealed/surface wiring, sockets, switches, light fixtures, electrical panel",
          "5 water points: sink, shower, kitchen sink, toilet, water heater",
          "50 L water heater and a shower cabin with mixer"
        ]
      }
    ],
    projectsSection: {
      eyebrow: "Projects catalog",
      title: "Modular houses and baths",
      text: "Swipe through the lineup — from compact 22 m² houses to spacious 84 m² family homes and turnkey baths. Open any project to see the full layout. Layout changes are possible for every project, and we also build custom designs."
    },
    projects: buildProjects("en"),
    completed: {
      eyebrow: "Completed houses",
      title: "Built modular projects",
      text: "A selection of completed houses, baths, and modular commercial spaces. Each project has its own photos and details.",
      quote: "Honestly, we didn't believe it could be this fast! We ordered in spring and by summer we were already having coffee on our own terrace. The house is warm, cozy, and smells of real wood — we couldn't be happier.",
      location: "",
      imageAlt: "Completed modular house photo"
    },
    foundationsSection: {
      eyebrow: "Foundation types",
      title: "A foundation matched to your plot",
      text: "The right foundation depends on soil, access, house size, utilities, and the desired level of permanence."
    },
    foundations: [
      {
        title: "Screw Piles",
        use: "Fast installation for compact modular homes and seasonal plots.",
        description: "A practical low-impact foundation for stable soils and sites where speed matters.",
        advantages: ["Quick start", "Minimal excavation", "Works well with timber decks"]
      },
      {
        title: "Driven Piles",
        use: "Recommended for heavier modules or complex soil conditions.",
        description: "Factory-controlled piles transfer loads deeper into the ground for dependable support.",
        advantages: ["Strong bearing capacity", "Reliable geometry", "Good for wet areas"]
      },
      {
        title: "Strip Foundation",
        use: "For traditional plots, larger houses, and projects with specific structural loads.",
        description: "A proven foundation format with strong perimeter support for long-term family homes.",
        advantages: ["Durable structure", "Flexible design", "Familiar service access"]
      }
    ],
    trust: {
      eyebrow: "Why choose us",
      title: "A calm process, fixed expectations, and accountable delivery",
      text: "",
      cards: ["Official Contract", "Transparent Pricing", "Fixed Deadlines", "Warranty", "Quality Control", "Quality Materials", "Photo and Video at Every Stage", "Post-Construction Support"]
    },
    catalog: {
      eyebrow: "House plans catalog",
      title: "Download our house plans catalog",
      text: "Get a PDF catalog with popular projects, house prices, and layout options — instant download, no sign-up required.",
      cardText: "All current projects, prices, and layouts in a single PDF file.",
      perks: ["Eco materials", "Fast construction", "Modern design"]
    },
    consultation: {
      eyebrow: "Consultation",
      title: "Still have questions?",
      text: "Get a free consultation from a specialist. We can discuss the plot, budget, preferred size, foundation type, and delivery timeline."
    },
    forms: {
      requestType: "Request type",
      requestCatalog: "House plans catalog",
      requestConsultation: "Free consultation",
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone Number",
      phonePlaceholder: "+375 __ ___ __ __",
      telegram: "Telegram Username",
      telegramPlaceholder: "@username",
      email: "Email",
      emailPlaceholder: "name@example.com",
      message: "Message",
      messagePlaceholder: "Tell us about your plot, desired house size, budget, or timeline.",
      sending: "Sending...",
      success: "Thank you. We will contact you soon.",
      error: "Something went wrong. Please call or message us directly."
    },
    footer: {
      contacts: "Contacts",
      address: "Address"
    }
  },
  ru: {
    meta: {
      htmlLang: "ru",
      switchLabel: "Переключить язык",
      switchTo: "EN"
    },
    nav: [
      { label: "Главная", href: "#home" },
      { label: "Комплектации", href: "#packages" },
      { label: "Каталог", href: "#projects" },
      { label: "Контакты", href: "#contacts" }
    ],
    brand: {
      name: "Modul S",
      location: "Брест, Беларусь",
      tagline: "Современные модульные каркасные дома и бани под ключ из Бреста, Беларусь."
    },
    common: {
      phone: "+375 44 570 27 27",
      consultation: "Получить консультацию",
      browseProjects: "Смотреть проекты",
      viewProject: "Смотреть проект",
      getCatalog: "Каталог",
      requestConsultation: "Оставить заявку",
      plan: "Планировка",
      render: "Визуализация",
      noPhoto: "Фото скоро",
      scaledPreview: "Схема проекта",
      googleMapsArea: "Открыть в Яндекс Картах",
      telegram: "Telegram",
      viber: "Viber",
      priceWarm: "Тёплый контур",
      priceTurnkey: "Под ключ",
      priceFinished: "Чистовая отделка",
      dimensions: "Габариты",
      terrace: "Терраса",
      specsTitle: "Комплектация и характеристики",
      close: "Закрыть",
      prev: "Назад",
      next: "Вперёд"
    },
    hero: {
      eyebrow: "",
      title: "Модульные каркасные дома и бани",
      lead: "Проектирование, производство, доставка и монтаж качественных модульных домов и бань по всей Беларуси."
    },
    benefits: ["Собственное производство", "Доставка по Беларуси", "Строительство под ключ", "Индивидуальные проекты домов"],
    about: {
      eyebrow: "О компании",
      title: "",
      text: "Мы создаем модульные дома и бани, в которых сочетаются комфорт, эстетика и гармония с природой. Каждый проект начинается с консультации и проходит через производство, доставку, монтаж и передачу готового домокомплекта.",
      cards: [
        { title: "Контроль качества", text: "Каждый модуль проверяется перед доставкой и на этапе монтажа." },
        { title: "Опытные специалисты", text: "Команда сопровождает проектирование, производство и работы на участке." },
        { title: "Поддержка клиента", text: "Понятные ответы с первого звонка до поддержки после строительства." },
        { title: "Сопровождение проекта", text: "Ответственный специалист держит сроки и детали под контролем." }
      ],
      imageAltKitchen: "Кухня в модульном доме",
      imageAltBedroom: "Спальня с деревянной отделкой"
    },
    quiz: {
      eyebrow: "Подбор дома",
      title: "Подберите дом под ваши задачи",
      text: "Короткая заявка помогает определить площадь, бюджет, тип фундамента и сроки до звонка специалиста.",
      steps: [
        { title: "Выберите размер дома", text: "Компактный, семейный или индивидуальный вариант планировки." },
        { title: "Расскажите об участке", text: "Уточним подъезд, коммуникации и требования к фундаменту." },
        { title: "Получите рекомендации", text: "Подберем подходящие проекты и проведем консультацию." }
      ]
    },
    packagesSection: {
      eyebrow: "Виды комплектаций",
      title: "Выберите комплектацию",
      text: "Каждый проект доступен в двух комплектациях — каркас с утеплением «тёплый контур» или полностью готовый дом с отделкой «под ключ»."
    },
    packages: [
      {
        name: "Тёплый контур",
        tagline: "Утеплённая, защищённая от непогоды коробка, готовая под вашу внутреннюю отделку.",
        features: [
          "Силовой каркас — доска сухая 45×145",
          "Кровля — металлопрофиль (цвет на выбор)",
          "Утепление 150 мм: пол, кровля, стены (минеральная вата)",
          "Ветро-влагозащитная и пароизоляционная мембраны с вент. зазорами",
          "Наружная отделка — имитация бруса, окрашенная, сорт АВ",
          "Пол — обрешётка под влагостойкие плиты ДСП",
          "Окна ПВХ с двухкамерными стеклопакетами, входная пластиковая дверь",
          "Проход в полу для подключения коммуникаций"
        ]
      },
      {
        name: "Под ключ",
        tagline: "Полностью готовый дом с чистовой отделкой — заезжай и живи.",
        features: [
          "Силовой каркас — доска сухая 45×145",
          "Кровля — металлопрофиль (цвет на выбор)",
          "Утепление 150 мм: пол, кровля, стены (минеральная вата)",
          "Ветро-влагозащитная и пароизоляционная мембраны с вент. зазорами",
          "Наружная отделка — имитация бруса, окрашенная, сорт АВ",
          "Окна ПВХ с двухкамерными стеклопакетами, входная пластиковая дверь"
        ],
        extrasLabel: "Дополнительно к «Тёплому контуру»",
        extras: [
          "Внутренняя отделка — имитация бруса, окрашенная, сорт АВ",
          "Чистовой пол — ламинат 33 класс (цвет на выбор)",
          "Межкомнатные двери МДФ",
          "Электрика: скрытый/открытый монтаж, розетки, выключатели, светильники, электр. щит",
          "5 водо-точек: раковина, душ, кухонная мойка, унитаз, водонагреватель",
          "Водонагреватель на 50 л и душевая кабина со смесителем"
        ]
      }
    ],
    projectsSection: {
      eyebrow: "Каталог проектов",
      title: "Модульные дома и бани",
      text: "Листайте каталог — от компактных домов 22 м² до просторных семейных домов 84 м² и бань под ключ. Откройте любой проект, чтобы увидеть полную планировку. В каждом проекте возможна перепланировка. Строим по индивидуальным проектам."
    },
    projects: buildProjects("ru"),
    completed: {
      eyebrow: "Построенные дома",
      title: "Реализованные модульные проекты",
      text: "Подборка построенных домов, бань и коммерческих модулей. У каждого объекта — свои фотографии и детали.",
      quote: "Честно, не верили, что можно так быстро! Заказали дом весной — а к лету уже пили кофе на своей террасе. Дом тёплый, уютный, пахнет настоящим деревом. Мы в полном восторге!",
      location: "",
      imageAlt: "Фото готового модульного дома"
    },
    foundationsSection: {
      eyebrow: "Типы фундамента",
      title: "Фундамент под особенности вашего участка",
      text: "Правильный фундамент зависит от грунта, подъезда, размера дома, коммуникаций и требований к постоянному проживанию."
    },
    foundations: [
      {
        title: "Винтовые сваи",
        use: "Быстрый монтаж для компактных модульных домов и дачных участков.",
        description: "Практичный фундамент с минимальным воздействием на участок, когда важны скорость и аккуратность работ.",
        advantages: ["Быстрый старт", "Минимум земляных работ", "Хорошо сочетается с террасами"]
      },
      {
        title: "Забивные сваи",
        use: "Рекомендуются для более тяжелых модулей или сложных грунтов.",
        description: "Сваи передают нагрузку глубже в грунт и обеспечивают надежную опору для дома.",
        advantages: ["Высокая несущая способность", "Точная геометрия", "Подходят для влажных участков"]
      },
      {
        title: "Ленточный фундамент",
        use: "Для традиционных участков, больших домов и особых конструктивных нагрузок.",
        description: "Проверенный формат фундамента с надежной поддержкой по периметру дома.",
        advantages: ["Долговечная конструкция", "Гибкость проекта", "Удобный доступ к коммуникациям"]
      }
    ],
    trust: {
      eyebrow: "Почему выбирают нас",
      title: "Спокойный процесс, понятные условия и ответственная сдача",
      text: "",
      cards: ["Официальный договор", "Прозрачная цена", "Фиксированные сроки", "Гарантия", "Контроль качества", "Качественные материалы", "Фото и видео на каждом этапе", "Поддержка после строительства"]
    },
    catalog: {
      eyebrow: "Каталог планировок",
      title: "Скачайте каталог проектов домов",
      text: "Каталог с популярными проектами, ценами на дома и вариантами планировок в PDF — мгновенное скачивание, без заявок.",
      cardText: "Все актуальные проекты, цены и планировки в одном PDF-файле.",
      perks: ["Экологичные материалы", "Быстрое строительство", "Современный дизайн"]
    },
    consultation: {
      eyebrow: "Консультация",
      title: "Остались вопросы?",
      text: "Получите бесплатную консультацию специалиста. Обсудим участок, бюджет, нужную площадь, тип фундамента и сроки доставки."
    },
    forms: {
      requestType: "Тип заявки",
      requestCatalog: "Каталог проектов домов",
      requestConsultation: "Бесплатная консультация",
      name: "Имя",
      namePlaceholder: "Ваше имя",
      phone: "Телефон",
      phonePlaceholder: "+375 __ ___ __ __",
      telegram: "Telegram",
      telegramPlaceholder: "@username",
      email: "Email",
      emailPlaceholder: "name@example.com",
      message: "Сообщение",
      messagePlaceholder: "Расскажите об участке, желаемой площади дома, бюджете или сроках.",
      sending: "Отправляем...",
      success: "Спасибо. Мы скоро свяжемся с вами.",
      error: "Что-то пошло не так. Пожалуйста, позвоните или напишите нам напрямую."
    },
    footer: {
      contacts: "Контакты",
      address: "Адрес"
    }
  }
};
