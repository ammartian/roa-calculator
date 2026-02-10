"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { currencies } from "@/lib/currencies";
import { useVariableCostCalculator } from "@/hooks/useVariableCostCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { CurrencyInput } from "@/components/ui/currency-input";
import { DynamicCostItem } from "@/components/ui/dynamic-cost-item";
import { Package, Truck, Percent, Target, Plus, RotateCcw } from "lucide-react";

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
    const [newCostTitle, setNewCostTitle] = useState("");
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isAddingCost && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isAddingCost]);

    const handleStartAdding = () => {
        setIsAddingCost(true);
        setNewCostTitle("");
    };

    const handleCancel = () => {
        setIsAddingCost(false);
        setNewCostTitle("");
    };

    const handleSubmit = () => {
        if (newCostTitle.trim()) {
            handleAddAdditionalCost(newCostTitle.trim());
            setIsAddingCost(false);
            setNewCostTitle("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newCostTitle.trim()) {
            handleSubmit();
        }
        if (e.key === "Escape") {
            handleCancel();
        }
    };

    const currencySymbol = useMemo(
        () => getCurrencySymbol(currencies, selectedCurrency),
        [selectedCurrency]
    );

    const formatCurrencyWithSelected = (value: number): string =>
        formatCurrency(value, selectedCurrency);

    const translations = t.variableCostCalculator;

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
                            onChange={(e) => handleProductCostChange(e.target.value)}
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
                            onChange={(e) => handleCourierCostChange(e.target.value)}
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
                            onChange={(e) => handlePlatformFeeChange(e.target.value)}
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
                            onChange={(e) => handleMarketingCostChange(e.target.value)}
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
                            <div className="space-y-2">
                                <Input
                                    ref={titleInputRef}
                                    type="text"
                                    placeholder={translations.costNamePlaceholder}
                                    value={newCostTitle}
                                    onChange={(e) => setNewCostTitle(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCancel}
                                        className="flex-1"
                                    >
                                        {translations.cancel}
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleSubmit}
                                        disabled={!newCostTitle.trim()}
                                        className="flex-1"
                                    >
                                        {translations.add}
                                    </Button>
                                </div>
                            </div>
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
