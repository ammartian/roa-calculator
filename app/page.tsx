"use client";

import Calculator from "./components/calculator/index";
import EducationalContent from "./components/educational-content";
import Footer from "./components/footer";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/i18n/context";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.page.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t.page.subtitle}
          </p>
        </div>
        <Calculator />
        <EducationalContent />
        <Footer />
      </div>
    </main>
  );
}
