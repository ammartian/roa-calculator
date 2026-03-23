"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FunnelCurrencyField,
    FunnelPercentField,
} from "@/app/components/funnel-budget/funnel-input-fields";
import type { Translations } from "@/lib/i18n/types";

type Funnel3Copy = Translations["funnel3"];

interface InputsSectionProps {
    translations: Funnel3Copy;
    targetMonthlyCommission: string;
    commissionPerNewClient: string;
    showUpRate: string;
    closingRateWebinar: string;
    cogs: string;
    marketingBudgetPercent: string;
    onTargetMonthlyCommissionChange: (value: string) => void;
    onCommissionPerNewClientChange: (value: string) => void;
    onShowUpRateChange: (value: string) => void;
    onClosingRateWebinarChange: (value: string) => void;
    onCogsChange: (value: string) => void;
    onMarketingBudgetPercentChange: (value: string) => void;
}

export function InputsSection({
    translations: t,
    targetMonthlyCommission,
    commissionPerNewClient,
    showUpRate,
    closingRateWebinar,
    cogs,
    marketingBudgetPercent,
    onTargetMonthlyCommissionChange,
    onCommissionPerNewClientChange,
    onShowUpRateChange,
    onClosingRateWebinarChange,
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
                    id="funnel3-target-monthly-commission"
                    label={t.targetMonthlyCommission}
                    tooltip={t.targetMonthlyCommissionTooltip}
                    value={targetMonthlyCommission}
                    onChange={onTargetMonthlyCommissionChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel3-commission-per-client"
                    label={t.commissionPerNewClient}
                    tooltip={t.commissionPerNewClientTooltip}
                    value={commissionPerNewClient}
                    onChange={onCommissionPerNewClientChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel3-show-up-rate"
                    label={t.showUpRate}
                    tooltip={t.showUpRateTooltip}
                    value={showUpRate}
                    onChange={onShowUpRateChange}
                    placeholder="25"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelPercentField
                    id="funnel3-closing-rate-webinar"
                    label={t.closingRateWebinar}
                    tooltip={t.closingRateWebinarTooltip}
                    value={closingRateWebinar}
                    onChange={onClosingRateWebinarChange}
                    placeholder="20"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelCurrencyField
                    id="funnel3-cogs"
                    label={t.cogs}
                    tooltip={t.cogsTooltip}
                    value={cogs}
                    onChange={onCogsChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel3-marketing-budget-pct"
                    label={t.marketingBudgetPercent}
                    tooltip={t.marketingBudgetPercentTooltip}
                    value={marketingBudgetPercent}
                    onChange={onMarketingBudgetPercentChange}
                    placeholder="20"
                    percentSymbol={t.percentSuffix}
                />
            </CardContent>
        </Card>
    );
}
