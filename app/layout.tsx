import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { content } from "./data/content";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://modulsdom-brest.by"),
  title: "Модульные дома и бани под ключ в Беларуси | Modul S",
  description:
    "Проектируем и производим модульные каркасные дома и бани под ключ в Бресте с доставкой и монтажом по всей Беларуси. Каталог проектов и цены Modul S.",
  applicationName: "Modul S",
  authors: [{ name: "Modul S", url: "https://modulsdom-brest.by" }],
  creator: "Modul S",
  publisher: "Modul S",
  category: "Строительство модульных домов",
  keywords: [
    "модульные дома", "модульные дома Беларусь", "модульные дома под ключ Беларусь",
    "модульный дом под ключ", "купить модульный дом", "модульный дом цена",
    "цены на модульные дома", "проекты модульных домов", "готовые модульные дома",
    "строительство модульных домов", "производство модульных домов",
    "производитель модульных домов", "модульные дома Брест", "модульный дом Брест",
    "каркасные дома Беларусь", "каркасно-модульные дома", "быстровозводимые дома",
    "дом под ключ", "дом для постоянного проживания", "модульный дом для дачи",
    "дачный дом", "гостевой дом", "мини-дом", "дом с террасой",
    "модульные дома с доставкой", "модульные дома с монтажом",
    "модульные бани", "модульные бани Беларусь", "модульная баня под ключ",
    "баня под ключ", "проекты бань", "Modul S", "КемпингДом", "КемпингДом Брест",
    // Региональные и низкочастотные запросы (Брест, Беларусь)
    "модульные дома в Бресте", "модульные дома Брест цена", "модульные дома Брест под ключ",
    "модульный дом купить Брест", "каркасный дом Брест", "каркасные дома Брест",
    "модульные дома от производителя Беларусь", "модульные дома цена Беларусь",
    "модульные дома под ключ цена Беларусь", "модульные дома Минск", "модульные дома Гродно",
    "модульные дома Барановичи", "модульные дома Пинск", "дом из модулей",
    "домокомплект Беларусь", "готовый дом с доставкой Беларусь", "барнхаус Беларусь",
    "барнхаус Брест", "дом barnhouse", "модульная баня Брест", "баня бочка Беларусь",
    "дом-баня под ключ", "садовый домик под ключ", "модульный офис", "модульная бытовка",
    "маленький дом под ключ Беларусь", "одноэтажный модульный дом", "модульный дом с террасой Беларусь",
    "modular houses Belarus", "modular homes Brest"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  other: {
    "theme-color": "#1f3024",
    "format-detection": "telephone=yes",
    // Regional signals for Yandex/Google — Brest, Belarus
    "geo.region": "BY-BR",
    "geo.placename": "Брест",
    "geo.position": "52.097622;23.734051",
    ICBM: "52.097622, 23.734051"
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Modul S — модульные дома и бани под ключ",
    description:
      "Проектирование, производство, доставка и монтаж модульных домов и бань по всей Беларуси.",
    url: "/",
    siteName: "Modul S",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/site-preview-ru.jpg",
        width: 1200,
        height: 630,
        alt: "Modul S — модульные дома и бани в Беларуси",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Modul S — модульные дома и бани под ключ",
    description:
      "Проектирование, производство, доставка и монтаж по всей Беларуси.",
    images: ["/site-preview-ru.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "Organization"],
    "@id": "https://modulsdom-brest.by/#organization",
    name: "Modul S",
    legalName: "ООО «КемпингДом»",
    url: "https://modulsdom-brest.by",
    logo: "https://modulsdom-brest.by/icon.svg",
    image: "https://modulsdom-brest.by/site-preview-ru.jpg",
    telephone: "+375445702727",
    priceRange: "$$",
    description: "Производство модульных каркасных домов и бань под ключ в Бресте с доставкой и монтажом по всей Беларуси.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Сябровская, 90Д",
      addressLocality: "Брест",
      addressRegion: "Брестская область",
      postalCode: "224000",
      addressCountry: "BY"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.097622,
      longitude: 23.734051
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    areaServed: [
      { "@type": "Country", name: "Беларусь" },
      { "@type": "City", name: "Брест" },
      { "@type": "City", name: "Минск" },
      { "@type": "City", name: "Гродно" },
      { "@type": "City", name: "Барановичи" },
      { "@type": "City", name: "Пинск" }
    ],
    knowsLanguage: ["ru", "en"]
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.ru.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <html lang="ru">
      <body className={`${montserrat.variable} bg-linen text-charcoal antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
