import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://modular-house.by"),
  title: "Modul S — Modular Timber Houses & Baths in Belarus",
  description:
    "Turnkey modular timber-frame houses and baths from consultation and design to manufacturing, delivery, and installation across Belarus.",
  openGraph: {
    title: "Modul S — Modular Timber Houses & Baths",
    description:
      "Design, manufacturing, delivery, and installation of modular houses and baths from Brest, Belarus.",
    images: ["/house-photos/IMG_0640.JPG"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} bg-linen text-charcoal antialiased`}>
        {children}
      </body>
    </html>
  );
}
