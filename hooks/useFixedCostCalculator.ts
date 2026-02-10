"use client";

import { useState, useMemo, useCallback } from "react";
import { parseCurrency } from "@/lib/calculations";
import { sanitizeDecimalInput, sanitizeIntegerInput } from "@/lib/formatting";
import { useCalculatorCurrency } from "./useCalculatorCurrency";
import type { DynamicCostItemData } from "@/components/ui/dynamic-cost-item";

export interface FixedCostResults {
    totalFixedCosts: number;
    unitsSold: number;
    fixedCostPerUnit: number;
    hasValidInput: boolean;
}

const MAX_ADDITIONAL_COSTS = 20;

export interface UseFixedCostCalculatorReturn {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    premisesRent: string;
    staffSalaries: string;
    internetBill: string;
    unitsSold: string;
    additionalCosts: DynamicCostItemData[];
    handlePremisesRentChange: (value: string) => void;
    handleStaffSalariesChange: (value: string) => void;
    handleInternetBillChange: (value: string) => void;
    handleUnitsSoldChange: (value: string) => void;
    handleAddAdditionalCost: (title: string) => void;
    handleUpdateAdditionalCost: (
        id: string,
        field: keyof DynamicCostItemData,
        value: string
    ) => void;
    handleRemoveAdditionalCost: (id: string) => void;
    results: FixedCostResults;
    handleReset: () => void;
    canAddMoreCosts: boolean;
    maxAdditionalCosts: number;
}

export function useFixedCostCalculator(): UseFixedCostCalculatorReturn {
    const { selectedCurrency, setSelectedCurrency, resetCurrency } =
        useCalculatorCurrency();

    const [premisesRent, setPremisesRent] = useState<string>("");
    const [staffSalaries, setStaffSalaries] = useState<string>("");
    const [internetBill, setInternetBill] = useState<string>("");
    const [unitsSold, setUnitsSold] = useState<string>("");
    const [additionalCosts, setAdditionalCosts] = useState<DynamicCostItemData[]>([]);

    const handlePremisesRentChange = useCallback((value: string) => {
        setPremisesRent(sanitizeDecimalInput(value));
    }, []);

    const handleStaffSalariesChange = useCallback((value: string) => {
        setStaffSalaries(sanitizeDecimalInput(value));
    }, []);

    const handleInternetBillChange = useCallback((value: string) => {
        setInternetBill(sanitizeDecimalInput(value));
    }, []);

    const handleUnitsSoldChange = useCallback((value: string) => {
        setUnitsSold(sanitizeIntegerInput(value));
    }, []);

    const handleAddAdditionalCost = useCallback(
        (title: string) => {
            if (additionalCosts.length >= MAX_ADDITIONAL_COSTS) return;

            const newCost: DynamicCostItemData = {
                id: crypto.randomUUID(),
                title: title.trim(),
                amount: "",
            };
            setAdditionalCosts((prev) => [...prev, newCost]);
        },
        [additionalCosts.length]
    );

    const handleUpdateAdditionalCost = useCallback(
        (id: string, field: keyof DynamicCostItemData, value: string) => {
            setAdditionalCosts((prev) =>
                prev.map((cost) =>
                    cost.id === id ? { ...cost, [field]: value } : cost
                )
            );
        },
        []
    );

    const handleRemoveAdditionalCost = useCallback((id: string) => {
        setAdditionalCosts((prev) => prev.filter((cost) => cost.id !== id));
    }, []);

    const results: FixedCostResults = useMemo(() => {
        const rentValue = parseCurrency(premisesRent);
        const salariesValue = parseCurrency(staffSalaries);
        const internetValue = parseCurrency(internetBill);
        const unitsValue = parseInt(unitsSold, 10) || 0;

        const additionalCostsTotal = additionalCosts.reduce((sum, cost) => {
            return sum + parseCurrency(cost.amount);
        }, 0);

        const totalFixedCosts =
            rentValue + salariesValue + internetValue + additionalCostsTotal;

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
        resetCurrency();
        setPremisesRent("");
        setStaffSalaries("");
        setInternetBill("");
        setUnitsSold("");
        setAdditionalCosts([]);
    }, [resetCurrency]);

    const canAddMoreCosts = additionalCosts.length < MAX_ADDITIONAL_COSTS;

    return {
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
        maxAdditionalCosts: MAX_ADDITIONAL_COSTS,
    };
}
