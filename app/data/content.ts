export type Lang = "en" | "ru";

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
    scaledPreview: string;
    googleMapsArea: string;
    telegram: string;
    viber: string;
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
  projectsSection: {
    eyebrow: string;
    title: string;
    text: string;
  };
  projects: {
    title: string;
    area: string;
    rooms: string;
    price: string;
    time: string;
    image: string;
    description: string;
    plan: "studio" | "family" | "forest";
  }[];
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
  process: {
    eyebrow: string;
    title: string;
    text: string;
    steps: string[];
  };
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

export const content: Record<Lang, Content> = {
  en: {
    meta: {
      htmlLang: "en",
      switchLabel: "Switch language",
      switchTo: "RU"
    },
    nav: [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Construction Process", href: "#process" },
      { label: "Contacts", href: "#contacts" }
    ],
    brand: {
      name: "Modul House",
      location: "Brest, Belarus",
      tagline: "Modern modular timber-frame houses turnkey from Brest, Belarus."
    },
    common: {
      phone: "+375 44 570 27 87",
      consultation: "Get a Consultation",
      browseProjects: "Browse Projects",
      viewProject: "View Project",
      getCatalog: "Get Catalog",
      requestConsultation: "Request Consultation",
      plan: "Plan",
      scaledPreview: "Scaled preview",
      googleMapsArea: "Google Maps area",
      telegram: "Telegram",
      viber: "Viber"
    },
    hero: {
      eyebrow: "Modern modular houses turnkey",
      title: "Modern Modular Houses Turnkey",
      lead: "Design, manufacturing, delivery, and installation of high-quality modular homes for families, cottages, land owners, and investors across Belarus."
    },
    benefits: ["Own Manufacturing Facility", "Delivery Across Belarus", "Turnkey Construction", "Custom House Designs"],
    about: {
      eyebrow: "About company",
      title: "Timber-frame homes built with factory precision",
      text: "We create modular homes and baths where comfort, aesthetics, and harmony with nature come together. Every project starts with a practical consultation and moves through controlled manufacturing, delivery, installation, and handover.",
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
    projectsSection: {
      eyebrow: "Projects catalog",
      title: "Popular small modular homes",
      text: "Catalog cards focus on the exterior, plan, size, rooms, price, and construction time so customers can compare projects quickly."
    },
    projects: [
      {
        title: "Compact 36",
        area: "36 m2",
        rooms: "2 rooms",
        price: "from 58,000 BYN",
        time: "45-60 days",
        image: "/house-photos/IMG_0640.JPG",
        description: "A small year-round house with open kitchen-living space, bedroom, bathroom, and terrace option.",
        plan: "studio"
      },
      {
        title: "Family 54",
        area: "54 m2",
        rooms: "3 rooms",
        price: "from 82,000 BYN",
        time: "60-75 days",
        image: "/house-photos/IMG_0640.JPG",
        description: "Balanced layout for a family: two bedrooms, a shared living zone, technical storage, and warm timber finish.",
        plan: "family"
      },
      {
        title: "Forest 72",
        area: "72 m2",
        rooms: "4 rooms",
        price: "from 108,000 BYN",
        time: "75-90 days",
        image: "/house-photos/IMG_0640.JPG",
        description: "A larger modular home with separated sleeping rooms and a generous living-dining area for permanent use.",
        plan: "forest"
      }
    ],
    completed: {
      eyebrow: "Completed houses",
      title: "A finished modular house with warm timber interiors",
      text: "Completed near Brest with a terrace, panoramic glazing, bright kitchen-living space, bedroom, and fully finished interiors.",
      quote: "We wanted a comfortable small house without a long construction process. The team helped choose the layout, prepared the modules, and handed over a ready space on schedule.",
      location: "Brest region, Belarus",
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
        title: "Concrete Slab",
        use: "Best for permanent homes with full utilities and high comfort requirements.",
        description: "A monolithic base that creates a stable floor structure and clean installation platform.",
        advantages: ["Excellent stability", "Comfortable floors", "Suitable for heating systems"]
      },
      {
        title: "Strip Foundation",
        use: "For traditional plots, larger houses, and projects with specific structural loads.",
        description: "A proven foundation format with strong perimeter support for long-term family homes.",
        advantages: ["Durable structure", "Flexible design", "Familiar service access"]
      }
    ],
    process: {
      eyebrow: "Construction process",
      title: "From first call to project handover",
      text: "A transparent timeline keeps the work predictable: scope first, price second, manufacturing third, and installation only after readiness is confirmed.",
      steps: ["Consultation", "Project Selection", "Cost Estimation", "Contract Signing", "Manufacturing", "Delivery", "Installation", "Project Handover"]
    },
    trust: {
      eyebrow: "Why choose us",
      title: "A calm process, fixed expectations, and accountable delivery",
      text: "The offer is built for customers who need a permanent, comfortable home without improvisation on site.",
      cards: ["Official Contract", "Transparent Pricing", "Fixed Deadlines", "Warranty", "Quality Control", "Premium Materials", "Full Customer Support", "Post-Construction Support"]
    },
    catalog: {
      eyebrow: "House plans catalog",
      title: "Get our house plans catalog",
      text: "Leave your phone and Telegram username to receive popular house designs, small-size prices, and planning options.",
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
      { label: "О нас", href: "#about" },
      { label: "Проекты", href: "#projects" },
      { label: "Этапы строительства", href: "#process" },
      { label: "Контакты", href: "#contacts" }
    ],
    brand: {
      name: "Modul House",
      location: "Брест, Беларусь",
      tagline: "Современные модульные каркасные дома под ключ из Бреста, Беларусь."
    },
    common: {
      phone: "+375 44 570 27 87",
      consultation: "Получить консультацию",
      browseProjects: "Смотреть проекты",
      viewProject: "Смотреть проект",
      getCatalog: "Получить каталог",
      requestConsultation: "Оставить заявку",
      plan: "Планировка",
      scaledPreview: "Схема проекта",
      googleMapsArea: "Место для Google Maps",
      telegram: "Telegram",
      viber: "Viber"
    },
    hero: {
      eyebrow: "Современные модульные дома под ключ",
      title: "Модульные дома под ключ",
      lead: "Проектирование, производство, доставка и монтаж качественных модульных домов для семей, дач, владельцев участков и инвесторов по всей Беларуси."
    },
    benefits: ["Собственное производство", "Доставка по Беларуси", "Строительство под ключ", "Индивидуальные проекты домов"],
    about: {
      eyebrow: "О компании",
      title: "Каркасные дома с точностью заводского производства",
      text: "Мы создаем модульные дома и бани, в которых сочетаются комфорт, эстетика и гармония с природой. Каждый проект начинается с консультации и проходит через контролируемое производство, доставку, монтаж и передачу готового объекта.",
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
    projectsSection: {
      eyebrow: "Каталог проектов",
      title: "Популярные небольшие модульные дома",
      text: "Карточки каталога показывают внешний вид, планировку, площадь, комнаты, цену и срок строительства, чтобы клиент быстро сравнил варианты."
    },
    projects: [
      {
        title: "Compact 36",
        area: "36 м2",
        rooms: "2 комнаты",
        price: "от 58 000 BYN",
        time: "45-60 дней",
        image: "/house-photos/IMG_0640.JPG",
        description: "Небольшой дом для круглогодичного проживания с кухней-гостиной, спальней, санузлом и вариантом террасы.",
        plan: "studio"
      },
      {
        title: "Family 54",
        area: "54 м2",
        rooms: "3 комнаты",
        price: "от 82 000 BYN",
        time: "60-75 дней",
        image: "/house-photos/IMG_0640.JPG",
        description: "Сбалансированная планировка для семьи: две спальни, общая гостиная зона, техпомещение и теплая деревянная отделка.",
        plan: "family"
      },
      {
        title: "Forest 72",
        area: "72 м2",
        rooms: "4 комнаты",
        price: "от 108 000 BYN",
        time: "75-90 дней",
        image: "/house-photos/IMG_0640.JPG",
        description: "Более просторный модульный дом с отдельными спальнями и большой зоной кухни-гостиной для постоянного проживания.",
        plan: "forest"
      }
    ],
    completed: {
      eyebrow: "Построенные дома",
      title: "Готовый модульный дом с теплой деревянной отделкой",
      text: "Проект реализован недалеко от Бреста: терраса, панорамное остекление, светлая кухня-гостиная, спальня и полностью готовые интерьеры.",
      quote: "Мы хотели комфортный небольшой дом без долгой стройки. Команда помогла выбрать планировку, подготовила модули и передала готовое пространство в согласованные сроки.",
      location: "Брестская область, Беларусь",
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
        title: "Монолитная плита",
        use: "Для постоянных домов с коммуникациями и повышенным уровнем комфорта.",
        description: "Прочное основание, которое формирует стабильную платформу для монтажа и будущей эксплуатации.",
        advantages: ["Отличная устойчивость", "Комфортные полы", "Подходит для теплого пола"]
      },
      {
        title: "Ленточный фундамент",
        use: "Для традиционных участков, больших домов и особых конструктивных нагрузок.",
        description: "Проверенный формат фундамента с надежной поддержкой по периметру дома.",
        advantages: ["Долговечная конструкция", "Гибкость проекта", "Удобный доступ к коммуникациям"]
      }
    ],
    process: {
      eyebrow: "Этапы строительства",
      title: "От первого звонка до передачи дома",
      text: "Прозрачный процесс делает работу предсказуемой: сначала задача, затем расчет, производство и монтаж после подтверждения готовности.",
      steps: ["Консультация", "Выбор проекта", "Расчет стоимости", "Подписание договора", "Производство", "Доставка", "Монтаж", "Передача объекта"]
    },
    trust: {
      eyebrow: "Почему выбирают нас",
      title: "Спокойный процесс, понятные условия и ответственная сдача",
      text: "Предложение создано для клиентов, которым нужен постоянный комфортный дом без импровизации на участке.",
      cards: ["Официальный договор", "Прозрачная цена", "Фиксированные сроки", "Гарантия", "Контроль качества", "Премиальные материалы", "Полная поддержка клиента", "Поддержка после строительства"]
    },
    catalog: {
      eyebrow: "Каталог планировок",
      title: "Получите каталог проектов домов",
      text: "Оставьте телефон и Telegram, чтобы получить популярные проекты, цены на небольшие дома и варианты планировок.",
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
