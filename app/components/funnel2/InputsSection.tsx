"use client";

import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FunnelCurrencyField,
    FunnelNumberField,
    FunnelPercentField,
} from "@/app/components/funnel-budget/funnel-input-fields";
import type { Translations } from "@/lib/i18n/types";

type Funnel2Copy = Translations["funnel2"];

interface InputsSectionProps {
    translations: Funnel2Copy;
    registrationFee: string;
    targetAgents: string;
    conversionRate: string;
    activeAgentPercent: string;
    restockValue: string;
    restockFrequency: string;
    marketingBudgetPercent: string;
    onRegistrationFeeChange: (value: string) => void;
    onTargetAgentsChange: (value: string) => void;
    onConversionRateChange: (value: string) => void;
    onActiveAgentPercentChange: (value: string) => void;
    onRestockValueChange: (value: string) => void;
    onRestockFrequencyChange: (value: string) => void;
    onMarketingBudgetPercentChange: (value: string) => void;
}

export function InputsSection({
    translations: t,
    registrationFee,
    targetAgents,
    conversionRate,
    activeAgentPercent,
    restockValue,
    restockFrequency,
    marketingBudgetPercent,
    onRegistrationFeeChange,
    onTargetAgentsChange,
    onConversionRateChange,
    onActiveAgentPercentChange,
    onRestockValueChange,
    onRestockFrequencyChange,
    onMarketingBudgetPercentChange,
}: InputsSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{t.inputsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                <FunnelCurrencyField
                    id="funnel2-registration-fee"
                    label={t.registrationFee}
                    tooltip={t.registrationFeeTooltip}
                    value={registrationFee}
                    onChange={onRegistrationFeeChange}
                    placeholder="0.00"
                />
                <FunnelNumberField
                    id="funnel2-target-agents"
                    label={t.targetAgents}
                    tooltip={t.targetAgentsTooltip}
                    value={targetAgents}
                    onChange={onTargetAgentsChange}
                    placeholder="100"
                    icon={Users}
                />
                <FunnelPercentField
                    id="funnel2-conversion-rate"
                    label={t.conversionRate}
                    tooltip={t.conversionRateTooltip}
                    value={conversionRate}
                    onChange={onConversionRateChange}
                    placeholder="20"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelPercentField
                    id="funnel2-active-agent-pct"
                    label={t.activeAgentPercent}
                    tooltip={t.activeAgentPercentTooltip}
                    value={activeAgentPercent}
                    onChange={onActiveAgentPercentChange}
                    placeholder="20"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelCurrencyField
                    id="funnel2-restock-value"
                    label={t.restockValue}
                    tooltip={t.restockValueTooltip}
                    value={restockValue}
                    onChange={onRestockValueChange}
                    placeholder="0.00"
                />
                <FunnelNumberField
                    id="funnel2-restock-frequency"
                    label={t.restockFrequency}
                    tooltip={t.restockFrequencyTooltip}
                    value={restockFrequency}
                    onChange={onRestockFrequencyChange}
                    placeholder="1"
                />
                <FunnelPercentField
                    id="funnel2-marketing-budget-pct"
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
