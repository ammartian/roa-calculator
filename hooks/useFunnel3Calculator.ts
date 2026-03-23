"use client";

import { useCallback, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/calculations";
import {
    computeFunnel3,
    type Funnel3Computation,
} from "@/lib/funnelBudgetCalculations";
import { sanitizeDecimalInput } from "@/lib/formatting";

export interface UseFunnel3CalculatorReturn {
    targetMonthlyCommission: string;
    commissionPerNewClient: string;
    showUpRate: string;
    closingRateWebinar: string;
    cogs: string;
    marketingBudgetPercent: string;
    handleTargetMonthlyCommissionChange: (value: string) => void;
    handleCommissionPerNewClientChange: (value: string) => void;
    handleShowUpRateChange: (value: string) => void;
    handleClosingRateWebinarChange: (value: string) => void;
    handleCogsChange: (value: string) => void;
    handleMarketingBudgetPercentChange: (value: string) => void;
    results: Funnel3Computation;
    handleReset: () => void;
}

export function useFunnel3Calculator(): UseFunnel3CalculatorReturn {
    const [targetMonthlyCommission, setTargetMonthlyCommission] =
        useState<string>("");
    const [commissionPerNewClient, setCommissionPerNewClient] =
        useState<string>("");
    const [showUpRate, setShowUpRate] = useState<string>("");
    const [closingRateWebinar, setClosingRateWebinar] = useState<string>("");
    const [cogs, setCogs] = useState<string>("");
    const [marketingBudgetPercent, setMarketingBudgetPercent] =
        useState<string>("");

    const handleTargetMonthlyCommissionChange = useCallback((value: string) => {
        setTargetMonthlyCommission(sanitizeDecimalInput(value));
    }, []);

    const handleCommissionPerNewClientChange = useCallback((value: string) => {
        setCommissionPerNewClient(sanitizeDecimalInput(value));
    }, []);

    const handleShowUpRateChange = useCallback((value: string) => {
        setShowUpRate(sanitizeDecimalInput(value));
    }, []);

    const handleClosingRateWebinarChange = useCallback((value: string) => {
        setClosingRateWebinar(sanitizeDecimalInput(value));
    }, []);

    const handleCogsChange = useCallback((value: string) => {
        setCogs(sanitizeDecimalInput(value));
    }, []);

    const handleMarketingBudgetPercentChange = useCallback((value: string) => {
        setMarketingBudgetPercent(sanitizeDecimalInput(value));
    }, []);

    const results: Funnel3Computation = useMemo(() => {
        return computeFunnel3(
            parseCurrency(targetMonthlyCommission),
            parseCurrency(commissionPerNewClient),
            parseCurrency(showUpRate),
            parseCurrency(closingRateWebinar),
            parseCurrency(cogs),
            parseCurrency(marketingBudgetPercent)
        );
    }, [
        targetMonthlyCommission,
        commissionPerNewClient,
        showUpRate,
        closingRateWebinar,
        cogs,
        marketingBudgetPercent,
    ]);

    const handleReset = useCallback(() => {
        setTargetMonthlyCommission("");
        setCommissionPerNewClient("");
        setShowUpRate("");
        setClosingRateWebinar("");
        setCogs("");
        setMarketingBudgetPercent("");
    }, []);

    return {
        targetMonthlyCommission,
        commissionPerNewClient,
        showUpRate,
        closingRateWebinar,
        cogs,
        marketingBudgetPercent,
        handleTargetMonthlyCommissionChange,
        handleCommissionPerNewClientChange,
        handleShowUpRateChange,
        handleClosingRateWebinarChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    };
}
