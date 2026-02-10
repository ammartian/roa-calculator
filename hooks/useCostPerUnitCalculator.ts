"use client";

import { useState, useMemo, useCallback } from "react";
import { parseCurrency } from "@/lib/calculations";
import { sanitizeDecimalInput } from "@/lib/formatting";
import { useCalculatorCurrency } from "./useCalculatorCurrency";

export interface CostPerUnitResults {
    fixedCostPerUnit: number;
    variableCostPerUnit: number;
    totalCostPerUnit: number;
    hasValidInput: boolean;
}

export interface UseCostPerUnitCalculatorReturn {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    fixedCostPerUnit: string;
    variableCostPerUnit: string;
    handleFixedCostPerUnitChange: (value: string) => void;
    handleVariableCostPerUnitChange: (value: string) => void;
    results: CostPerUnitResults;
    handleReset: () => void;
}

export function useCostPerUnitCalculator(): UseCostPerUnitCalculatorReturn {
    const { selectedCurrency, setSelectedCurrency, resetCurrency } =
        useCalculatorCurrency();

    const [fixedCostPerUnit, setFixedCostPerUnit] = useState<string>("");
    const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>("");

    const handleFixedCostPerUnitChange = useCallback((value: string) => {
        setFixedCostPerUnit(sanitizeDecimalInput(value));
    }, []);

    const handleVariableCostPerUnitChange = useCallback((value: string) => {
        setVariableCostPerUnit(sanitizeDecimalInput(value));
    }, []);

    const results: CostPerUnitResults = useMemo(() => {
        const fixedValue = parseCurrency(fixedCostPerUnit);
        const variableValue = parseCurrency(variableCostPerUnit);

        const hasValidInput = fixedValue > 0 || variableValue > 0;

        const totalCostPerUnit = fixedValue + variableValue;

        return {
            fixedCostPerUnit: fixedValue,
            variableCostPerUnit: variableValue,
            totalCostPerUnit,
            hasValidInput,
        };
    }, [fixedCostPerUnit, variableCostPerUnit]);

    const handleReset = useCallback(() => {
        resetCurrency();
        setFixedCostPerUnit("");
        setVariableCostPerUnit("");
    }, [resetCurrency]);

    return {
        selectedCurrency,
        setSelectedCurrency,
        fixedCostPerUnit,
        variableCostPerUnit,
        handleFixedCostPerUnitChange,
        handleVariableCostPerUnitChange,
        results,
        handleReset,
    };
}
