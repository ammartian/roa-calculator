"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { currencies } from "@/lib/currencies";
import { useFixedCostCalculator } from "@/hooks/useFixedCostCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { CurrencyInput } from "@/components/ui/currency-input";
import { DynamicCostItem } from "@/components/ui/dynamic-cost-item";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Building2, Users, Wifi, Package, Plus, RotateCcw } from "lucide-react";

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

    const translations = t.fixedCostCalculator;

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
                <h3 className="font-semibold text-foreground">{translations.fixedCostsSection}</h3>

                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="premisesRent" className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {translations.premisesRent}
                        </Label>
                        <CurrencyInput
                            id="premisesRent"
                            currencySymbol={currencySymbol}
                            value={premisesRent}
                            onChange={handlePremisesRentChange}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="staffSalaries" className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {translations.staffSalaries}
                        </Label>
                        <CurrencyInput
                            id="staffSalaries"
                            currencySymbol={currencySymbol}
                            value={staffSalaries}
                            onChange={handleStaffSalariesChange}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="internetBill" className="flex items-center gap-2">
                            <Wifi className="h-4 w-4 text-muted-foreground" />
                            {translations.internetBill}
                        </Label>
                        <CurrencyInput
                            id="internetBill"
                            currencySymbol={currencySymbol}
                            value={internetBill}
                            onChange={handleInternetBillChange}
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

            <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="unitsSold" className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    {translations.unitsSold}
                </Label>
                <FormattedInput
                    id="unitsSold"
                    value={unitsSold}
                    onChange={handleUnitsSoldChange}
                    placeholder="0"
                    className="focus-visible:ring-2"
                    allowDecimals={false}
                    allowNegative={false}
                    inputMode="numeric"
                />
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-foreground">{translations.results}</h3>

                {results.hasValidInput ? (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">{translations.totalFixedCosts}</span>
                            <span className="font-semibold">{formatCurrencyWithSelected(results.totalFixedCosts)}</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">{translations.unitsSoldLabel}</span>
                            <span className="font-semibold">{results.unitsSold.toLocaleString()}</span>
                        </div>

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

            <Button variant="outline" onClick={handleReset} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                {translations.reset}
            </Button>
        </div>
    );
}
