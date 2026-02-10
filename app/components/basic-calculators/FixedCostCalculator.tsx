"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { currencies } from "@/lib/currencies";
import { useFixedCostCalculator } from "@/hooks/useFixedCostCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { DynamicCostItem } from "@/components/ui/dynamic-cost-item";
import { Building2, Users, Wifi, Package, Plus, RotateCcw } from "lucide-react";

export function FixedCostCalculator() {
    const { t } = useLanguage();
    const {
        selectedCurrency,
        setSelectedCurrency,
        premisesRent,
        staffSalaries,
        internetBill,
        unitsSold,
        additionalCosts,
        handlePremisesRentChange,
        handleStaffSalariesChange,
        handleInternetBillChange,
        handleUnitsSoldChange,
        handleAddAdditionalCost,
        handleUpdateAdditionalCost,
        handleRemoveAdditionalCost,
        results,
        handleReset,
        canAddMoreCosts,
    } = useFixedCostCalculator();

    // State for adding new cost
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

    const translations = t.fixedCostCalculator;

    return (
        <div className="space-y-6">
            {/* Currency Selector */}
            <div className="space-y-2">
                <Label htmlFor="currency">{translations.currency}</Label>
                <CurrencyCombobox
                    currencies={currencies}
                    value={selectedCurrency}
                    onChange={setSelectedCurrency}
                />
            </div>

            {/* Fixed Costs Section */}
            <div className="space-y-4">
                <h3 className="font-semibold text-foreground">{translations.fixedCostsSection}</h3>
                
                <div className="grid grid-cols-1 gap-4">
                    {/* Premises Rent */}
                    <div className="space-y-2">
                        <Label htmlFor="premisesRent" className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {translations.premisesRent}
                        </Label>
                        <div className="flex items-center gap-2 flex-1 border rounded-md px-3 bg-background focus-within:ring-2 focus-within:ring-ring">
                            <span className="text-muted-foreground whitespace-nowrap font-medium">
                                {currencySymbol}
                            </span>
                            <Input
                                id="premisesRent"
                                type="text"
                                inputMode="decimal"
                                value={premisesRent}
                                onChange={(e) => handlePremisesRentChange(e.target.value)}
                                placeholder="0.00"
                                className="border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none"
                            />
                        </div>
                    </div>

                    {/* Staff Salaries */}
                    <div className="space-y-2">
                        <Label htmlFor="staffSalaries" className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {translations.staffSalaries}
                        </Label>
                        <div className="flex items-center gap-2 flex-1 border rounded-md px-3 bg-background focus-within:ring-2 focus-within:ring-ring">
                            <span className="text-muted-foreground whitespace-nowrap font-medium">
                                {currencySymbol}
                            </span>
                            <Input
                                id="staffSalaries"
                                type="text"
                                inputMode="decimal"
                                value={staffSalaries}
                                onChange={(e) => handleStaffSalariesChange(e.target.value)}
                                placeholder="0.00"
                                className="border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none"
                            />
                        </div>
                    </div>

                    {/* Internet Bill */}
                    <div className="space-y-2">
                        <Label htmlFor="internetBill" className="flex items-center gap-2">
                            <Wifi className="h-4 w-4 text-muted-foreground" />
                            {translations.internetBill}
                        </Label>
                        <div className="flex items-center gap-2 flex-1 border rounded-md px-3 bg-background focus-within:ring-2 focus-within:ring-ring">
                            <span className="text-muted-foreground whitespace-nowrap font-medium">
                                {currencySymbol}
                            </span>
                            <Input
                                id="internetBill"
                                type="text"
                                inputMode="decimal"
                                value={internetBill}
                                onChange={(e) => handleInternetBillChange(e.target.value)}
                                placeholder="0.00"
                                className="border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none"
                            />
                        </div>
                    </div>

                    {/* Additional Fixed Costs */}
                    {additionalCosts.map((cost) => (
                        <DynamicCostItem
                            key={cost.id}
                            cost={cost}
                            currencySymbol={currencySymbol}
                            onUpdate={handleUpdateAdditionalCost}
                            onRemove={handleRemoveAdditionalCost}
                        />
                    ))}

                    {/* Add Additional Cost Button / Input */}
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

            {/* Units Sold Section */}
            <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="unitsSold" className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    {translations.unitsSold}
                </Label>
                <Input
                    id="unitsSold"
                    type="text"
                    inputMode="numeric"
                    value={unitsSold}
                    onChange={(e) => handleUnitsSoldChange(e.target.value)}
                    placeholder="0"
                    className="focus-visible:ring-2"
                />
            </div>

            {/* Results Section */}
            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-foreground">{translations.results}</h3>

                {results.hasValidInput ? (
                    <div className="space-y-3">
                        {/* Total Fixed Costs */}
                        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">{translations.totalFixedCosts}</span>
                            <span className="font-semibold">{formatCurrencyWithSelected(results.totalFixedCosts)}</span>
                        </div>

                        {/* Units Sold */}
                        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">{translations.unitsSoldLabel}</span>
                            <span className="font-semibold">{results.unitsSold.toLocaleString()}</span>
                        </div>

                        {/* Fixed Cost per Unit - Highlighted */}
                        <div className="p-4 rounded-lg border-2 bg-primary/5 border-primary/20">
                            <div className="text-sm text-muted-foreground mb-1">{translations.fixedCostPerUnit}</div>
                            <div className="text-2xl font-bold text-primary">{formatCurrencyWithSelected(results.fixedCostPerUnit)}</div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 border-2 border-dashed border-muted rounded-lg text-center">
                        <p className="text-muted-foreground">{translations.enterValues}</p>
                    </div>
                )}
            </div>

            {/* Reset Button */}
            <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
            >
                <RotateCcw className="h-4 w-4 mr-2" />
                {translations.reset}
            </Button>
        </div>
    );
}
