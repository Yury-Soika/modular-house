import { applyCatalogUpdates } from "./catalog-updates";

export type Lang = "en" | "ru";

export type SpecRow = { label: string; warm: string; turnkey: string };

export type Project = {
  id: string;
  kind: "house" | "bath";
  title: string;
  seoTitle: string;
  seoDescription: string;
  feature: string;
  rooms: string;
  layoutDescription: string;
  suitableFor: string;
  highlights: string[];
  bedrooms: number;
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
  gallery?: string[];
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
  seoIntro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    items: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    text: string;
    cards: { title: string; text: string }[];
    imageAltKitchen: string;
    imageAltBedroom: string;
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
  optionsSection: {
    eyebrow: string;
    title: string;
    text: string;
  };
  options: string[];
  faq: {
    eyebrow: string;
    title: string;
    text: string;
    items: { question: string; answer: string }[];
  };
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
  footer: {
    contacts: string;
    address: string;
    legalTitle: string;
    legalText: string;
    madeWith: string;
    madeWithBy: string;
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

type ProjectProfile = {
  feature: string;
  featureEn: string;
  rooms: string;
  bedrooms: number;
  summary: string;
  layoutDescription: string;
  suitableFor: string;
  highlights: string[];
};

/*
 * The distinctions below come from the published floor plans, not from an SEO
 * synonym generator. Keeping them next to the catalog seeds makes it harder to
 * accidentally publish two projects with the same search intent again.
 */
const projectProfiles: Record<string, ProjectProfile> = {
  "6920353": {
    feature: "студия с крытой террасой 8 м²",
    featureEn: "studio layout with an 8 m² roofed terrace",
    rooms: "студия с кухней, санузел",
    bedrooms: 0,
    summary: "Дом-студия с отдельным санузлом и крытой террасой почти на треть внутренней площади.",
    layoutDescription: "Внутри нет лишних коридоров: кухня, обеденное место и спальная зона собраны в одном помещении. Санузел изолирован, а вход вынесен на крытую террасу 8 м² с ограждением.",
    suitableFor: "Подойдёт как дачный или гостевой дом для одного-двух человек, когда важны компактный корпус и полноценное защищённое место для отдыха на улице.",
    highlights: ["Единое жилое пространство без коридора", "Изолированный санузел", "Крытая терраса 8 м² с ограждением"]
  },
  "6970893": {
    feature: "отдельная спальня в корпусе 3 × 8 м",
    featureEn: "separate bedroom in a 3 × 8 m footprint",
    rooms: "1 спальня, кухня-гостиная, санузел",
    bedrooms: 1,
    summary: "Узкий модульный дом с отдельной спальней, кухней-гостиной и полноценным санузлом.",
    layoutDescription: "Линейная планировка делит вытянутый модуль на три понятные зоны. Кухня-гостиная расположена с одного торца, спальня — с другого, а санузел и входная группа образуют буфер между ними.",
    suitableFor: "Формат удобен для узкого участка, гостевого размещения или дачи для пары: приватная спальня не смешивается с дневной зоной.",
    highlights: ["Отдельная спальня", "Пропорции для узкого участка", "Санузел между жилыми зонами"]
  },
  "6971406": {
    feature: "спальня, гардеробная и крытая терраса",
    featureEn: "bedroom, wardrobe and roofed terrace",
    rooms: "1 спальня, кухня-гостиная, гардеробная, санузел",
    bedrooms: 1,
    summary: "Компактный дом с отдельной спальней, собственной гардеробной и крытой входной террасой.",
    layoutDescription: "Планировка отделяет спальню от кухни-гостиной небольшим холлом. Рядом предусмотрена самостоятельная гардеробная, санузел собран в отдельном блоке, а вход проходит через крытую террасу площадью 5 м².",
    suitableFor: "Проект рассчитан на одного человека или пару, которым в небольшом доме нужны закрытое хранение и отдельная, а не студийная спальня.",
    highlights: ["Отдельная гардеробная", "Изолированная спальня", "Крытая терраса 5 м²"]
  },
  "7004381": {
    feature: "спальня и открытая терраса 8,75 м²",
    featureEn: "bedroom and 8.75 m² open terrace",
    rooms: "1 спальня, кухня-гостиная, санузел",
    bedrooms: 1,
    summary: "Дачный дом с отдельной спальней и большой открытой террасой вдоль фасада.",
    layoutDescription: "Кухня-гостиная занимает основную часть дома и выходит прямо на открытую террасу 8,75 м². Спальня и санузел изолированы; вход организован через общую дневную зону без длинного коридора.",
    suitableFor: "Хороший вариант для сезонного отдыха пары или небольшой семьи, если терраса должна работать как дополнительная летняя гостиная.",
    highlights: ["Открытая терраса 8,75 м²", "Отдельная спальня", "Прямой выход из кухни-гостиной"]
  },
  "6920434": {
    feature: "дом с отдельной парной",
    featureEn: "house with a private steam room",
    rooms: "1 спальня, кухня-гостиная, санузел, парная",
    bedrooms: 1,
    summary: "Дом-баня с отдельной спальней, светлой кухней-гостиной, санузлом и собственной парной.",
    layoutDescription: "Парная выделена в самостоятельное помещение рядом с санузлом. В противоположной части находится спальня, а почти 20 м² отданы открытой кухне-гостиной с местом для обеденного стола и дивана.",
    suitableFor: "Подойдёт для загородного отдыха с ночёвкой: после парной не нужно переходить в отдельное строение, а спальня остаётся приватной.",
    highlights: ["Встроенная парная", "Кухня-гостиная около 20 м²", "Отдельная спальня"]
  },
  "6892350": {
    feature: "сауна и душевая в компактном доме",
    featureEn: "sauna and shower in a compact house",
    rooms: "1 спальня, кухня-гостиная, душевая, сауна",
    bedrooms: 1,
    summary: "Компактный жилой дом с сауной, душевой и спальней в четырёхзонной планировке.",
    layoutDescription: "В отличие от проекта 6920434, мокрая зона здесь разделена на душевую и отдельную сауну по одной стороне дома. Напротив расположены спальня и кухня-гостиная; центральный проход связывает все четыре помещения.",
    suitableFor: "Решение для участка, где нужен небольшой гостевой дом и банный блок в одном тёплом объёме без большой общей комнаты.",
    highlights: ["Раздельные сауна и душевая", "Четыре самостоятельные зоны", "Спальня напротив кухни-гостиной"]
  },
  "6972660": {
    feature: "крытая терраса 18 м² и спальня",
    featureEn: "18 m² roofed terrace and bedroom",
    rooms: "1 спальня, кухня-гостиная, санузел",
    bedrooms: 1,
    summary: "Односпальный дом с самой большой террасой среди компактных проектов каталога.",
    layoutDescription: "Крытая терраса 18 м² тянется вдоль жилого фасада и имеет ограждение. Из неё вход ведёт в кухню-гостиную; спальня отделена от дневной зоны, а санузел расположен у входа.",
    suitableFor: "Проект для пары или дачного отдыха, где приоритетом служит просторная всепогодная площадка для стола, кресел и летних встреч.",
    highlights: ["Крытая терраса 18 м²", "Ограждение по периметру", "Изолированная спальня"]
  },
  "6971491": {
    feature: "гостиная с печью и крытая терраса",
    featureEn: "living room with stove position and roofed terrace",
    rooms: "1 спальня, кухня-столовая, гостиная, санузел",
    bedrooms: 1,
    summary: "Дом с отдельной гостиной, предусмотренным местом для печи и крытой террасой 12 м².",
    layoutDescription: "Кухня-столовая и гостиная разделены, поэтому запахи готовки не занимают всю дневную зону. На плане отмечено место для печи; спальня и санузел собраны в правой части, а вход идёт с крытой террасы.",
    suitableFor: "Подойдёт для круглогодичной дачи или гостевого дома, если важны отдельная гостиная и возможность добавить живой огонь.",
    highlights: ["Отдельные кухня-столовая и гостиная", "Место для печи", "Крытая терраса 12 м²"]
  },
  "6972735": {
    feature: "две спальни и угловая терраса",
    featureEn: "two bedrooms and corner terrace",
    rooms: "2 спальни, кухня-гостиная, санузел",
    bedrooms: 2,
    summary: "Семейный дом с двумя спальнями и крытой угловой террасой площадью 13 м².",
    layoutDescription: "Две спальни расположены рядом и отделены от кухни-гостиной коротким холлом. Санузел находится между дневной и приватной зонами, а терраса примыкает к двум сторонам дома и создаёт защищённый вход.",
    suitableFor: "Планировка рассчитана на небольшую семью или размещение гостей, которым нужны два независимых спальных помещения.",
    highlights: ["Две отдельные спальни", "Угловая крытая терраса 13 м²", "Короткий центральный холл"]
  },
  "7066580": {
    feature: "две спальни в вытянутой планировке",
    featureEn: "two bedrooms in a linear layout",
    rooms: "2 спальни, кухня-гостиная, санузел",
    bedrooms: 2,
    summary: "Узкий семейный дом с двумя равными спальнями и длинной кухней-гостиной.",
    layoutDescription: "Обе спальни размещены одна за другой вдоль левого фасада и имеют встроенные места хранения. Справа тянется общая кухня-гостиная, а санузел вынесен в верхний угол, не занимая центральный проход.",
    suitableFor: "Проект удобен для вытянутого участка и семьи с одним ребёнком либо для двух отдельных гостевых комнат.",
    highlights: ["Две спальни одинакового формата", "Вытянутый корпус 6 × 7,8 м", "Общая зона вдоль фасада"]
  },
  "6966147": {
    feature: "две спальни и гостиная с террасой",
    featureEn: "two bedrooms and living area with terrace",
    rooms: "2 спальни, кухня-гостиная, санузел, прихожая",
    bedrooms: 2,
    summary: "Семейный дом с двумя спальнями, отдельной прихожей и крытой террасой 12 м².",
    layoutDescription: "Спальни собраны в тихом боковом крыле, а кухня-гостиная занимает центр дома и открывается к террасе. У входа предусмотрена закрытая прихожая со шкафом; санузел удалён от обеденной зоны.",
    suitableFor: "План подходит семье из трёх-четырёх человек, которой нужны две спальни, хранение у входа и крытая площадка для отдыха.",
    highlights: ["Две спальни в отдельном крыле", "Закрытая прихожая", "Крытая терраса 12 м²"]
  },
  "7055054": {
    feature: "две спальни и кухня-гостиная 32 м²",
    featureEn: "two bedrooms and 32 m² kitchen-living room",
    rooms: "2 спальни, кухня-гостиная, санузел, прихожая",
    bedrooms: 2,
    summary: "Дом для семьи с двумя почти равными спальнями и общей зоной более 32 м².",
    layoutDescription: "Обе спальни размещены вдоль левого фасада и отделены от большой кухни-гостиной. Санузел и компактная прихожая собраны справа; центральная общая зона позволяет свободно разместить диван, стол и кухонный остров.",
    suitableFor: "Проект для постоянного проживания семьи, которая предпочитает большую общую комнату вместо дополнительных малых помещений.",
    highlights: ["Кухня-гостиная 32,48 м²", "Две спальни около 9,8 м²", "Компактная входная группа"]
  },
  "7068240": {
    feature: "две спальни и отдельная кладовая",
    featureEn: "two bedrooms and separate storage room",
    rooms: "2 спальни, кухня-гостиная, кладовая, санузел",
    bedrooms: 2,
    summary: "Практичный семейный дом с двумя спальнями, кладовой у входа и большой общей зоной.",
    layoutDescription: "Спальни вынесены в левую часть дома, между дневной зоной и входом предусмотрена отдельная кладовая почти 4 м². Санузел находится рядом, а кухня-гостиная занимает весь правый модуль.",
    suitableFor: "Подойдёт для постоянного проживания, когда требуется место для сезонных вещей, бытовой техники или хозяйственного инвентаря.",
    highlights: ["Кладовая 3,96 м²", "Две отдельные спальни", "Кухня-гостиная более 23 м²"]
  },
  "6964526": {
    feature: "мастер-спальня и детская",
    featureEn: "main bedroom and children's room",
    rooms: "2 спальни, кухня-гостиная, гардеробная, санузел",
    bedrooms: 2,
    summary: "Семейная планировка с мастер-спальней, детской, гардеробной и общей зоной почти 25 м².",
    layoutDescription: "Две спальни расположены друг над другом в правом крыле и отделены от кухни-гостиной. У входа находится гардеробная 5 м², рядом — полноценный санузел; общая зона занимает левую часть дома.",
    suitableFor: "Вариант для семьи с ребёнком, которой важны закрытое хранение и чёткое разделение дневной и спальной частей.",
    highlights: ["Гардеробная 5 м²", "Две спальни около 8,4 м²", "Кухня-гостиная 24,84 м²"]
  },
  "6985270": {
    feature: "две спальни и терраса 14 м²",
    featureEn: "two bedrooms and 14 m² terrace",
    rooms: "2 спальни, кухня-гостиная, санузел",
    bedrooms: 2,
    summary: "Широкий двухспальный дом с большой общей зоной и крытой террасой вдоль фасада.",
    layoutDescription: "Две спальни одинаковой площади размещены слева, кухня-гостиная занимает центр и правую часть. Санузел расположен напротив спален, а крытая терраса 14 м² продолжает общую зону снаружи.",
    suitableFor: "Проект рассчитан на семейное проживание и участки, где широкий фасад можно развернуть к саду или лучшему виду.",
    highlights: ["Две спальни по 8,4 м²", "Кухня-гостиная более 29 м²", "Крытая терраса 14 м²"]
  },
  "7042179": {
    feature: "две спальни, постирочная и терраса",
    featureEn: "two bedrooms, laundry and terrace",
    rooms: "2 спальни, кухня-гостиная, постирочная, санузел",
    bedrooms: 2,
    summary: "Дом с двумя спальнями, отдельной постирочной и просторной крытой террасой.",
    layoutDescription: "Кухня-гостиная занимает левое крыло и выходит на крытую террасу почти 12 м². Справа размещены две спальни, между ними и общей зоной — санузел, постирочная и закрытая прихожая.",
    suitableFor: "Подходит для постоянного проживания семьи, которой нужна самостоятельная хозяйственная зона, а не стиральная машина в ванной или кухне.",
    highlights: ["Отдельная постирочная 3,55 м²", "Две спальни", "Крытая терраса около 12 м²"]
  },
  "6915271": {
    feature: "две спальни и гостиная 33,5 м²",
    featureEn: "two bedrooms and 33.5 m² living area",
    rooms: "2 спальни, кухня-гостиная, санузел",
    bedrooms: 2,
    summary: "Вытянутый семейный дом с двумя спальнями и очень просторной кухней-гостиной.",
    layoutDescription: "Две спальни расположены одна под другой в левом модуле. Правая половина почти полностью отдана кухне-гостиной площадью 33,54 м²; санузел вынесен в верхний угол и не разрывает общее пространство.",
    suitableFor: "Проект для семьи, которая часто собирает гостей и ценит большую общую комнату больше, чем дополнительные спальни.",
    highlights: ["Кухня-гостиная 33,54 м²", "Две изолированные спальни", "Корпус 6 × 12 м"]
  },
  "6964606": {
    feature: "четыре спальни для большой семьи",
    featureEn: "four bedrooms for a large family",
    rooms: "4 спальни, кухня-гостиная, гардеробная, санузел",
    bedrooms: 4,
    summary: "Самый вместительный проект каталога: четыре спальни вокруг центральной кухни-гостиной.",
    layoutDescription: "Спальные комнаты распределены по двум боковым крыльям, поэтому у каждого члена семьи есть приватное место. В центре находится кухня-гостиная почти 25 м², у входа — гардеробная 5 м², рядом полноценный санузел.",
    suitableFor: "Дом рассчитан на большую семью, постоянное проживание нескольких поколений или сочетание трёх спален с отдельным кабинетом.",
    highlights: ["Четыре отдельные спальни", "Центральная кухня-гостиная", "Гардеробная у входа"]
  },
  "7068511": {
    feature: "парная и комната отдыха в мини-формате",
    featureEn: "steam room and lounge in a mini format",
    rooms: "парная, душевая зона, комната отдыха",
    bedrooms: 0,
    summary: "Мини-баня с парной, душевой зоной и отдельной комнатой отдыха в корпусе 2,6 × 6 м.",
    layoutDescription: "Парная занимает один торец модуля, комната отдыха — другой. Между ними находится входная и душевая зона с печью; проходы короткие, поэтому полезная площадь не уходит на коридор.",
    suitableFor: "Компактное решение для небольшого участка или как дополнение к готовому дому, с возможностью заказать вариант без террасы.",
    highlights: ["Корпус шириной 2,6 м", "Изолированная парная", "Цена указана также без террасы"]
  },
  "6909223": {
    feature: "просторная парная и раздельная душевая",
    featureEn: "large steam room and separate shower",
    rooms: "парная, душевая, комната отдыха",
    bedrooms: 0,
    summary: "Баня 3 × 7 м с широкой парной, отдельной душевой и комнатой отдыха.",
    layoutDescription: "Вход расположен по центру длинного фасада. Слева находится парная с двухъярусными полками, в середине — изолированная душевая, справа — прямоугольная комната отдыха; мокрые зоны не пересекаются с местом отдыха.",
    suitableFor: "Подойдёт для семейного использования и компании гостей, когда важны раздельные помещения и более свободная парная.",
    highlights: ["Три последовательные зоны", "Отдельная душевая", "Парная с широкими полками"]
  },
  "6909183": {
    feature: "баня с санузлом и комнатой отдыха",
    featureEn: "bathhouse with WC and lounge",
    rooms: "парная, санузел с душем, комната отдыха",
    bedrooms: 0,
    summary: "Модульная баня с парной, совмещённым санузлом и большой комнатой отдыха.",
    layoutDescription: "Парная и комната отдыха занимают противоположные торцы. В центральном блоке объединены душ и туалет, а вход отделён небольшим тамбуром — это главное отличие от проекта 6909223 с самостоятельной душевой.",
    suitableFor: "Вариант для участка без отдельного санузла рядом с баней: все необходимые бытовые функции собраны внутри одного модуля.",
    highlights: ["Совмещённый санузел с душем", "Входной тамбур", "Комната отдыха во всю ширину модуля"]
  }
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

const buildProjects = (lang: Lang): Project[] =>
  seeds.map((s) => {
    const r = lang === "ru";
    const isBath = s.kind === "bath";
    const profile = projectProfiles[s.no];
    const area = areaStr(s.area, lang);
    const kindWord = isBath ? (r ? "Модульная баня" : "Modular bath") : r ? "Модульный дом" : "Modular house";
    const feature = r ? profile.feature : profile.featureEn;
    const title = `${kindWord} ${area} — ${feature}`;
    const fromPrice = price(s.warm ?? s.noTerrace ?? s.turnkey, "ru");
    const footprint = `${meters(s.dims[0], "ru")} × ${meters(s.dims[1], "ru")} м`;
    const seoTitle = `${isBath ? "Модульная баня" : "Модульный дом"} ${areaStr(s.area, "ru")} — ${profile.feature}, проект ${s.no} | Modul S`;
    const seoDescription = `${isBath ? "Модульная баня" : "Модульный дом"} ${areaStr(s.area, "ru")}: ${profile.rooms}, ${profile.feature}, размер ${footprint}. Цена от ${fromPrice}, планировка, комплектации и монтаж по Беларуси.`;

    return {
      id: s.no,
      kind: s.kind,
      title,
      seoTitle,
      seoDescription,
      feature,
      rooms: profile.rooms,
      layoutDescription: profile.layoutDescription,
      suitableFor: profile.suitableFor,
      highlights: profile.highlights,
      bedrooms: profile.bedrooms,
      projectNo: s.no,
      area,
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
      summary: r ? profile.summary : `${kindWord} with ${profile.featureEn}.`,
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
    seoIntro: {
      eyebrow: "Modular construction in Belarus",
      title: "Turnkey modular houses and baths from our Brest production facility",
      paragraphs: [
        "Modul S designs and manufactures timber-frame modular houses for permanent living, country plots, guest accommodation, and commercial use. We help you choose a ready-made project or develop an individual layout for your plot and budget.",
        "The catalog includes compact mini-houses, family houses with terraces, and modular baths. Prices, layouts, warm-shell and turnkey packages are shown on the website, with delivery and installation available throughout Belarus."
      ],
      items: ["Permanent-living houses", "Country and guest houses", "Turnkey modular baths", "Custom house projects"]
    },
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
          "Interior finish — painted timber-look cladding, grade AB, or plasterboard",
          "Finish floor — class 33 laminate (color of choice)",
          "Finished bathroom floor — tile (color of choice)",
          "MDF interior doors",
          "Electrical: concealed/surface wiring, sockets, switches, light fixtures, electrical panel",
          "5 water points: sink, shower, kitchen sink, toilet, water heater"
        ]
      }
    ],
    projectsSection: {
      eyebrow: "Projects catalog",
      title: "Modular houses and baths",
      text: "Swipe through the lineup — from compact 22 m² houses to spacious 84 m² family homes and turnkey baths. Open any project to see the full layout. Layout changes are possible for every project, and we also build custom designs."
    },
    projects: applyCatalogUpdates(buildProjects("en"), "en"),
    optionsSection: {
      eyebrow: "Customize your house",
      title: "Additional house options",
      text: "Add practical engineering, finishing, and comfort options to your selected project. The final specification and price are calculated individually."
    },
    options: [
      "Extended roof overhang",
      "Terrace construction",
      "Decorative slats and terrace railing",
      "Outdoor frost-proof tap installation",
      "Rainwater drainage system installation",
      "Additional 50 mm insulation",
      "Fireplace stove installation",
      "Lighting installation",
      "Underfloor heating installation",
      "Heat recovery ventilator installation",
      "Wall-hung toilet installation frame",
      "Shower cabin installation",
      "Water heater installation",
      "Quartz vinyl flooring instead of laminate",
      "Tile flooring instead of laminate",
      "Full bathroom wall and floor tiling"
    ],
    faq: {
      eyebrow: "Questions and answers",
      title: "About modular houses, pricing, and construction",
      text: "Key information to help you choose a project and prepare for a consultation.",
      items: [
        { question: "How much does a turnkey modular house cost?", answer: "The price depends on floor area, layout, package, terrace, foundation, utilities, and additional options. Current indicative prices are shown in the project catalog; the final estimate is prepared after discussing your plot and specification." },
        { question: "Are modular houses suitable for permanent living?", answer: "Yes. The projects use an insulated timber frame, membranes, double-glazed windows, and utility solutions. Heating and the final engineering specification are selected for your living pattern and site conditions." },
        { question: "Can you deliver and install a house anywhere in Belarus?", answer: "We manufacture modules in Brest and arrange delivery and installation throughout Belarus. Access roads, crane placement, distance, and site preparation are clarified before the contract." },
        { question: "Can the standard layout be changed?", answer: "Yes. Room arrangement, glazing, terrace, finishes, and engineering options can be adapted where the structure permits. We also develop individual house projects." },
        { question: "What is the difference between Warm Shell and Turnkey?", answer: "Warm Shell is an insulated weatherproof structure ready for interior work. Turnkey additionally includes finished interiors, flooring, doors, electrical work, and specified plumbing connections." },
        { question: "Which foundation is suitable for a modular house?", answer: "The choice depends on soil, relief, access, house dimensions, and utility routes. Screw piles, driven piles, or a strip foundation may be used after assessing the site." },
        { question: "How long does manufacturing and installation take?", answer: "The schedule depends on project complexity, production workload, materials, foundation readiness, delivery conditions, and season. We confirm the actual timeline for your specification before signing the contract." },
        { question: "Do you build modular baths?", answer: "Yes. The catalog includes ready modular bath projects with a steam room, washing area, rest space, and finishing options. The layout and equipment can be discussed individually." },
        { question: "What must be prepared on the plot before delivery?", answer: "The plot normally needs a completed foundation, suitable vehicle and crane access, cleared installation space, and planned utility connection points. We clarify the requirements during consultation." }
      ]
    },
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
      title: "Contact us directly",
      text: "Choose the most convenient way to reach us. We will answer your questions about projects, pricing, delivery, and installation."
    },
    footer: {
      contacts: "Contacts",
      address: "Address",
      legalTitle: "Company details",
      legalText: "CampingDom LLC, 90D Syabrovskaya Street, Brest, Brest District, Brest Region, 224000, Belarus. Tax ID 291924206. Opening hours: Mon–Fri 09:00–18:00; Sat–Sun closed. Registered by the Brest Regional Executive Committee. This website is not an online store, and the listed prices are not invoices for payment. All information is provided for informational purposes only.",
      madeWith: "Made with",
      madeWithBy: "by"
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
    seoIntro: {
      eyebrow: "Модульное строительство в Беларуси",
      title: "Модульные дома и бани под ключ от производителя в Бресте",
      paragraphs: [
        "Modul S проектирует и производит каркасно-модульные дома для постоянного проживания, дачи, гостевого размещения и коммерческих задач. Поможем выбрать и купить готовый модульный дом или разработаем индивидуальную планировку под ваш участок и бюджет.",
        "В каталоге представлены компактные мини-дома, семейные дома с террасой и модульные бани под ключ. На сайте указаны проекты, планировки и цены на комплектации «тёплый контур» и «под ключ». Выполняем доставку и монтаж модульных домов по всей Беларуси."
      ],
      items: ["Дома для постоянного проживания", "Дачные и гостевые дома", "Модульные бани под ключ", "Индивидуальные проекты домов"]
    },
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
          "Внутренняя отделка — имитация бруса, окрашенная, сорт АВ или гипсокартон",
          "Чистовой пол — ламинат 33 класс (цвет на выбор)",
          "Чистовой пол в ванной комнате — плитка (цвет на выбор)",
          "Межкомнатные двери МДФ",
          "Электрика: скрытый/открытый монтаж, розетки, выключатели, светильники, электр. щит",
          "5 водо-точек: раковина, душ, кухонная мойка, унитаз, водонагреватель"
        ]
      }
    ],
    projectsSection: {
      eyebrow: "Каталог проектов",
      title: "Модульные дома и бани",
      text: "Листайте каталог — от компактных домов 22 м² до просторных семейных домов 84 м² и бань под ключ. Откройте любой проект, чтобы увидеть полную планировку. В каждом проекте возможна перепланировка. Строим по индивидуальным проектам."
    },
    projects: applyCatalogUpdates(buildProjects("ru")),
    optionsSection: {
      eyebrow: "Индивидуальная комплектация",
      title: "Дополнительные опции к дому",
      text: "Дополните выбранный проект инженерными решениями, отделкой и элементами комфорта. Итоговая комплектация и стоимость рассчитываются индивидуально."
    },
    options: [
      "Свес крыши",
      "Обустройство террасы",
      "Декоративные рейки и ограждение террасы",
      "Установка уличного незамерзающего крана",
      "Установка водосточной системы",
      "Дополнительное утепление +50 мм",
      "Установка печи-камина",
      "Установка подсветки",
      "Монтаж тёплого пола",
      "Установка рекуператора",
      "Установка инсталляции",
      "Установка душевой кабины",
      "Установка водонагревателя",
      "Укладка кварцвинила вместо ламината",
      "Укладка плитки вместо ламината",
      "Полная укладка плитки в ванной комнате"
    ],
    faq: {
      eyebrow: "Вопросы и ответы",
      title: "О модульных домах, ценах и строительстве",
      text: "Основная информация, которая поможет выбрать проект модульного дома и подготовиться к консультации.",
      items: [
        { question: "Сколько стоит модульный дом под ключ?", answer: "Цена модульного дома зависит от площади, планировки, комплектации, террасы, фундамента, инженерных систем и дополнительных опций. Актуальные ориентировочные цены указаны в каталоге проектов, а итоговую смету подготовим после обсуждения участка и комплектации." },
        { question: "Подходит ли модульный дом для постоянного проживания?", answer: "Да. В проектах используется утеплённый деревянный каркас, защитные мембраны, двухкамерные стеклопакеты и инженерные решения. Отопление и окончательная комплектация подбираются с учётом режима проживания и условий участка." },
        { question: "Есть ли доставка и монтаж модульных домов по Беларуси?", answer: "Мы производим модули в Бресте и организуем доставку и монтаж по всей Беларуси. До заключения договора уточняем подъезд для транспорта, место установки крана, расстояние и готовность участка." },
        { question: "Можно ли изменить готовую планировку дома?", answer: "Да. Если конструкция позволяет, можно изменить расположение помещений, остекление, террасу, отделку и инженерные опции. Также мы разрабатываем индивидуальные проекты домов." },
        { question: "Чем отличается «Тёплый контур» от комплектации «Под ключ»?", answer: "«Тёплый контур» — утеплённая и защищённая от непогоды конструкция, готовая к внутренним работам. В комплектацию «Под ключ» дополнительно входят чистовая отделка, полы, двери, электрика и предусмотренные сантехнические подключения." },
        { question: "Какой фундамент нужен для модульного дома?", answer: "Выбор зависит от грунта, рельефа, подъезда, размеров дома и расположения коммуникаций. После оценки участка могут использоваться винтовые или забивные сваи, а также ленточный фундамент." },
        { question: "Сколько времени занимает производство и монтаж?", answer: "Срок зависит от сложности проекта, загрузки производства, наличия материалов, готовности фундамента, условий доставки и сезона. Точный график по выбранной комплектации фиксируется перед заключением договора." },
        { question: "Строите ли вы модульные бани под ключ?", answer: "Да. В каталоге есть готовые проекты модульных бань с парной, моечной, зоной отдыха и вариантами отделки. Планировку и оборудование можно обсудить индивидуально." },
        { question: "Что подготовить на участке до доставки дома?", answer: "Обычно требуются готовый фундамент, подъезд для грузового транспорта и крана, свободная зона монтажа и предусмотренные точки подключения коммуникаций. Все требования уточняем на консультации." }
      ]
    },
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
      title: "Свяжитесь с нами напрямую",
      text: "Выберите удобный способ связи. Ответим на вопросы о проектах, стоимости, доставке и монтаже."
    },
    footer: {
      contacts: "Контакты",
      address: "Адрес",
      legalTitle: "Реквизиты компании",
      legalText: "ООО «КемпингДом», 224000, Брестская область, Брестский район, г. Брест, ул. Сябровская, д. 90Д. УНП 291924206. Режим работы: пн–пт 09:00–18:00; сб, вс — выходной. Зарегистрировано Брестским областным исполнительным комитетом. Данный сайт не является интернет-магазином, а указанные цены не являются счётом для оплаты. Представленная информация носит исключительно информационный характер.",
      madeWith: "Сделано с",
      madeWithBy: "в"
    }
  }
};
