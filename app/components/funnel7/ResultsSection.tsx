"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatRinggit } from "@/lib/calculations";
import type { Funnel7Computation } from "@/lib/funnelBudgetCalculations";
import type { Translations } from "@/lib/i18n/types";
import { FunnelTrafficLight } from "@/app/components/funnel-budget/FunnelTrafficLight";

type Funnel7Copy = Translations["funnel7"];

interface ResultsSectionProps {
    translations: Funnel7Copy;
    results: Funnel7Computation;
    onReset: () => void;
}

function formatQuantity(value: number, isValid: boolean): string {
    if (!isValid || !Number.isFinite(value)) {
        return "—";
    }
    return value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
    });
}

function OutputRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex flex-col gap-0.5 rounded-lg bg-muted/50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground text-sm">{label}</span>
            <span className="font-semibold tabular-nums">{value}</span>
        </div>
    );
}

export function ResultsSection({
    translations: t,
    results,
    onReset,
}: ResultsSectionProps) {
    const { isValid } = results;

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="text-lg">{t.resultsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {!isValid && (
                    <p className="text-muted-foreground text-sm">{t.enterValues}</p>
                )}

                <div className="space-y-2">
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        {t.trafficLightTitle}
                    </p>
                    <FunnelTrafficLight
                        level={results.trafficLight}
                        labels={{
                            healthy: t.trafficLightHealthy,
                            borderline: t.trafficLightBorderline,
                            over: t.trafficLightOver,
                            neutral: t.trafficLightNeutral,
                        }}
                    />
                    <p className="text-muted-foreground text-xs">{t.primaryMetricHint}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                    <OutputRow
                        label={t.totalCustomers}
                        value={formatQuantity(results.totalCustomers, isValid)}
                    />
                    <OutputRow
                        label={t.linkClicksNeeded}
                        value={formatQuantity(results.linkClicksNeeded, isValid)}
                    />
                    <OutputRow
                        label={t.grossProfitMargin}
                        value={
                            isValid
                                ? formatRinggit(results.grossProfitMargin)
                                : "—"
                        }
                    />
                    <OutputRow
                        label={t.maxCPP}
                        value={isValid ? formatRinggit(results.maxCPP) : "—"}
                    />
                    <OutputRow
                        label={t.maxCPC}
                        value={isValid ? formatRinggit(results.maxCPC) : "—"}
                    />
                    <OutputRow
                        label={t.totalMarketingBudget}
                        value={
                            isValid
                                ? formatRinggit(results.totalMarketingBudget)
                                : "—"
                        }
                    />
                    <OutputRow
                        label={t.roas}
                        value={
                            isValid && results.roas > 0
                                ? results.roas.toFixed(2)
                                : "—"
                        }
                    />
                </div>

                <div className="pt-2 text-center">
                    <Button type="button" variant="outline" size="lg" onClick={onReset}>
                        {t.reset}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
