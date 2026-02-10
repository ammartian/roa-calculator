"use client";

import { useState, useMemo, useCallback } from "react";
import type { CostField, CalculatorResults, CustomCostField } from "@/types";
import {
    parseCurrency,
    calculateExclTax,
    calculateTotalCosts,
    calculateBreakEvenROAS,
    calculateProfitMargin,
} from "@/lib/calculations";
import { formatDecimalInput } from "@/lib/formatting";
import { useCalculatorCurrency } from "./useCalculatorCurrency";

const INITIAL_COST_FIELD: CostField = { value: "", tax: "" };
const MAX_CUSTOM_COSTS = 10;

function calculateCostExclTax(costField: CostField): number {
    return calculateExclTax(
        parseCurrency(costField.value),
        parseFloat(costField.tax) || 0
    );
}

export interface UseROACalculatorReturn {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    masterTax: string;
    costOfGoods: CostField;
    shippingCosts: CostField;
    transactionCosts: CostField;
    otherCosts: CostField;
    customCosts: CustomCostField[];
    revenue: CostField;
    handleMasterTaxChange: (value: string) => void;
    handleFieldChange: (
        setter: React.Dispatch<React.SetStateAction<CostField>>,
        field: keyof CostField
    ) => (newValue: string) => void;
    setCostOfGoods: React.Dispatch<React.SetStateAction<CostField>>;
    setShippingCosts: React.Dispatch<React.SetStateAction<CostField>>;
    setTransactionCosts: React.Dispatch<React.SetStateAction<CostField>>;
    setOtherCosts: React.Dispatch<React.SetStateAction<CostField>>;
    setRevenue: React.Dispatch<React.SetStateAction<CostField>>;
    addCustomCost: (title: string) => void;
    removeCustomCost: (id: string) => void;
    updateCustomCost: (
        id: string,
        field: keyof CustomCostField,
        value: string
    ) => void;
    maxCustomCosts: number;
    results: CalculatorResults;
    handleReset: () => void;
}

export function useROACalculator(): UseROACalculatorReturn {
    const { selectedCurrency, setSelectedCurrency, resetCurrency } =
        useCalculatorCurrency();

    const [masterTax, setMasterTax] = useState<string>("");
    const [costOfGoods, setCostOfGoods] = useState<CostField>(INITIAL_COST_FIELD);
    const [shippingCosts, setShippingCosts] = useState<CostField>(INITIAL_COST_FIELD);
    const [transactionCosts, setTransactionCosts] = useState<CostField>(INITIAL_COST_FIELD);
    const [otherCosts, setOtherCosts] = useState<CostField>(INITIAL_COST_FIELD);
    const [customCosts, setCustomCosts] = useState<CustomCostField[]>([]);
    const [revenue, setRevenue] = useState<CostField>(INITIAL_COST_FIELD);

    const addCustomCost = useCallback(
        (title: string) => {
            if (customCosts.length >= MAX_CUSTOM_COSTS) return;

            const newCustomCost: CustomCostField = {
                id: crypto.randomUUID(),
                title: title.trim(),
                value: "",
                tax: masterTax,
            };
            setCustomCosts((prev) => [...prev, newCustomCost]);
        },
        [customCosts.length, masterTax]
    );

    const removeCustomCost = useCallback((id: string) => {
        setCustomCosts((prev) => prev.filter((cost) => cost.id !== id));
    }, []);

    const updateCustomCost = useCallback(
        (id: string, field: keyof CustomCostField, value: string) => {
            const formatted = field === "title" ? value : formatDecimalInput(value);
            setCustomCosts((prev) =>
                prev.map((cost) =>
                    cost.id === id ? { ...cost, [field]: formatted } : cost
                )
            );
        },
        []
    );

    const handleMasterTaxChange = useCallback((newValue: string) => {
        const formatted = formatDecimalInput(newValue);
        setMasterTax(formatted);
        setCostOfGoods((prev) => ({ ...prev, tax: formatted }));
        setShippingCosts((prev) => ({ ...prev, tax: formatted }));
        setTransactionCosts((prev) => ({ ...prev, tax: formatted }));
        setOtherCosts((prev) => ({ ...prev, tax: formatted }));
        setCustomCosts((prev) =>
            prev.map((cost) => ({ ...cost, tax: formatted }))
        );
        setRevenue((prev) => ({ ...prev, tax: formatted }));
    }, []);

    const handleFieldChange = useCallback(
        (
            setter: React.Dispatch<React.SetStateAction<CostField>>,
            field: keyof CostField
        ) =>
            (newValue: string) => {
                const formatted = formatDecimalInput(newValue);
                setter((prev) => ({ ...prev, [field]: formatted }));
            },
        []
    );

    const results: CalculatorResults = useMemo(() => {
        const costOfGoodsExcl = calculateCostExclTax(costOfGoods);
        const shippingExcl = calculateCostExclTax(shippingCosts);
        const transactionExcl = calculateCostExclTax(transactionCosts);
        const otherExcl = calculateCostExclTax(otherCosts);

        const customCostsTotal = customCosts.reduce(
            (sum, cost) => sum + calculateCostExclTax(cost),
            0
        );

        const baseTotalCosts = calculateTotalCosts(
            costOfGoodsExcl,
            shippingExcl,
            transactionExcl,
            otherExcl
        );

        const totalCosts = baseTotalCosts + customCostsTotal;
        const totalRevenue = calculateCostExclTax(revenue);
        const profitPerUnit = totalRevenue - totalCosts;

        return {
            totalCosts,
            totalRevenue,
            breakEvenROAS: calculateBreakEvenROAS(totalRevenue, totalCosts),
            profitPerUnit,
            profitMarginPercent: calculateProfitMargin(profitPerUnit, totalRevenue),
            maxAdSpendForBreakEven: profitPerUnit,
        };
    }, [costOfGoods, shippingCosts, transactionCosts, otherCosts, customCosts, revenue]);

    const handleReset = useCallback(() => {
        resetCurrency();
        setMasterTax("");
        setCostOfGoods(INITIAL_COST_FIELD);
        setShippingCosts(INITIAL_COST_FIELD);
        setTransactionCosts(INITIAL_COST_FIELD);
        setOtherCosts(INITIAL_COST_FIELD);
        setCustomCosts((prev) =>
            prev.map((cost) => ({
                ...cost,
                value: "",
                tax: "",
            }))
        );
        setRevenue(INITIAL_COST_FIELD);
    }, [resetCurrency]);

    return {
        selectedCurrency,
        setSelectedCurrency,
        masterTax,
        costOfGoods,
        shippingCosts,
        transactionCosts,
        otherCosts,
        customCosts,
        revenue,
        handleMasterTaxChange,
        handleFieldChange,
        setCostOfGoods,
        setShippingCosts,
        setTransactionCosts,
        setOtherCosts,
        setRevenue,
        addCustomCost,
        removeCustomCost,
        updateCustomCost,
        maxCustomCosts: MAX_CUSTOM_COSTS,
        results,
        handleReset,
    };
}
