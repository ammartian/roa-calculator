"use client";

import { useCallback, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/calculations";
import {
    computeFunnel5,
    type Funnel5Computation,
} from "@/lib/funnelBudgetCalculations";
import { sanitizeDecimalInput } from "@/lib/formatting";

export interface UseFunnel5CalculatorReturn {
    targetSales: string;
    aov: string;
    grossProfitMarginPerProduct: string;
    cogs: string;
    addToCartRate: string;
    conversionRate: string;
    repurchaseValue: string;
    repurchaseFrequency: string;
    marketingBudgetPercent: string;
    handleTargetSalesChange: (value: string) => void;
    handleAovChange: (value: string) => void;
    handleGrossProfitMarginPerProductChange: (value: string) => void;
    handleCogsChange: (value: string) => void;
    handleAddToCartRateChange: (value: string) => void;
    handleConversionRateChange: (value: string) => void;
    handleRepurchaseValueChange: (value: string) => void;
    handleRepurchaseFrequencyChange: (value: string) => void;
    handleMarketingBudgetPercentChange: (value: string) => void;
    results: Funnel5Computation;
    handleReset: () => void;
}

export function useFunnel5Calculator(): UseFunnel5CalculatorReturn {
    const [targetSales, setTargetSales] = useState<string>("");
    const [aov, setAov] = useState<string>("");
    const [grossProfitMarginPerProduct, setGrossProfitMarginPerProduct] =
        useState<string>("");
    const [cogs, setCogs] = useState<string>("");
    const [addToCartRate, setAddToCartRate] = useState<string>("");
    const [conversionRate, setConversionRate] = useState<string>("");
    const [repurchaseValue, setRepurchaseValue] = useState<string>("");
    const [repurchaseFrequency, setRepurchaseFrequency] = useState<string>("");
    const [marketingBudgetPercent, setMarketingBudgetPercent] =
        useState<string>("");

    const handleTargetSalesChange = useCallback((value: string) => {
        setTargetSales(sanitizeDecimalInput(value));
    }, []);

    const handleAovChange = useCallback((value: string) => {
        setAov(sanitizeDecimalInput(value));
    }, []);

    const handleGrossProfitMarginPerProductChange = useCallback(
        (value: string) => {
            setGrossProfitMarginPerProduct(sanitizeDecimalInput(value));
        },
        []
    );

    const handleCogsChange = useCallback((value: string) => {
        setCogs(sanitizeDecimalInput(value));
    }, []);

    const handleAddToCartRateChange = useCallback((value: string) => {
        setAddToCartRate(sanitizeDecimalInput(value));
    }, []);

    const handleConversionRateChange = useCallback((value: string) => {
        setConversionRate(sanitizeDecimalInput(value));
    }, []);

    const handleRepurchaseValueChange = useCallback((value: string) => {
        setRepurchaseValue(sanitizeDecimalInput(value));
    }, []);

    const handleRepurchaseFrequencyChange = useCallback((value: string) => {
        setRepurchaseFrequency(sanitizeDecimalInput(value));
    }, []);

    const handleMarketingBudgetPercentChange = useCallback((value: string) => {
        setMarketingBudgetPercent(sanitizeDecimalInput(value));
    }, []);

    const results: Funnel5Computation = useMemo(() => {
        return computeFunnel5(
            parseCurrency(targetSales),
            parseCurrency(aov),
            parseCurrency(grossProfitMarginPerProduct),
            parseCurrency(addToCartRate),
            parseCurrency(conversionRate),
            parseCurrency(repurchaseValue),
            parseCurrency(repurchaseFrequency),
            parseCurrency(marketingBudgetPercent)
        );
    }, [
        targetSales,
        aov,
        grossProfitMarginPerProduct,
        addToCartRate,
        conversionRate,
        repurchaseValue,
        repurchaseFrequency,
        marketingBudgetPercent,
    ]);

    const handleReset = useCallback(() => {
        setTargetSales("");
        setAov("");
        setGrossProfitMarginPerProduct("");
        setCogs("");
        setAddToCartRate("");
        setConversionRate("");
        setRepurchaseValue("");
        setRepurchaseFrequency("");
        setMarketingBudgetPercent("");
    }, []);

    return {
        targetSales,
        aov,
        grossProfitMarginPerProduct,
        cogs,
        addToCartRate,
        conversionRate,
        repurchaseValue,
        repurchaseFrequency,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handleAovChange,
        handleGrossProfitMarginPerProductChange,
        handleCogsChange,
        handleAddToCartRateChange,
        handleConversionRateChange,
        handleRepurchaseValueChange,
        handleRepurchaseFrequencyChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    };
}
