"use client";

import { currencies } from "@/lib/currencies";
import { useSellingPriceCalculator } from "@/hooks/useSellingPriceCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Calculator, TrendingUp, Shield, DollarSign, RotateCcw } from "lucide-react";

export function SellingPriceCalculator() {
    const { t } = useLanguage();
    const {
        selectedCurrency,
        setSelectedCurrency,
        totalCostPerUnit,
        desiredProfit,
        safetyMargin,
        handleTotalCostPerUnitChange,
        handleDesiredProfitChange,
        handleSafetyMarginChange,
        results,
        handleReset,
    } = useSellingPriceCalculator();

    const currencySymbol = getCurrencySymbol(currencies, selectedCurrency);

    const formatCurrencyWithSelected = (value: number): string =>
        formatCurrency(value, selectedCurrency);

    const translations = t.sellingPriceCalculator;

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
                    <Label htmlFor="totalCostPerUnit" className="flex items-center gap-2">
                        <Calculator className="h-4 w-4 text-muted-foreground" />
                        {translations.totalCostPerUnit}
                    </Label>
                    <CurrencyInput
                        id="totalCostPerUnit"
                        currencySymbol={currencySymbol}
                        value={totalCostPerUnit}
                        onChange={handleTotalCostPerUnitChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="desiredProfit" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        {translations.desiredProfit}
                    </Label>
                    <CurrencyInput
                        id="desiredProfit"
                        currencySymbol={currencySymbol}
                        value={desiredProfit}
                        onChange={handleDesiredProfitChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="safetyMargin" className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        {translations.safetyMargin}
                    </Label>
                    <CurrencyInput
                        id="safetyMargin"
                        currencySymbol={currencySymbol}
                        value={safetyMargin}
                        onChange={handleSafetyMarginChange}
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-foreground">{translations.results}</h3>

                {results.hasValidInput ? (
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-4 rounded-lg border-2 bg-muted/50 border-muted">
                                <div className="text-sm text-muted-foreground mb-1">
                                    {translations.minimumSellingPrice}
                                </div>
                                <div className="text-xl font-semibold text-foreground">
                                    {formatCurrencyWithSelected(results.minimumSellingPrice)}
                                </div>
                            </div>

                            <div className="p-4 rounded-lg border-2 bg-primary/5 border-primary/20">
                                <div className="text-sm text-muted-foreground mb-1">
                                    {translations.recommendedSellingPrice}
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                    {formatCurrencyWithSelected(results.recommendedSellingPrice)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-4 rounded-lg border bg-card">
                                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    {translations.netProfit}
                                </div>
                                <div className="text-lg font-semibold text-foreground">
                                    {formatCurrencyWithSelected(results.netProfit)}
                                </div>
                            </div>

                            <div className="p-4 rounded-lg border bg-card">
                                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    {translations.netMargin}
                                </div>
                                <div className="text-lg font-semibold text-foreground">
                                    {results.netMarginPercent.toFixed(2)}%
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
