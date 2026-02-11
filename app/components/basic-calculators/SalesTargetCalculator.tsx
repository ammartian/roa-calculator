"use client";

import { useMemo, useCallback } from "react";
import { currencies } from "@/lib/currencies";
import { useSalesTargetCalculator } from "@/hooks/useSalesTargetCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Target, DollarSign, TrendingUp, Package, RotateCcw } from "lucide-react";

export function SalesTargetCalculator() {
    const { t } = useLanguage();
    const {
        selectedCurrency,
        setSelectedCurrency,
        targetRevenue,
        sellingPricePerUnit,
        netMarginPercent,
        handleTargetRevenueChange,
        handleSellingPricePerUnitChange,
        handleNetMarginPercentChange,
        results,
        handleReset,
    } = useSalesTargetCalculator();

    const currencySymbol = useMemo(
        () => getCurrencySymbol(currencies, selectedCurrency),
        [selectedCurrency]
    );

    const formatCurrencyWithSelected = useCallback(
        (value: number): string => formatCurrency(value, selectedCurrency),
        [selectedCurrency]
    );

    const translations = t.salesTargetCalculator;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="currency">{translations.currency}</Label>
                <CurrencyCombobox
                    currencies={currencies}
                    value={selectedCurrency}
                    onChange={setSelectedCurrency}
                />
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="targetRevenue" className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        {translations.targetRevenue}
                    </Label>
                    <CurrencyInput
                        id="targetRevenue"
                        currencySymbol={currencySymbol}
                        value={targetRevenue}
                        onChange={handleTargetRevenueChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sellingPricePerUnit" className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {translations.sellingPricePerUnit}
                    </Label>
                    <CurrencyInput
                        id="sellingPricePerUnit"
                        currencySymbol={currencySymbol}
                        value={sellingPricePerUnit}
                        onChange={handleSellingPricePerUnitChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="netMarginPercent" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        {translations.netMarginPercent}
                    </Label>
                    <CurrencyInput
                        id="netMarginPercent"
                        currencySymbol="%"
                        value={netMarginPercent}
                        onChange={handleNetMarginPercentChange}
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-foreground">{translations.results}</h3>

                {results.hasValidInput ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-lg border-2 bg-primary/5 border-primary/20">
                            <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                {translations.unitsRequired}
                            </div>
                            <div className="text-2xl font-bold text-primary">
                                {results.unitsRequired.toFixed(0)} {translations.units}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border-2 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800">
                            <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                                {translations.estimatedProfit}
                            </div>
                            <div className="text-2xl font-bold text-emerald-700">
                                {formatCurrencyWithSelected(results.estimatedProfit)}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 border-2 border-dashed border-muted rounded-lg text-center">
                        <p className="text-muted-foreground">{translations.enterValues}</p>
                    </div>
                )}
            </div>

            <Button variant="outline" onClick={handleReset} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                {translations.reset}
            </Button>
        </div>
    );
}
