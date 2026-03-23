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
                <div className="space-y-2">
                    <FieldLabel
                        label={t.registrationFee}
                        tooltip={t.registrationFeeTooltip}
                    />
                    <div className="flex items-center gap-2 rounded-md border-2 border-blue-500/55 bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                        <span className="text-muted-foreground text-sm font-medium">
                            RM
                        </span>
                        <FormattedInput
                            value={registrationFee}
                            onChange={onRegistrationFeeChange}
                            placeholder="0.00"
                            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                            allowDecimals
                            allowNegative={false}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel
                        label={t.targetAgents}
                        tooltip={t.targetAgentsTooltip}
                    />
                    <div className="rounded-md border-2 border-blue-500/55 bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                        <FormattedInput
                            value={targetAgents}
                            onChange={onTargetAgentsChange}
                            placeholder="100"
                            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                            allowDecimals
                            allowNegative={false}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel
                        label={t.conversionRate}
                        tooltip={t.conversionRateTooltip}
                    />
                    <div className="relative rounded-md border-2 border-blue-500/55 bg-background">
                        <FormattedInput
                            value={conversionRate}
                            onChange={onConversionRateChange}
                            placeholder="20"
                            className="border-0 bg-transparent pr-10 shadow-none focus-visible:ring-0"
                            allowDecimals
                            allowNegative={false}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            {t.percentSuffix}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel
                        label={t.activeAgentPercent}
                        tooltip={t.activeAgentPercentTooltip}
                    />
                    <div className="relative rounded-md border-2 border-blue-500/55 bg-background">
                        <FormattedInput
                            value={activeAgentPercent}
                            onChange={onActiveAgentPercentChange}
                            placeholder="20"
                            className="border-0 bg-transparent pr-10 shadow-none focus-visible:ring-0"
                            allowDecimals
                            allowNegative={false}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            {t.percentSuffix}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel
                        label={t.restockValue}
                        tooltip={t.restockValueTooltip}
                    />
                    <div className="flex items-center gap-2 rounded-md border-2 border-blue-500/55 bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                        <span className="text-muted-foreground text-sm font-medium">
                            RM
                        </span>
                        <FormattedInput
                            value={restockValue}
                            onChange={onRestockValueChange}
                            placeholder="0.00"
                            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                            allowDecimals
                            allowNegative={false}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel
                        label={t.restockFrequency}
                        tooltip={t.restockFrequencyTooltip}
                    />
                    <div className="rounded-md border-2 border-blue-500/55 bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                        <FormattedInput
                            value={restockFrequency}
                            onChange={onRestockFrequencyChange}
                            placeholder="1"
                            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                            allowDecimals
                            allowNegative={false}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel
                        label={t.marketingBudgetPercent}
                        tooltip={t.marketingBudgetPercentTooltip}
                    />
                    <div className="relative rounded-md border-2 border-blue-500/55 bg-background">
                        <FormattedInput
                            value={marketingBudgetPercent}
                            onChange={onMarketingBudgetPercentChange}
                            placeholder="50"
                            className="border-0 bg-transparent pr-10 shadow-none focus-visible:ring-0"
                            allowDecimals
                            allowNegative={false}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            {t.percentSuffix}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
