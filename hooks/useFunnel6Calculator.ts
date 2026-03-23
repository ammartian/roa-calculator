"use client";

import { useCallback, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/calculations";
import {
    computeFunnel6,
    type Funnel6Computation,
} from "@/lib/funnelBudgetCalculations";
import { sanitizeDecimalInput } from "@/lib/formatting";

export interface UseFunnel6CalculatorReturn {
    targetSales: string;
    aov: string;
    leadsToAppointmentRate: string;
    appointmentToCustomerRate: string;
    cogs: string;
    marketingBudgetPercent: string;
    handleTargetSalesChange: (value: string) => void;
    handleAovChange: (value: string) => void;
    handleLeadsToAppointmentRateChange: (value: string) => void;
    handleAppointmentToCustomerRateChange: (value: string) => void;
    handleCogsChange: (value: string) => void;
    handleMarketingBudgetPercentChange: (value: string) => void;
    results: Funnel6Computation;
    handleReset: () => void;
}

export function useFunnel6Calculator(): UseFunnel6CalculatorReturn {
    const [targetSales, setTargetSales] = useState<string>("");
    const [aov, setAov] = useState<string>("");
    const [leadsToAppointmentRate, setLeadsToAppointmentRate] =
        useState<string>("");
    const [appointmentToCustomerRate, setAppointmentToCustomerRate] =
        useState<string>("");
    const [cogs, setCogs] = useState<string>("");
    const [marketingBudgetPercent, setMarketingBudgetPercent] =
        useState<string>("");

    const handleTargetSalesChange = useCallback((value: string) => {
        setTargetSales(sanitizeDecimalInput(value));
    }, []);

    const handleAovChange = useCallback((value: string) => {
        setAov(sanitizeDecimalInput(value));
    }, []);

    const handleLeadsToAppointmentRateChange = useCallback((value: string) => {
        setLeadsToAppointmentRate(sanitizeDecimalInput(value));
    }, []);

    const handleAppointmentToCustomerRateChange = useCallback(
        (value: string) => {
            setAppointmentToCustomerRate(sanitizeDecimalInput(value));
        },
        []
    );

    const handleCogsChange = useCallback((value: string) => {
        setCogs(sanitizeDecimalInput(value));
    }, []);

    const handleMarketingBudgetPercentChange = useCallback((value: string) => {
        setMarketingBudgetPercent(sanitizeDecimalInput(value));
    }, []);

    const results: Funnel6Computation = useMemo(() => {
        return computeFunnel6(
            parseCurrency(targetSales),
            parseCurrency(aov),
            parseCurrency(leadsToAppointmentRate),
            parseCurrency(appointmentToCustomerRate),
            parseCurrency(cogs),
            parseCurrency(marketingBudgetPercent)
        );
    }, [
        targetSales,
        aov,
        leadsToAppointmentRate,
        appointmentToCustomerRate,
        cogs,
        marketingBudgetPercent,
    ]);

    const handleReset = useCallback(() => {
        setTargetSales("");
        setAov("");
        setLeadsToAppointmentRate("");
        setAppointmentToCustomerRate("");
        setCogs("");
        setMarketingBudgetPercent("");
    }, []);

    return {
        targetSales,
        aov,
        leadsToAppointmentRate,
        appointmentToCustomerRate,
        cogs,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handleAovChange,
        handleLeadsToAppointmentRateChange,
        handleAppointmentToCustomerRateChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    };
}
