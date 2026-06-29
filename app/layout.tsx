import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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
    "модульные дома", "модульные дома Беларусь", "модульный дом под ключ",
    "каркасные дома Беларусь", "модульные дома Брест", "дом под ключ",
    "модульные бани", "баня под ключ", "дачный дом", "быстровозводимые дома",
    "производство модульных домов", "Modul S", "modular houses Belarus"
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
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/apple-icon.png"
  },
  other: {
    "theme-color": "#1f3024",
    "format-detection": "telephone=yes"
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
    url: "https://modulsdom-brest.by",
    logo: "https://modulsdom-brest.by/icon.svg",
    image: "https://modulsdom-brest.by/site-preview-ru.jpg",
    telephone: "+375445702727",
    description: "Производство модульных каркасных домов и бань под ключ в Беларуси.",
    address: { "@type": "PostalAddress", addressLocality: "Брест", addressCountry: "BY" },
    areaServed: { "@type": "Country", name: "Беларусь" },
    knowsLanguage: ["ru", "en"]
  };

  return (
    <html lang="ru">
      <body className={`${montserrat.variable} bg-linen text-charcoal antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
