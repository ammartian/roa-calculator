"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FunnelCurrencyField,
    FunnelPercentField,
} from "@/app/components/funnel-budget/funnel-input-fields";
import type { Translations } from "@/lib/i18n/types";

type Funnel6Copy = Translations["funnel6"];

interface InputsSectionProps {
    translations: Funnel6Copy;
    targetSales: string;
    aov: string;
    leadsToAppointmentRate: string;
    appointmentToCustomerRate: string;
    cogs: string;
    marketingBudgetPercent: string;
    onTargetSalesChange: (value: string) => void;
    onAovChange: (value: string) => void;
    onLeadsToAppointmentRateChange: (value: string) => void;
    onAppointmentToCustomerRateChange: (value: string) => void;
    onCogsChange: (value: string) => void;
    onMarketingBudgetPercentChange: (value: string) => void;
}

export function InputsSection({
    translations: t,
    targetSales,
    aov,
    leadsToAppointmentRate,
    appointmentToCustomerRate,
    cogs,
    marketingBudgetPercent,
    onTargetSalesChange,
    onAovChange,
    onLeadsToAppointmentRateChange,
    onAppointmentToCustomerRateChange,
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
                    id="funnel6-target-sales"
                    label={t.targetSales}
                    tooltip={t.targetSalesTooltip}
                    value={targetSales}
                    onChange={onTargetSalesChange}
                    placeholder="0.00"
                />
                <FunnelCurrencyField
                    id="funnel6-aov"
                    label={t.averageOrderValue}
                    tooltip={t.averageOrderValueTooltip}
                    value={aov}
                    onChange={onAovChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel6-leads-to-appointment"
                    label={t.leadsToAppointmentRate}
                    tooltip={t.leadsToAppointmentRateTooltip}
                    value={leadsToAppointmentRate}
                    onChange={onLeadsToAppointmentRateChange}
                    placeholder="20"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelPercentField
                    id="funnel6-appointment-to-customer"
                    label={t.appointmentToCustomerRate}
                    tooltip={t.appointmentToCustomerRateTooltip}
                    value={appointmentToCustomerRate}
                    onChange={onAppointmentToCustomerRateChange}
                    placeholder="50"
                    percentSymbol={t.percentSuffix}
                />
                <FunnelCurrencyField
                    id="funnel6-cogs"
                    label={t.cogs}
                    tooltip={t.cogsTooltip}
                    value={cogs}
                    onChange={onCogsChange}
                    placeholder="0.00"
                />
                <FunnelPercentField
                    id="funnel6-marketing-budget-pct"
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
