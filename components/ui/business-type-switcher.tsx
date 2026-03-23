"use client";

import { Package } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useBusinessType } from "@/lib/i18n/business-type-context";
import { useLanguage } from "@/lib/i18n/context";
import type { BusinessType } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

interface BusinessTypeSwitcherProps {
    /** When false, only the select is shown (e.g. when a section title is shown above). */
    showLeadingIcon?: boolean;
    className?: string;
    selectTriggerClassName?: string;
}

export function BusinessTypeSwitcher({
    showLeadingIcon = true,
    className,
    selectTriggerClassName,
}: BusinessTypeSwitcherProps) {
    const { businessType, setBusinessType } = useBusinessType();
    const { t } = useLanguage();

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {showLeadingIcon ? (
                <Package className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            ) : null}
            <Select
                value={businessType}
                onValueChange={(value) => setBusinessType(value as BusinessType)}
            >
                <SelectTrigger
                    className={cn("w-[160px]", selectTriggerClassName)}
                    aria-label={t.businessType.label}
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="product">{t.businessType.product}</SelectItem>
                    <SelectItem value="service">{t.businessType.service}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
