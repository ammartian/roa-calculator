"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FunnelCurrencyField,
    FunnelPercentField,
} from "@/app/components/funnel-budget/funnel-input-fields";
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
                <FunnelCurrencyField
                    id="funnel4-target-sales"
                    label={t.targetSales}
                    tooltip={t.targetSalesTooltip}
                    value={targetSales}
                    onChange={onTargetSalesChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel4-package-price"
                    label={t.packagePrice}
                    tooltip={t.packagePriceTooltip}
                    value={packagePrice}
                    onChange={onPackagePriceChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel4-ticket-price"
                    label={t.ticketPrice}
                    tooltip={t.ticketPriceTooltip}
                    value={ticketPrice}
                    onChange={onTicketPriceChange}
                    placeholder="0"
                />
                <FunnelPercentField
                    id="funnel4-closing-rate"
                    label={t.closingRate}
                    tooltip={t.closingRateTooltip}
                    value={closingRate}
                    onChange={onClosingRateChange}
                    placeholder="10"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelPercentField
                    id="funnel4-show-up-rate"
                    label={t.showUpRate}
                    tooltip={t.showUpRateTooltip}
                    value={showUpRate}
                    onChange={onShowUpRateChange}
                    placeholder="40"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelCurrencyField
                    id="funnel4-cogs"
                    label={t.cogs}
                    tooltip={t.cogsTooltip}
                    value={cogs}
                    onChange={onCogsChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel4-marketing-budget-pct"
                    label={t.marketingBudgetPercent}
                    tooltip={t.marketingBudgetPercentTooltip}
                    value={marketingBudgetPercent}
                    onChange={onMarketingBudgetPercentChange}
                    placeholder="25"
                    percentSymbol={t.percentSuffix}
                />
            </CardContent>
        </Card>
    );
}
