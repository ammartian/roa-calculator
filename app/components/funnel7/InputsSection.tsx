"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FunnelCurrencyField,
    FunnelPercentField,
} from "@/app/components/funnel-budget/funnel-input-fields";
import type { Translations } from "@/lib/i18n/types";

type Funnel7Copy = Translations["funnel7"];

interface InputsSectionProps {
    translations: Funnel7Copy;
    targetSales: string;
    aov: string;
    conversionRate: string;
    cogs: string;
    marketingBudgetPercent: string;
    onTargetSalesChange: (value: string) => void;
    onAovChange: (value: string) => void;
    onConversionRateChange: (value: string) => void;
    onCogsChange: (value: string) => void;
    onMarketingBudgetPercentChange: (value: string) => void;
}

export function InputsSection({
    translations: t,
    targetSales,
    aov,
    conversionRate,
    cogs,
    marketingBudgetPercent,
    onTargetSalesChange,
    onAovChange,
    onConversionRateChange,
    onCogsChange,
    onMarketingBudgetPercentChange,
}: InputsSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{t.inputsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                <FunnelCurrencyField
                    id="funnel7-target-sales"
                    label={t.targetSales}
                    tooltip={t.targetSalesTooltip}
                    value={targetSales}
                    onChange={onTargetSalesChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel7-aov"
                    label={t.averageOrderValue}
                    tooltip={t.averageOrderValueTooltip}
                    value={aov}
                    onChange={onAovChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel7-conversion-rate"
                    label={t.conversionRateSalesPage}
                    tooltip={t.conversionRateSalesPageTooltip}
                    value={conversionRate}
                    onChange={onConversionRateChange}
                    placeholder="20"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelCurrencyField
                    id="funnel7-cogs"
                    label={t.cogs}
                    tooltip={t.cogsTooltip}
                    value={cogs}
                    onChange={onCogsChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel7-marketing-budget-pct"
                    label={t.marketingBudgetPercent}
                    tooltip={t.marketingBudgetPercentTooltip}
                    value={marketingBudgetPercent}
                    onChange={onMarketingBudgetPercentChange}
                    placeholder="30"
                    percentSymbol={t.percentSuffix}
                />
            </CardContent>
        </Card>
    );
}
