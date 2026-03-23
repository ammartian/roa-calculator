"use client";

import { useCallback, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/calculations";
import {
    computeFunnel2,
    type Funnel2Computation,
} from "@/lib/funnelBudgetCalculations";
import { sanitizeDecimalInput } from "@/lib/formatting";

export interface UseFunnel2CalculatorReturn {
    registrationFee: string;
    targetAgents: string;
    conversionRate: string;
    activeAgentPercent: string;
    restockValue: string;
    restockFrequency: string;
    marketingBudgetPercent: string;
    handleRegistrationFeeChange: (value: string) => void;
    handleTargetAgentsChange: (value: string) => void;
    handleConversionRateChange: (value: string) => void;
    handleActiveAgentPercentChange: (value: string) => void;
    handleRestockValueChange: (value: string) => void;
    handleRestockFrequencyChange: (value: string) => void;
    handleMarketingBudgetPercentChange: (value: string) => void;
    results: Funnel2Computation;
    handleReset: () => void;
}

export function useFunnel2Calculator(): UseFunnel2CalculatorReturn {
    const [registrationFee, setRegistrationFee] = useState<string>("");
    const [targetAgents, setTargetAgents] = useState<string>("");
    const [conversionRate, setConversionRate] = useState<string>("");
    const [activeAgentPercent, setActiveAgentPercent] = useState<string>("");
    const [restockValue, setRestockValue] = useState<string>("");
    const [restockFrequency, setRestockFrequency] = useState<string>("");
    const [marketingBudgetPercent, setMarketingBudgetPercent] =
        useState<string>("");

    const handleRegistrationFeeChange = useCallback((value: string) => {
        setRegistrationFee(sanitizeDecimalInput(value));
    }, []);

    const handleTargetAgentsChange = useCallback((value: string) => {
        setTargetAgents(sanitizeDecimalInput(value));
    }, []);

    const handleConversionRateChange = useCallback((value: string) => {
        setConversionRate(sanitizeDecimalInput(value));
    }, []);

    const handleActiveAgentPercentChange = useCallback((value: string) => {
        setActiveAgentPercent(sanitizeDecimalInput(value));
    }, []);

    const handleRestockValueChange = useCallback((value: string) => {
        setRestockValue(sanitizeDecimalInput(value));
    }, []);

    const handleRestockFrequencyChange = useCallback((value: string) => {
        setRestockFrequency(sanitizeDecimalInput(value));
    }, []);

    const handleMarketingBudgetPercentChange = useCallback((value: string) => {
        setMarketingBudgetPercent(sanitizeDecimalInput(value));
    }, []);

    const results: Funnel2Computation = useMemo(() => {
        return computeFunnel2(
            parseCurrency(registrationFee),
            parseCurrency(targetAgents),
            parseCurrency(conversionRate),
            parseCurrency(activeAgentPercent),
            parseCurrency(restockValue),
            parseCurrency(restockFrequency),
            parseCurrency(marketingBudgetPercent)
        );
    }, [
        registrationFee,
        targetAgents,
        conversionRate,
        activeAgentPercent,
        restockValue,
        restockFrequency,
        marketingBudgetPercent,
    ]);

    const handleReset = useCallback(() => {
        setRegistrationFee("");
        setTargetAgents("");
        setConversionRate("");
        setActiveAgentPercent("");
        setRestockValue("");
        setRestockFrequency("");
        setMarketingBudgetPercent("");
    }, []);

    return {
        registrationFee,
        targetAgents,
        conversionRate,
        activeAgentPercent,
        restockValue,
        restockFrequency,
        marketingBudgetPercent,
        handleRegistrationFeeChange,
        handleTargetAgentsChange,
        handleConversionRateChange,
        handleActiveAgentPercentChange,
        handleRestockValueChange,
        handleRestockFrequencyChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    };
}
