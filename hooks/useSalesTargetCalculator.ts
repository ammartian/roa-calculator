"use client";

import { useState, useMemo, useCallback } from "react";
import { parseCurrency } from "@/lib/calculations";
import { sanitizeDecimalInput } from "@/lib/formatting";
import { useCalculatorCurrency } from "./useCalculatorCurrency";

export interface SalesTargetResults {
    targetRevenue: number;
    sellingPricePerUnit: number;
    netMarginPercent: number;
    unitsRequired: number;
    estimatedProfit: number;
    hasValidInput: boolean;
}

export interface UseSalesTargetCalculatorReturn {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    targetRevenue: string;
    sellingPricePerUnit: string;
    netMarginPercent: string;
    handleTargetRevenueChange: (value: string) => void;
    handleSellingPricePerUnitChange: (value: string) => void;
    handleNetMarginPercentChange: (value: string) => void;
    results: SalesTargetResults;
    handleReset: () => void;
}

export function useSalesTargetCalculator(): UseSalesTargetCalculatorReturn {
    const { selectedCurrency, setSelectedCurrency, resetCurrency } =
        useCalculatorCurrency();

    const [targetRevenue, setTargetRevenue] = useState<string>("");
    const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>("");
    const [netMarginPercent, setNetMarginPercent] = useState<string>("");

    const handleTargetRevenueChange = useCallback((value: string) => {
        setTargetRevenue(sanitizeDecimalInput(value));
    }, []);

    const handleSellingPricePerUnitChange = useCallback((value: string) => {
        setSellingPricePerUnit(sanitizeDecimalInput(value));
    }, []);

    const handleNetMarginPercentChange = useCallback((value: string) => {
        setNetMarginPercent(sanitizeDecimalInput(value));
    }, []);

    const results = useMemo(() => {
        const targetRevenueValue = parseCurrency(targetRevenue);
        const sellingPriceValue = parseCurrency(sellingPricePerUnit);
        const netMarginValue = parseCurrency(netMarginPercent);

        const hasValidInput = targetRevenueValue > 0 && sellingPriceValue > 0 && netMarginValue >= 0;

        if (!hasValidInput) {
            return {
                targetRevenue: targetRevenueValue,
                sellingPricePerUnit: sellingPriceValue,
                netMarginPercent: netMarginValue,
                unitsRequired: 0,
                estimatedProfit: 0,
                hasValidInput: false,
            };
        }

        const unitsRequired = targetRevenueValue / sellingPriceValue;
        const estimatedProfit = (netMarginValue / 100) * targetRevenueValue;

        return {
            targetRevenue: targetRevenueValue,
            sellingPricePerUnit: sellingPriceValue,
            netMarginPercent: netMarginValue,
            unitsRequired,
            estimatedProfit,
            hasValidInput: true,
        };
    }, [targetRevenue, sellingPricePerUnit, netMarginPercent]);

    const handleReset = useCallback(() => {
        resetCurrency();
        setTargetRevenue("");
        setSellingPricePerUnit("");
        setNetMarginPercent("");
    }, [resetCurrency]);

    return {
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
    };
}
