import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { YandexMetrika } from "./_components/YandexMetrika";
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
    "модульные дома Беларусь",
    "модульные дома под ключ",
    "проекты модульных домов",
    "модульные дома Брест",
    "модульные бани Беларусь",
    "производство модульных домов",
    "доставка и монтаж по Беларуси",
    "Modul S"
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
    "geo.position": "52.064675;23.716577",
    ICBM: "52.064675, 23.716577"
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
    locale: "ru_BY",
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
    logo: "https://modulsdom-brest.by/icon-512.png",
    image: "https://modulsdom-brest.by/site-preview-ru.jpg",
    telephone: "+375445702727",
    email: "Modulsdom@mail.ru",
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
      latitude: 52.064675,
      longitude: 23.716577
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+375445702727",
      email: "Modulsdom@mail.ru",
      contactType: "customer service",
      areaServed: "BY",
      availableLanguage: ["Russian"]
    },
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
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://modulsdom-brest.by/#website",
    url: "https://modulsdom-brest.by/",
    name: "Modul S",
    inLanguage: "ru-BY",
    publisher: { "@id": "https://modulsdom-brest.by/#organization" }
  };
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} bg-linen text-charcoal antialiased`}>
        {children}
        <YandexMetrika />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
