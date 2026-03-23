"use client";

import { useCallback, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/calculations";
import {
    computeFunnel7,
    type Funnel7Computation,
} from "@/lib/funnelBudgetCalculations";
import { sanitizeDecimalInput } from "@/lib/formatting";

export interface UseFunnel7CalculatorReturn {
    targetSales: string;
    aov: string;
    conversionRate: string;
    cogs: string;
    marketingBudgetPercent: string;
    handleTargetSalesChange: (value: string) => void;
    handleAovChange: (value: string) => void;
    handleConversionRateChange: (value: string) => void;
    handleCogsChange: (value: string) => void;
    handleMarketingBudgetPercentChange: (value: string) => void;
    results: Funnel7Computation;
    handleReset: () => void;
}

export function useFunnel7Calculator(): UseFunnel7CalculatorReturn {
    const [targetSales, setTargetSales] = useState<string>("");
    const [aov, setAov] = useState<string>("");
    const [conversionRate, setConversionRate] = useState<string>("");
    const [cogs, setCogs] = useState<string>("");
    const [marketingBudgetPercent, setMarketingBudgetPercent] =
        useState<string>("");

    const handleTargetSalesChange = useCallback((value: string) => {
        setTargetSales(sanitizeDecimalInput(value));
    }, []);

    const handleAovChange = useCallback((value: string) => {
        setAov(sanitizeDecimalInput(value));
    }, []);

    const handleConversionRateChange = useCallback((value: string) => {
        setConversionRate(sanitizeDecimalInput(value));
    }, []);

    const handleCogsChange = useCallback((value: string) => {
        setCogs(sanitizeDecimalInput(value));
    }, []);

    const handleMarketingBudgetPercentChange = useCallback((value: string) => {
        setMarketingBudgetPercent(sanitizeDecimalInput(value));
    }, []);

    const results: Funnel7Computation = useMemo(() => {
        return computeFunnel7(
            parseCurrency(targetSales),
            parseCurrency(aov),
            parseCurrency(conversionRate),
            parseCurrency(cogs),
            parseCurrency(marketingBudgetPercent)
        );
    }, [targetSales, aov, conversionRate, cogs, marketingBudgetPercent]);

    const handleReset = useCallback(() => {
        setTargetSales("");
        setAov("");
        setConversionRate("");
        setCogs("");
        setMarketingBudgetPercent("");
    }, []);

    return {
        targetSales,
        aov,
        conversionRate,
        cogs,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handleAovChange,
        handleConversionRateChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    };
}
