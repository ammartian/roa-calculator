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

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "ms")}>
                <SelectTrigger className="w-[160px]">
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
