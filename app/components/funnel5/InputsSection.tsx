"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FunnelCurrencyField,
    FunnelNumberField,
    FunnelPercentField,
} from "@/app/components/funnel-budget/funnel-input-fields";
import type { Translations } from "@/lib/i18n/types";

type Funnel5Copy = Translations["funnel5"];

interface InputsSectionProps {
    translations: Funnel5Copy;
    targetSales: string;
    aov: string;
    grossProfitMarginPerProduct: string;
    cogs: string;
    addToCartRate: string;
    conversionRate: string;
    repurchaseValue: string;
    repurchaseFrequency: string;
    marketingBudgetPercent: string;
    onTargetSalesChange: (value: string) => void;
    onAovChange: (value: string) => void;
    onGrossProfitMarginPerProductChange: (value: string) => void;
    onCogsChange: (value: string) => void;
    onAddToCartRateChange: (value: string) => void;
    onConversionRateChange: (value: string) => void;
    onRepurchaseValueChange: (value: string) => void;
    onRepurchaseFrequencyChange: (value: string) => void;
    onMarketingBudgetPercentChange: (value: string) => void;
}

export function InputsSection({
    translations: t,
    targetSales,
    aov,
    grossProfitMarginPerProduct,
    cogs,
    addToCartRate,
    conversionRate,
    repurchaseValue,
    repurchaseFrequency,
    marketingBudgetPercent,
    onTargetSalesChange,
    onAovChange,
    onGrossProfitMarginPerProductChange,
    onCogsChange,
    onAddToCartRateChange,
    onConversionRateChange,
    onRepurchaseValueChange,
    onRepurchaseFrequencyChange,
    onMarketingBudgetPercentChange,
}: InputsSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{t.inputsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                <FunnelCurrencyField
                    id="funnel5-target-sales"
                    label={t.targetSales}
                    tooltip={t.targetSalesTooltip}
                    value={targetSales}
                    onChange={onTargetSalesChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel5-aov"
                    label={t.averageOrderValue}
                    tooltip={t.averageOrderValueTooltip}
                    value={aov}
                    onChange={onAovChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel5-gross-profit-margin"
                    label={t.grossProfitMarginPerProduct}
                    tooltip={t.grossProfitMarginPerProductTooltip}
                    value={grossProfitMarginPerProduct}
                    onChange={onGrossProfitMarginPerProductChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel5-cogs"
                    label={t.cogs}
                    tooltip={t.cogsTooltip}
                    value={cogs}
                    onChange={onCogsChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel5-add-to-cart-rate"
                    label={t.addToCartRate}
                    tooltip={t.addToCartRateTooltip}
                    value={addToCartRate}
                    onChange={onAddToCartRateChange}
                    placeholder="6.8"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelPercentField
                    id="funnel5-conversion-rate"
                    label={t.conversionRateProductPage}
                    tooltip={t.conversionRateProductPageTooltip}
                    value={conversionRate}
                    onChange={onConversionRateChange}
                    placeholder="4"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelCurrencyField
                    id="funnel5-repurchase-value"
                    label={t.repurchaseValue}
                    tooltip={t.repurchaseValueTooltip}
                    value={repurchaseValue}
                    onChange={onRepurchaseValueChange}
                    placeholder="0.00"
                />
                <FunnelNumberField
                    id="funnel5-repurchase-frequency"
                    label={t.repurchaseFrequency}
                    tooltip={t.repurchaseFrequencyTooltip}
                    value={repurchaseFrequency}
                    onChange={onRepurchaseFrequencyChange}
                    placeholder="4"
                />
                <FunnelPercentField
                    id="funnel5-marketing-budget-pct"
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
