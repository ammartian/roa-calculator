"use client";

import { useState } from "react";
import {
    Calculator,
    Check,
    Globe,
    Layers,
    TrendingUp,
    Users,
    LayoutGrid,
    Presentation,
    Tv,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/i18n/context";
import type { Language } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type Section = "roa" | "basic" | "funnel1" | "funnel2" | "funnel3" | "funnel4";

interface AppSidebarProps {
    activeSection: Section;
    onSectionChange: (section: Section) => void;
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
    const { t, language, setLanguage } = useLanguage();
    const [languagePopoverOpen, setLanguagePopoverOpen] = useState(false);

    function handleSelectLanguage(lang: Language): void {
        setLanguage(lang);
        setLanguagePopoverOpen(false);
    }

    const navItems = [
        {
            id: "roa" as Section,
            label: t.tabs.roa.title,
            icon: LayoutGrid,
        },
        {
            id: "basic" as Section,
            label: t.tabs.basic.title,
            icon: Layers,
        },
        {
            id: "funnel1" as Section,
            label: t.tabs.funnel1.title,
            icon: TrendingUp,
        },
        {
            id: "funnel2" as Section,
            label: t.tabs.funnel2.title,
            icon: Users,
        },
        {
            id: "funnel3" as Section,
            label: t.tabs.funnel3.title,
            icon: Presentation,
        },
        {
            id: "funnel4" as Section,
            label: t.tabs.funnel4.title,
            icon: Tv,
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="pointer-events-none"
                            tooltip="ROA Calculator"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                                <Calculator className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">ROA Calculator</span>
                                <span className="truncate text-xs text-muted-foreground">Lima Angka</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={activeSection === item.id}
                                        onClick={() => onSectionChange(item.id)}
                                        tooltip={item.label}
                                    >
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className="hidden group-data-[state=collapsed]:flex">
                        <Popover
                            open={languagePopoverOpen}
                            onOpenChange={setLanguagePopoverOpen}
                        >
                            <PopoverTrigger asChild>
                                <SidebarMenuButton
                                    type="button"
                                    tooltip={t.common.language}
                                >
                                    <Globe />
                                    <span className="sr-only">{t.common.language}</span>
                                </SidebarMenuButton>
                            </PopoverTrigger>
                            <PopoverContent
                                side="right"
                                align="end"
                                className="w-44 p-1"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectLanguage("en")}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                                            language === "en" && "bg-accent/60"
                                        )}
                                    >
                                        <span>{t.common.english}</span>
                                        <Check
                                            className={cn(
                                                "size-4 shrink-0",
                                                language !== "en" && "invisible"
                                            )}
                                            aria-hidden
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectLanguage("ms")}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                                            language === "ms" && "bg-accent/60"
                                        )}
                                    >
                                        <span>{t.common.malay}</span>
                                        <Check
                                            className={cn(
                                                "size-4 shrink-0",
                                                language !== "ms" && "invisible"
                                            )}
                                            aria-hidden
                                        />
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="flex group-data-[state=collapsed]:hidden">
                        <div className="flex w-full items-center justify-center px-2 py-1">
                            <LanguageSwitcher />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
