"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FunnelCurrencyField,
    FunnelPercentField,
} from "@/app/components/funnel-budget/funnel-input-fields";
import type { Translations } from "@/lib/i18n/types";

type Funnel1Copy = Translations["funnel1"];

interface InputsSectionProps {
    translations: Funnel1Copy;
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
                    id="funnel1-target-sales"
                    label={t.targetSales}
                    tooltip={t.targetSalesTooltip}
                    value={targetSales}
                    onChange={onTargetSalesChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel1-aov"
                    label={t.averageOrderValue}
                    tooltip={t.averageOrderValueTooltip}
                    value={aov}
                    onChange={onAovChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel1-conversion-rate"
                    label={t.conversionRate}
                    tooltip={t.conversionRateTooltip}
                    value={conversionRate}
                    onChange={onConversionRateChange}
                    placeholder="20"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelCurrencyField
                    id="funnel1-cogs"
                    label={t.cogs}
                    tooltip={t.cogsTooltip}
                    value={cogs}
                    onChange={onCogsChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel1-marketing-budget-pct"
                    label={t.marketingBudgetPercent}
                    tooltip={t.marketingBudgetPercentTooltip}
                    value={marketingBudgetPercent}
                    onChange={onMarketingBudgetPercentChange}
                    placeholder="50"
                    percentSymbol={t.percentSuffix}
                />
            </CardContent>
        </Card>
    );
}
