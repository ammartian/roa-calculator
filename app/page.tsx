"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calculator from "./components/calculator/index";
import BasicCalculators from "./components/basic-calculators/index";
import EducationalContent from "./components/educational-content";
import Footer from "./components/footer";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/i18n/context";

export default function Home() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("roa");

    return (
        <main className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-end mb-4">
                    <LanguageSwitcher />
                </div>
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        {t.tabs[activeTab as keyof typeof t.tabs].title}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {t.tabs[activeTab as keyof typeof t.tabs].description}
                    </p>
                </div>

                <Tabs defaultValue="roa" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                        <TabsTrigger value="roa" className="text-xs md:text-sm">{t.tabs.roa.title}</TabsTrigger>
                        <TabsTrigger value="basic" className="text-xs md:text-sm">{t.tabs.basic.title}</TabsTrigger>
                    </TabsList>

                    {/* forceMount to persist data when switching tabs */}
                    <TabsContent value="roa" forceMount className="mt-0 hidden data-[state=active]:block" >
                        <Calculator />
                        <EducationalContent />
                    </TabsContent>

                    <TabsContent value="basic" forceMount className="mt-0 hidden data-[state=active]:block">
                        <BasicCalculators />
                    </TabsContent>
                </Tabs>

                <Footer />
            </div>
        </main>
    );
}
