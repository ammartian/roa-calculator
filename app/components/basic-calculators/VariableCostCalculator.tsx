"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { currencies } from "@/lib/currencies";
import { useVariableCostCalculator } from "@/hooks/useVariableCostCalculator";
import { formatCurrency, getCurrencySymbol, parseCurrency } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { CurrencyInput } from "@/components/ui/currency-input";
import { DynamicCostItem } from "@/components/ui/dynamic-cost-item";
import { Package, Truck, Percent, Target, Plus, RotateCcw } from "lucide-react";

interface AddCostFormProps {
    onAdd: (title: string) => void;
    onCancel: () => void;
    placeholder: string;
    addLabel: string;
    cancelLabel: string;
}

function AddCostForm({ onAdd, onCancel, placeholder, addLabel, cancelLabel }: AddCostFormProps) {
    const [title, setTitle] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = useCallback(() => {
        const trimmed = title.trim();
        if (trimmed) {
            onAdd(trimmed);
        }
    }, [title, onAdd]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        } else if (e.key === "Escape") {
            onCancel();
        }
    }, [handleSubmit, onCancel]);

    return (
        <div className="space-y-2">
            <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full"
            />
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                    className="flex-1"
                >
                    {cancelLabel}
                </Button>
                <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!title.trim()}
                    className="flex-1"
                >
                    {addLabel}
                </Button>
            </div>
        </div>
    );
}

export function VariableCostCalculator() {
    const { t } = useLanguage();
    const {
        selectedCurrency,
        setSelectedCurrency,
        productCost,
        courierCost,
        platformFee,
        marketingCost,
        additionalCosts,
        handleProductCostChange,
        handleCourierCostChange,
        handlePlatformFeeChange,
        handleMarketingCostChange,
        handleAddAdditionalCost,
        handleUpdateAdditionalCost,
        handleRemoveAdditionalCost,
        results,
        handleReset,
        canAddMoreCosts,
    } = useVariableCostCalculator();

    const [isAddingCost, setIsAddingCost] = useState(false);

    const handleStartAdding = useCallback(() => setIsAddingCost(true), []);
    const handleCancelAdding = useCallback(() => setIsAddingCost(false), []);
    
    const handleAddCost = useCallback((title: string) => {
        handleAddAdditionalCost(title);
        setIsAddingCost(false);
    }, [handleAddAdditionalCost]);

    const currencySymbol = useMemo(
        () => getCurrencySymbol(currencies, selectedCurrency),
        [selectedCurrency]
    );

    const formatCurrencyWithSelected = (value: number): string =>
        formatCurrency(value, selectedCurrency);

    const translations = t.variableCostCalculator;

    // Calculate individual values for formula display
    const productValue = parseCurrency(productCost);
    const courierValue = parseCurrency(courierCost);
    const platformValue = parseCurrency(platformFee);
    const marketingValue = parseCurrency(marketingCost);
    const additionalTotal = additionalCosts.reduce((sum, cost) => sum + parseCurrency(cost.amount), 0);

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
                <h3 className="font-semibold text-foreground">{translations.variableCostsSection}</h3>

                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="productCost" className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            {translations.productCost}
                        </Label>
                    <CurrencyInput
                        id="productCost"
                        currencySymbol={currencySymbol}
                        value={productCost}
                        onChange={handleProductCostChange}
                        placeholder="0.00"
                    />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="courierCost" className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            {translations.courierCost}
                        </Label>
                    <CurrencyInput
                        id="courierCost"
                        currencySymbol={currencySymbol}
                        value={courierCost}
                        onChange={handleCourierCostChange}
                        placeholder="0.00"
                    />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="platformFee" className="flex items-center gap-2">
                            <Percent className="h-4 w-4 text-muted-foreground" />
                            {translations.platformFee}
                        </Label>
                    <CurrencyInput
                        id="platformFee"
                        currencySymbol={currencySymbol}
                        value={platformFee}
                        onChange={handlePlatformFeeChange}
                        placeholder="0.00"
                    />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="marketingCost" className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            {translations.marketingCost}
                        </Label>
                    <CurrencyInput
                        id="marketingCost"
                        currencySymbol={currencySymbol}
                        value={marketingCost}
                        onChange={handleMarketingCostChange}
                        placeholder="0.00"
                    />
                    </div>

                    {additionalCosts.map((cost) => (
                        <DynamicCostItem
                            key={cost.id}
                            cost={cost}
                            currencySymbol={currencySymbol}
                            onUpdate={handleUpdateAdditionalCost}
                            onRemove={handleRemoveAdditionalCost}
                        />
                    ))}

                    <div className="space-y-2">
                        {isAddingCost ? (
                            <AddCostForm
                                onAdd={handleAddCost}
                                onCancel={handleCancelAdding}
                                placeholder={translations.costNamePlaceholder}
                                addLabel={translations.add}
                                cancelLabel={translations.cancel}
                            />
                        ) : (
                            <Button
                                variant="outline"
                                onClick={handleStartAdding}
                                disabled={!canAddMoreCosts}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {translations.addAdditionalCost}
                                {!canAddMoreCosts && (
                                    <span className="ml-2 text-xs text-muted-foreground">
                                        ({translations.maxReached})
                                    </span>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-foreground">{translations.results}</h3>

                {results.hasValidInput ? (
                    <div className="p-4 rounded-lg border-2 bg-primary/5 border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">
                            {translations.totalVariableCostsFormula}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mb-2">
                            {(() => {
                                const parts = [];
                                if (productValue > 0) parts.push(formatCurrencyWithSelected(productValue));
                                if (courierValue > 0) parts.push(formatCurrencyWithSelected(courierValue));
                                if (platformValue > 0) parts.push(formatCurrencyWithSelected(platformValue));
                                if (marketingValue > 0) parts.push(formatCurrencyWithSelected(marketingValue));
                                if (additionalTotal > 0) parts.push(`${formatCurrencyWithSelected(additionalTotal)} (other costs)`);
                                return parts.join(" + ") + " = " + formatCurrencyWithSelected(results.totalVariableCosts);
                            })()}
                        </p>
                        <div className="text-sm text-muted-foreground mb-1">{translations.totalVariableCosts}</div>
                        <div className="text-2xl font-bold text-primary">{formatCurrencyWithSelected(results.totalVariableCosts)}</div>
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
