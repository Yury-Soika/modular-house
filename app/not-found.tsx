import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Страница не найдена | Modul S",
  description: "Запрошенная страница не существует. Перейдите в каталог модульных домов и бань Modul S.",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-forest-950 py-20 text-white">
      <div className="section-shell">
        <p className="eyebrow text-sand">Ошибка 404</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">Страница не найдена</h1>
        <p className="mt-5 max-w-xl leading-7 text-white/70">Возможно, адрес изменился или был введён неверно. Все актуальные проекты доступны в каталоге.</p>
        <Link className="focus-ring mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-sand px-5 text-sm font-semibold text-forest-950" href="/#projects"><ArrowLeft size={17} /> Вернуться к проектам</Link>
      </div>
    </main>
  );
}
