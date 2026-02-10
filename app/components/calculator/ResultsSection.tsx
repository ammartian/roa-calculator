"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    AlertCircle,
    XCircle,
    TrendingUp,
    DollarSign,
} from "lucide-react";
import type { CalculatorResults, ProfitabilityStatus } from "@/types";
import type { Translations } from "@/lib/i18n/types";

interface ResultsSectionProps {
    translations: Translations["calculator"]["results"];
    results: CalculatorResults;
    formatCurrency: (value: number) => string;
    onReset: () => void;
}

function getProfitabilityStatus(roas: number, translations: Translations["calculator"]["results"]["status"]): ProfitabilityStatus {
    if (roas === 0) {
        return {
            label: translations.enterValues,
            color: "text-muted-foreground",
            icon: null,
            description: translations.enterValuesDescription,
        };
    }
    if (roas <= 1) {
        return {
            label: translations.losingMoney,
            color: "text-red-500",
            icon: <XCircle className="h-5 w-5" />,
            description: translations.losingMoneyDescription,
        };
    }
    if (roas <= 1.5) {
        return {
            label: translations.lowMargin,
            color: "text-yellow-500",
            icon: <AlertCircle className="h-5 w-5" />,
            description: translations.lowMarginDescription,
        };
    }
    if (roas <= 2.5) {
        return {
            label: translations.profitable,
            color: "text-green-500",
            icon: <CheckCircle2 className="h-5 w-5" />,
            description: translations.profitableDescription,
        };
    }
    return {
        label: translations.highlyProfitable,
        color: "text-emerald-500",
        icon: <TrendingUp className="h-5 w-5" />,
        description: translations.highlyProfitableDescription,
    };
}

export function ResultsSection({
    translations,
    results,
    formatCurrency,
    onReset,
}: ResultsSectionProps) {
    const {
        breakEvenROAS,
        profitPerUnit,
        profitMarginPercent,
        maxAdSpendForBreakEven,
        totalRevenue,
        totalCosts,
    } = results;

    const profitabilityStatus = getProfitabilityStatus(breakEvenROAS, translations.status);

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="text-lg text-center">{translations.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <span
                        className={`text-5xl font-bold ${breakEvenROAS > 0 ? profitabilityStatus.color : "text-primary"
                            }`}
                    >
                        {breakEvenROAS > 0 ? breakEvenROAS.toFixed(2) : "0.00"}
                    </span>
                </div>

                {breakEvenROAS > 0 && (
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className={`flex items-center gap-2 font-medium ${profitabilityStatus.color}`}
                        >
                            {profitabilityStatus.icon}
                            {profitabilityStatus.label}
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            {profitabilityStatus.description}
                        </p>
                    </div>
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                            <DollarSign className="h-4 w-4" />
                            {translations.profitPerUnit}
                        </div>
                        <span
                            className={`text-xl font-semibold ${profitPerUnit >= 0 ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {formatCurrency(profitPerUnit)}
                        </span>
                    </div>

                    <div className="bg-background rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                            <TrendingUp className="h-4 w-4" />
                            {translations.profitMargin}
                        </div>
                        <span
                            className={`text-xl font-semibold ${profitMarginPercent >= 0 ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {profitMarginPercent.toFixed(1)}%
                        </span>
                    </div>
                </div>

                {breakEvenROAS > 0 && profitPerUnit > 0 && (
                    <div className="bg-background rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                {translations.maxAdSpend}
                            </span>
                            <span className="font-semibold text-lg">
                                {formatCurrency(maxAdSpendForBreakEven)}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {translations.maxAdSpendDescription}
                        </p>
                    </div>
                )}

                {breakEvenROAS > 0 && (
                    <div className="text-xs text-muted-foreground text-center">
                        <span className="font-mono">
                            {formatCurrency(totalRevenue)} / ({formatCurrency(totalRevenue)} -{" "}
                            {formatCurrency(totalCosts)}) = {breakEvenROAS.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="text-center">
                    <Button onClick={onReset} variant="outline" size="lg">
                        {translations.reset}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
