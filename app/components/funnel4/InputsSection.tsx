"use client";

import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormattedInput } from "@/components/ui/formatted-input";
import type { Translations } from "@/lib/i18n/types";

type Funnel4Copy = Translations["funnel4"];

interface InputsSectionProps {
    translations: Funnel4Copy;
    targetSales: string;
    packagePrice: string;
    ticketPrice: string;
    closingRate: string;
    showUpRate: string;
    cogs: string;
    marketingBudgetPercent: string;
    onTargetSalesChange: (value: string) => void;
    onPackagePriceChange: (value: string) => void;
    onTicketPriceChange: (value: string) => void;
    onClosingRateChange: (value: string) => void;
    onShowUpRateChange: (value: string) => void;
    onCogsChange: (value: string) => void;
    onMarketingBudgetPercentChange: (value: string) => void;
}

function FieldLabel({
    label,
    tooltip,
}: {
    label: string;
    tooltip: string;
}) {
    return (
        <div className="flex items-center gap-1.5">
            <Label className="font-medium">{label}</Label>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={tooltip}
                    >
                        <HelpCircle className="size-4 shrink-0" aria-hidden />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

function CurrencyField({
    label,
    tooltip,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    tooltip: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}) {
    return (
        <div className="space-y-2">
            <FieldLabel label={label} tooltip={tooltip} />
            <div className="flex items-center gap-2 rounded-md border-2 border-blue-500/55 bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                <span className="text-muted-foreground text-sm font-medium">
                    RM
                </span>
                <FormattedInput
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                    allowDecimals
                    allowNegative={false}
                />
            </div>
        </div>
    );
}

function PercentField({
    label,
    tooltip,
    value,
    onChange,
    placeholder,
    suffix,
}: {
    label: string;
    tooltip: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    suffix: string;
}) {
    return (
        <div className="space-y-2">
            <FieldLabel label={label} tooltip={tooltip} />
            <div className="relative rounded-md border-2 border-blue-500/55 bg-background">
                <FormattedInput
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="border-0 bg-transparent pr-10 shadow-none focus-visible:ring-0"
                    allowDecimals
                    allowNegative={false}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {suffix}
                </span>
            </div>
        </div>
    );
}

export function InputsSection({
    translations: t,
    targetSales,
    packagePrice,
    ticketPrice,
    closingRate,
    showUpRate,
    cogs,
    marketingBudgetPercent,
    onTargetSalesChange,
    onPackagePriceChange,
    onTicketPriceChange,
    onClosingRateChange,
    onShowUpRateChange,
    onCogsChange,
    onMarketingBudgetPercentChange,
}: InputsSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{t.inputsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                <CurrencyField
                    label={t.targetSales}
                    tooltip={t.targetSalesTooltip}
                    value={targetSales}
                    onChange={onTargetSalesChange}
                    placeholder="0.00"
                />
                <CurrencyField
                    label={t.packagePrice}
                    tooltip={t.packagePriceTooltip}
                    value={packagePrice}
                    onChange={onPackagePriceChange}
                    placeholder="0.00"
                />
                <CurrencyField
                    label={t.ticketPrice}
                    tooltip={t.ticketPriceTooltip}
                    value={ticketPrice}
                    onChange={onTicketPriceChange}
                    placeholder="0"
                />
                <PercentField
                    label={t.closingRate}
                    tooltip={t.closingRateTooltip}
                    value={closingRate}
                    onChange={onClosingRateChange}
                    placeholder="10"
                    suffix={t.percentSuffix}
                />
                <PercentField
                    label={t.showUpRate}
                    tooltip={t.showUpRateTooltip}
                    value={showUpRate}
                    onChange={onShowUpRateChange}
                    placeholder="40"
                    suffix={t.percentSuffix}
                />
                <CurrencyField
                    label={t.cogs}
                    tooltip={t.cogsTooltip}
                    value={cogs}
                    onChange={onCogsChange}
                    placeholder="0.00"
                />
                <PercentField
                    label={t.marketingBudgetPercent}
                    tooltip={t.marketingBudgetPercentTooltip}
                    value={marketingBudgetPercent}
                    onChange={onMarketingBudgetPercentChange}
                    placeholder="25"
                    suffix={t.percentSuffix}
                />
            </CardContent>
        </Card>
    );
}
