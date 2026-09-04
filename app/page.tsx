import type { Metadata } from "next";
import HomePageClient from "./_components/HomePageClient";
import { getHomeContent, getSiteSettings } from "@/cms/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.defaultMetaTitle,
    description: settings.defaultMetaDescription,
    alternates: { canonical: "/" },
    openGraph: { title: settings.defaultMetaTitle, description: settings.defaultMetaDescription, images: [settings.socialImage] },
    twitter: { card: "summary_large_image", title: settings.defaultMetaTitle, description: settings.defaultMetaDescription, images: [settings.socialImage] }
  };
}

export default async function HomePage() {
  const [cms, settings] = await Promise.all([getHomeContent(), getSiteSettings()]);
  return <HomePageClient initialContent={cms.content} heroImage={cms.heroImage} completedContent={cms.completedContent} settings={settings} />;
}
