"use client";

import { useLanguage } from "@/lib/i18n/context";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
    /** Use full width for sidebar-style layout (icon + select aligned left). */
    fullWidth?: boolean;
    className?: string;
}

export function LanguageSwitcher({ fullWidth = false, className }: LanguageSwitcherProps) {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className={cn("flex w-full items-center gap-2", className)}>
            <Globe className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "ms")}>
                <SelectTrigger
                    className={cn(fullWidth ? "min-w-0 flex-1" : "w-[160px]")}
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">{t.common.english}</SelectItem>
                    <SelectItem value="ms">{t.common.malay}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
