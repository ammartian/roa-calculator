"use client";

import { useState, useMemo, useCallback } from "react";
import { parseCurrency } from "@/lib/calculations";
import { sanitizeDecimalInput } from "@/lib/formatting";
import { useCalculatorCurrency } from "./useCalculatorCurrency";

export interface SellingPriceResults {
    totalCostPerUnit: number;
    desiredProfit: number;
    safetyMargin: number;
    minimumSellingPrice: number;
    recommendedSellingPrice: number;
    netProfit: number;
    netMarginPercent: number;
    hasValidInput: boolean;
}

export interface UseSellingPriceCalculatorReturn {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    totalCostPerUnit: string;
    desiredProfit: string;
    safetyMargin: string;
    handleTotalCostPerUnitChange: (value: string) => void;
    handleDesiredProfitChange: (value: string) => void;
    handleSafetyMarginChange: (value: string) => void;
    results: SellingPriceResults;
    handleReset: () => void;
}

export function useSellingPriceCalculator(): UseSellingPriceCalculatorReturn {
    const { selectedCurrency, setSelectedCurrency, resetCurrency } =
        useCalculatorCurrency();

    const [totalCostPerUnit, setTotalCostPerUnit] = useState<string>("");
    const [desiredProfit, setDesiredProfit] = useState<string>("");
    const [safetyMargin, setSafetyMargin] = useState<string>("");

    const handleTotalCostPerUnitChange = useCallback((value: string) => {
        setTotalCostPerUnit(sanitizeDecimalInput(value));
    }, []);

    const handleDesiredProfitChange = useCallback((value: string) => {
        setDesiredProfit(sanitizeDecimalInput(value));
    }, []);

    const handleSafetyMarginChange = useCallback((value: string) => {
        setSafetyMargin(sanitizeDecimalInput(value));
    }, []);

    const results = useMemo(() => {
        const costValue = parseCurrency(totalCostPerUnit);
        const profitValue = parseCurrency(desiredProfit);
        const safetyValue = parseCurrency(safetyMargin);

        const hasValidInput = costValue > 0;

        if (!hasValidInput) {
            return {
                totalCostPerUnit: costValue,
                desiredProfit: profitValue,
                safetyMargin: safetyValue,
                minimumSellingPrice: 0,
                recommendedSellingPrice: 0,
                netProfit: 0,
                netMarginPercent: 0,
                hasValidInput: false,
            };
        }

        const minimumSellingPrice = costValue + profitValue;
        const recommendedSellingPrice = minimumSellingPrice + safetyValue;
        const netProfit = recommendedSellingPrice - costValue;
        const netMarginPercent =
            recommendedSellingPrice > 0
                ? (netProfit / recommendedSellingPrice) * 100
                : 0;

        return {
            totalCostPerUnit: costValue,
            desiredProfit: profitValue,
            safetyMargin: safetyValue,
            minimumSellingPrice,
            recommendedSellingPrice,
            netProfit,
            netMarginPercent,
            hasValidInput: true,
        };
    }, [totalCostPerUnit, desiredProfit, safetyMargin]);

    const handleReset = useCallback(() => {
        resetCurrency();
        setTotalCostPerUnit("");
        setDesiredProfit("");
        setSafetyMargin("");
    }, [resetCurrency]);

    return {
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
    };
}
