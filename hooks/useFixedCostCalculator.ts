"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { parseCurrency } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import type { DynamicCostItemData } from "@/components/ui/dynamic-cost-item";

function getDefaultCurrency(language: string): string {
    return language === "ms" ? "MYR" : "USD";
}

export interface FixedCostResults {
    totalFixedCosts: number;
    unitsSold: number;
    fixedCostPerUnit: number;
    hasValidInput: boolean;
}

const MAX_ADDITIONAL_COSTS = 20;

export function useFixedCostCalculator() {
    const { language } = useLanguage();
    const [selectedCurrency, setSelectedCurrency] = useState<string>(() => getDefaultCurrency(language));
    const hasManuallyChangedCurrency = useRef(false);

    // Update currency when language changes (unless user manually selected)
    useEffect(() => {
        if (!hasManuallyChangedCurrency.current) {
            const defaultCurrency = getDefaultCurrency(language);
            queueMicrotask(() => setSelectedCurrency(defaultCurrency));
        }
    }, [language]);

    const handleCurrencyChange = useCallback((currency: string) => {
        hasManuallyChangedCurrency.current = true;
        setSelectedCurrency(currency);
    }, []);

    // Fixed cost inputs
    const [premisesRent, setPremisesRent] = useState<string>("");
    const [staffSalaries, setStaffSalaries] = useState<string>("");
    const [internetBill, setInternetBill] = useState<string>("");
    const [unitsSold, setUnitsSold] = useState<string>("");

    // Dynamic additional costs
    const [additionalCosts, setAdditionalCosts] = useState<DynamicCostItemData[]>([]);

    // Input handlers
    const handlePremisesRentChange = useCallback((value: string) => {
        const sanitized = value.replace(/[^0-9.]/g, "");
        const parts = sanitized.split(".");
        const formatted = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
        setPremisesRent(formatted);
    }, []);

    const handleStaffSalariesChange = useCallback((value: string) => {
        const sanitized = value.replace(/[^0-9.]/g, "");
        const parts = sanitized.split(".");
        const formatted = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
        setStaffSalaries(formatted);
    }, []);

    const handleInternetBillChange = useCallback((value: string) => {
        const sanitized = value.replace(/[^0-9.]/g, "");
        const parts = sanitized.split(".");
        const formatted = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
        setInternetBill(formatted);
    }, []);

    const handleUnitsSoldChange = useCallback((value: string) => {
        // Only allow positive integers for units
        const sanitized = value.replace(/[^0-9]/g, "");
        setUnitsSold(sanitized);
    }, []);

    // Dynamic cost handlers
    const handleAddAdditionalCost = useCallback((title: string) => {
        if (additionalCosts.length >= MAX_ADDITIONAL_COSTS) return;
        
        const newCost: DynamicCostItemData = {
            id: crypto.randomUUID(),
            title: title.trim(),
            amount: "",
        };
        setAdditionalCosts((prev) => [...prev, newCost]);
    }, [additionalCosts.length]);

    const handleUpdateAdditionalCost = useCallback((id: string, field: keyof DynamicCostItemData, value: string) => {
        setAdditionalCosts((prev) =>
            prev.map((cost) =>
                cost.id === id ? { ...cost, [field]: value } : cost
            )
        );
    }, []);

    const handleRemoveAdditionalCost = useCallback((id: string) => {
        setAdditionalCosts((prev) => prev.filter((cost) => cost.id !== id));
    }, []);

    // Calculate results
    const results: FixedCostResults = useMemo(() => {
        const rentValue = parseCurrency(premisesRent);
        const salariesValue = parseCurrency(staffSalaries);
        const internetValue = parseCurrency(internetBill);
        const unitsValue = parseInt(unitsSold, 10) || 0;

        // Sum up all additional costs
        const additionalCostsTotal = additionalCosts.reduce((sum, cost) => {
            return sum + parseCurrency(cost.amount);
        }, 0);

        const totalFixedCosts = rentValue + salariesValue + internetValue + additionalCostsTotal;
        
        const hasValidInput = totalFixedCosts > 0 && unitsValue > 0;
        
        const fixedCostPerUnit = hasValidInput ? totalFixedCosts / unitsValue : 0;

        return {
            totalFixedCosts,
            unitsSold: unitsValue,
            fixedCostPerUnit,
            hasValidInput,
        };
    }, [premisesRent, staffSalaries, internetBill, unitsSold, additionalCosts]);

    const handleReset = useCallback(() => {
        hasManuallyChangedCurrency.current = false;
        setSelectedCurrency(getDefaultCurrency(language));
        setPremisesRent("");
        setStaffSalaries("");
        setInternetBill("");
        setUnitsSold("");
        setAdditionalCosts([]);
    }, [language]);

    const canAddMoreCosts = additionalCosts.length < MAX_ADDITIONAL_COSTS;

    return {
        selectedCurrency,
        setSelectedCurrency: handleCurrencyChange,
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
        maxAdditionalCosts: MAX_ADDITIONAL_COSTS,
    };
}
