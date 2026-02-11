"use client";

import { useMemo } from "react";
import { currencies } from "@/lib/currencies";
import { useGrossProfitCalculator } from "@/hooks/useGrossProfitCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { CurrencyInput } from "@/components/ui/currency-input";
import { TrendingUp, DollarSign, Calculator, RotateCcw } from "lucide-react";

export function GrossProfitCalculator() {
    const { t } = useLanguage();
    const {
        selectedCurrency,
        setSelectedCurrency,
        cogs,
        sellingPrice,
        handleCogsChange,
        handleSellingPriceChange,
        results,
        handleReset,
    } = useGrossProfitCalculator();

    const currencySymbol = useMemo(
        () => getCurrencySymbol(currencies, selectedCurrency),
        [selectedCurrency]
    );

    const formatCurrencyWithSelected = (value: number): string =>
        formatCurrency(value, selectedCurrency);

    const translations = t.grossProfitCalculator;

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="cogs" className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {translations.cogs}
                    </Label>
                    <CurrencyInput
                        id="cogs"
                        currencySymbol={currencySymbol}
                        value={cogs}
                        onChange={handleCogsChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sellingPrice" className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {translations.sellingPrice}
                    </Label>
                    <CurrencyInput
                        id="sellingPrice"
                        currencySymbol={currencySymbol}
                        value={sellingPrice}
                        onChange={handleSellingPriceChange}
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                    {translations.results}
                </h3>

                {results.hasValidInput ? (
                    <div className="grid grid-cols-1 gap-4">
                        <div
                            className={`p-4 rounded-lg border-2 ${results.isProfitable
                                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800"
                                    : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    {translations.grossProfit}
                                </span>
                                {results.isProfitable ? (
                                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                                ) : (
                                    <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                                )}
                            </div>
                            <div
                                className={`text-2xl font-bold mt-1 ${results.isProfitable ? "text-emerald-700" : "text-red-700"
                                    }`}
                            >
                                {formatCurrencyWithSelected(results.grossProfit)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-secondary/50 border">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                    <Calculator className="h-4 w-4" />
                                    {translations.markup}
                                </div>
                                <div className="text-xl font-semibold">
                                    {results.markupPercent.toFixed(2)}%
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-secondary/50 border">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                    <Calculator className="h-4 w-4" />
                                    {translations.grossMargin}
                                </div>
                                <div className="text-xl font-semibold">
                                    {results.grossMarginPercent.toFixed(2)}%
                                </div>
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
