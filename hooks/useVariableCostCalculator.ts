"use client";

import { useState, useMemo, useCallback } from "react";
import { parseCurrency } from "@/lib/calculations";
import { sanitizeDecimalInput } from "@/lib/formatting";
import { useCalculatorCurrency } from "./useCalculatorCurrency";
import type { DynamicCostItemData } from "@/components/ui/dynamic-cost-item";

export interface VariableCostResults {
    totalVariableCosts: number;
    hasValidInput: boolean;
}

const MAX_ADDITIONAL_COSTS = 20;

export interface UseVariableCostCalculatorReturn {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    productCost: string;
    courierCost: string;
    platformFee: string;
    marketingCost: string;
    additionalCosts: DynamicCostItemData[];
    handleProductCostChange: (value: string) => void;
    handleCourierCostChange: (value: string) => void;
    handlePlatformFeeChange: (value: string) => void;
    handleMarketingCostChange: (value: string) => void;
    handleAddAdditionalCost: (title: string) => void;
    handleUpdateAdditionalCost: (
        id: string,
        field: keyof DynamicCostItemData,
        value: string
    ) => void;
    handleRemoveAdditionalCost: (id: string) => void;
    results: VariableCostResults;
    handleReset: () => void;
    canAddMoreCosts: boolean;
    maxAdditionalCosts: number;
}

export function useVariableCostCalculator(): UseVariableCostCalculatorReturn {
    const { selectedCurrency, setSelectedCurrency, resetCurrency } =
        useCalculatorCurrency();

    const [productCost, setProductCost] = useState<string>("");
    const [courierCost, setCourierCost] = useState<string>("");
    const [platformFee, setPlatformFee] = useState<string>("");
    const [marketingCost, setMarketingCost] = useState<string>("");
    const [additionalCosts, setAdditionalCosts] = useState<DynamicCostItemData[]>([]);

    const handleProductCostChange = useCallback((value: string) => {
        setProductCost(sanitizeDecimalInput(value));
    }, []);

    const handleCourierCostChange = useCallback((value: string) => {
        setCourierCost(sanitizeDecimalInput(value));
    }, []);

    const handlePlatformFeeChange = useCallback((value: string) => {
        setPlatformFee(sanitizeDecimalInput(value));
    }, []);

    const handleMarketingCostChange = useCallback((value: string) => {
        setMarketingCost(sanitizeDecimalInput(value));
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

    const results: VariableCostResults = useMemo(() => {
        const productValue = parseCurrency(productCost);
        const courierValue = parseCurrency(courierCost);
        const platformValue = parseCurrency(platformFee);
        const marketingValue = parseCurrency(marketingCost);

        const additionalCostsTotal = additionalCosts.reduce((sum, cost) => {
            return sum + parseCurrency(cost.amount);
        }, 0);

        const totalVariableCosts =
            productValue + courierValue + platformValue + marketingValue + additionalCostsTotal;

        const hasValidInput = totalVariableCosts > 0;

        return {
            totalVariableCosts,
            hasValidInput,
        };
    }, [productCost, courierCost, platformFee, marketingCost, additionalCosts]);

    const handleReset = useCallback(() => {
        resetCurrency();
        setProductCost("");
        setCourierCost("");
        setPlatformFee("");
        setMarketingCost("");
        setAdditionalCosts([]);
    }, [resetCurrency]);

    const canAddMoreCosts = additionalCosts.length < MAX_ADDITIONAL_COSTS;

    return {
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
        maxAdditionalCosts: MAX_ADDITIONAL_COSTS,
    };
}
