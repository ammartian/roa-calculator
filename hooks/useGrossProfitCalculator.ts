"use client";

import { useState, useMemo, useCallback } from "react";
import { parseCurrency } from "@/lib/calculations";
import { sanitizeDecimalInput } from "@/lib/formatting";
import { useCalculatorCurrency } from "./useCalculatorCurrency";

export interface GrossProfitResults {
    grossProfit: number;
    markupPercent: number;
    grossMarginPercent: number;
    isProfitable: boolean;
    hasValidInput: boolean;
}

export interface UseGrossProfitCalculatorReturn {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    cogs: string;
    sellingPrice: string;
    handleCogsChange: (value: string) => void;
    handleSellingPriceChange: (value: string) => void;
    results: GrossProfitResults;
    handleReset: () => void;
}

export function useGrossProfitCalculator(): UseGrossProfitCalculatorReturn {
    const { selectedCurrency, setSelectedCurrency, resetCurrency } =
        useCalculatorCurrency();

    const [cogs, setCogs] = useState<string>("");
    const [sellingPrice, setSellingPrice] = useState<string>("");

    const handleCogsChange = useCallback((value: string) => {
        setCogs(sanitizeDecimalInput(value));
    }, []);

    const handleSellingPriceChange = useCallback((value: string) => {
        setSellingPrice(sanitizeDecimalInput(value));
    }, []);

    const results: GrossProfitResults = useMemo(() => {
        const cogsValue = parseCurrency(cogs);
        const sellingPriceValue = parseCurrency(sellingPrice);

        const hasValidInput = cogsValue > 0 && sellingPriceValue > 0;

        if (!hasValidInput) {
            return {
                grossProfit: 0,
                markupPercent: 0,
                grossMarginPercent: 0,
                isProfitable: false,
                hasValidInput: false,
            };
        }

        const grossProfit = sellingPriceValue - cogsValue;
        const markupPercent = cogsValue > 0 ? (grossProfit / cogsValue) * 100 : 0;
        const grossMarginPercent =
            sellingPriceValue > 0 ? (grossProfit / sellingPriceValue) * 100 : 0;

        return {
            grossProfit,
            markupPercent,
            grossMarginPercent,
            isProfitable: grossProfit > 0,
            hasValidInput: true,
        };
    }, [cogs, sellingPrice]);

    const handleReset = useCallback(() => {
        resetCurrency();
        setCogs("");
        setSellingPrice("");
    }, [resetCurrency]);

    return {
        selectedCurrency,
        setSelectedCurrency,
        cogs,
        sellingPrice,
        handleCogsChange,
        handleSellingPriceChange,
        results,
        handleReset,
    };
}
