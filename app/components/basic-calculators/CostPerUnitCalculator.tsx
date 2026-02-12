"use client";

import { useMemo } from "react";
import { currencies } from "@/lib/currencies";
import { useCostPerUnitCalculator } from "@/hooks/useCostPerUnitCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Building2, Package, AlertTriangle, RotateCcw } from "lucide-react";

export function CostPerUnitCalculator() {
    const { t } = useLanguage();
    const {
        selectedCurrency,
        setSelectedCurrency,
        fixedCostPerUnit,
        variableCostPerUnit,
        handleFixedCostPerUnitChange,
        handleVariableCostPerUnitChange,
        results,
        handleReset,
    } = useCostPerUnitCalculator();

    const currencySymbol = useMemo(
        () => getCurrencySymbol(currencies, selectedCurrency),
        [selectedCurrency]
    );

    const formatCurrencyWithSelected = (value: number): string =>
        formatCurrency(value, selectedCurrency);

    const translations = t.costPerUnitCalculator;

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
                    <Label htmlFor="fixedCostPerUnit" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {translations.fixedCostPerUnit}
                    </Label>
                    <CurrencyInput
                        id="fixedCostPerUnit"
                        currencySymbol={currencySymbol}
                        value={fixedCostPerUnit}
                        onChange={handleFixedCostPerUnitChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="variableCostPerUnit" className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {translations.variableCostPerUnit}
                    </Label>
                    <CurrencyInput
                        id="variableCostPerUnit"
                        currencySymbol={currencySymbol}
                        value={variableCostPerUnit}
                        onChange={handleVariableCostPerUnitChange}
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-foreground">{translations.results}</h3>

                {results.hasValidInput ? (
                    <div className="p-4 rounded-lg border-2 bg-primary/5 border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">
                            {translations.totalCostPerUnitFormula}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mb-2">
                            {formatCurrencyWithSelected(results.fixedCostPerUnit)} + {formatCurrencyWithSelected(results.variableCostPerUnit)} = {formatCurrencyWithSelected(results.totalCostPerUnit)}
                        </p>
                        <div className="text-sm text-muted-foreground mb-1">
                            {translations.totalCostPerUnit}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                            {formatCurrencyWithSelected(results.totalCostPerUnit)}
                        </div>
                    </div>
                ) : (
                    <div className="p-8 border-2 border-dashed border-muted rounded-lg text-center">
                        <p className="text-muted-foreground">{translations.enterValues}</p>
                    </div>
                )}
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                        <p className="font-semibold mb-1">{translations.importantNotice}</p>
                        <p>{translations.noticeDescription}</p>
                    </div>
                </div>
            </div>

            <Button variant="outline" onClick={handleReset} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                {translations.reset}
            </Button>
        </div>
    );
}
