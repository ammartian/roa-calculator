"use client";

import { useState } from "react";
import {
    Calculator,
    Check,
    Globe,
    Package,
    Layers,
    TrendingUp,
    Users,
    LayoutGrid,
    Presentation,
    Tv,
    ShoppingCart,
    Wrench,
    BookOpen,
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
import { Separator } from "@/components/ui/separator";
import { BusinessTypeSwitcher } from "@/components/ui/business-type-switcher";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useBusinessType } from "@/lib/i18n/business-type-context";
import { useLanguage } from "@/lib/i18n/context";
import { useT } from "@/lib/i18n/useT";
import type { BusinessType, Language } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type Section =
    | "roa"
    | "basic"
    | "funnel1"
    | "funnel2"
    | "funnel3"
    | "funnel4"
    | "funnel5"
    | "funnel6"
    | "funnel7";

interface AppSidebarProps {
    activeSection: Section;
    onSectionChange: (section: Section) => void;
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
    const t = useT();
    const { language, setLanguage } = useLanguage();
    const { businessType, setBusinessType } = useBusinessType();
    const [languagePopoverOpen, setLanguagePopoverOpen] = useState(false);
    const [businessTypePopoverOpen, setBusinessTypePopoverOpen] = useState(false);

    function handleSelectLanguage(lang: Language): void {
        setLanguage(lang);
        setLanguagePopoverOpen(false);
    }

    function handleSelectBusinessType(value: BusinessType): void {
        setBusinessType(value);
        setBusinessTypePopoverOpen(false);
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
        {
            id: "funnel5" as Section,
            label: t.tabs.funnel5.title,
            icon: ShoppingCart,
        },
        {
            id: "funnel6" as Section,
            label: t.tabs.funnel6.title,
            icon: Wrench,
        },
        {
            id: "funnel7" as Section,
            label: t.tabs.funnel7.title,
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="gap-0 pb-0">
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
                                <span className="truncate text-xs text-muted-foreground">
                                    Lima Angka
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Above business type (collapsed + expanded) — symmetric vertical rhythm */}
                <Separator className="my-2" />

                {/* Collapsed: business type as icon + popover */}
                <SidebarMenu>
                    <SidebarMenuItem className="hidden group-data-[state=collapsed]:flex">
                        <Popover
                            open={businessTypePopoverOpen}
                            onOpenChange={setBusinessTypePopoverOpen}
                        >
                            <PopoverTrigger asChild>
                                <SidebarMenuButton
                                    type="button"
                                    tooltip={t.businessType.label}
                                >
                                    <Package />
                                    <span className="sr-only">{t.businessType.label}</span>
                                </SidebarMenuButton>
                            </PopoverTrigger>
                            <PopoverContent
                                side="right"
                                align="start"
                                className="w-48 p-1"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectBusinessType("product")}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                                            businessType === "product" && "bg-accent/60"
                                        )}
                                    >
                                        <span>{t.businessType.product}</span>
                                        <Check
                                            className={cn(
                                                "size-4 shrink-0",
                                                businessType !== "product" && "invisible"
                                            )}
                                            aria-hidden
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectBusinessType("service")}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                                            businessType === "service" && "bg-accent/60"
                                        )}
                                    >
                                        <span>{t.businessType.service}</span>
                                        <Check
                                            className={cn(
                                                "size-4 shrink-0",
                                                businessType !== "service" && "invisible"
                                            )}
                                            aria-hidden
                                        />
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Expanded: business type label + dropdown */}
                <div className="group-data-[state=collapsed]:hidden space-y-2 pb-3">
                    <div className="flex shrink-0 items-center text-xs font-medium text-sidebar-foreground/70">
                        {t.businessType.label}
                    </div>
                    <BusinessTypeSwitcher
                        showLeadingIcon={false}
                        className="w-full"
                        selectTriggerClassName="min-w-0 flex-1 w-full"
                    />
                </div>

                <Separator className="my-2" />
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
                        <div className="flex w-full items-center justify-start px-2 py-2">
                            <LanguageSwitcher fullWidth />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
