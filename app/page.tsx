"use client";

import { useState } from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Calculator from "./components/calculator/index";
import BasicCalculators from "./components/basic-calculators/index";
import Funnel1Calculator from "./components/funnel1/index";
import Funnel2Calculator from "./components/funnel2/index";
import EducationalContent from "./components/educational-content";
import Footer from "./components/footer";
import { AppSidebar } from "./components/AppSidebar";
import { useLanguage } from "@/lib/i18n/context";

type Section = "roa" | "basic" | "funnel1" | "funnel2";

export default function Home() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState<Section>("roa");

    return (
        <>
            <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold leading-tight">
                            {t.tabs[activeSection].title}
                        </h1>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                            {t.tabs[activeSection].description}
                        </p>
                    </div>
                </header>

                <main className="flex-1 overflow-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        {/* Hidden not unmounted — preserves calculator state when switching */}
                        <div hidden={activeSection !== "roa"}>
                            <Calculator />
                            <EducationalContent />
                        </div>
                        <div hidden={activeSection !== "basic"}>
                            <BasicCalculators />
                        </div>
                        <div hidden={activeSection !== "funnel1"}>
                            <Funnel1Calculator />
                        </div>
                        <div hidden={activeSection !== "funnel2"}>
                            <Funnel2Calculator />
                        </div>
                    </div>
                </main>

                <Footer />
            </SidebarInset>
        </>
    );
}
