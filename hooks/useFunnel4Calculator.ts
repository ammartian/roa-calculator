"use client";

import { useCallback, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/calculations";
import {
    computeFunnel4,
    type Funnel4Computation,
} from "@/lib/funnelBudgetCalculations";
import { sanitizeDecimalInput } from "@/lib/formatting";

export interface UseFunnel4CalculatorReturn {
    targetSales: string;
    packagePrice: string;
    ticketPrice: string;
    closingRate: string;
    showUpRate: string;
    cogs: string;
    marketingBudgetPercent: string;
    handleTargetSalesChange: (value: string) => void;
    handlePackagePriceChange: (value: string) => void;
    handleTicketPriceChange: (value: string) => void;
    handleClosingRateChange: (value: string) => void;
    handleShowUpRateChange: (value: string) => void;
    handleCogsChange: (value: string) => void;
    handleMarketingBudgetPercentChange: (value: string) => void;
    results: Funnel4Computation;
    handleReset: () => void;
}

export function useFunnel4Calculator(): UseFunnel4CalculatorReturn {
    const [targetSales, setTargetSales] = useState<string>("");
    const [packagePrice, setPackagePrice] = useState<string>("");
    const [ticketPrice, setTicketPrice] = useState<string>("");
    const [closingRate, setClosingRate] = useState<string>("");
    const [showUpRate, setShowUpRate] = useState<string>("");
    const [cogs, setCogs] = useState<string>("");
    const [marketingBudgetPercent, setMarketingBudgetPercent] =
        useState<string>("");

    const handleTargetSalesChange = useCallback((value: string) => {
        setTargetSales(sanitizeDecimalInput(value));
    }, []);

    const handlePackagePriceChange = useCallback((value: string) => {
        setPackagePrice(sanitizeDecimalInput(value));
    }, []);

    const handleTicketPriceChange = useCallback((value: string) => {
        setTicketPrice(sanitizeDecimalInput(value));
    }, []);

    const handleClosingRateChange = useCallback((value: string) => {
        setClosingRate(sanitizeDecimalInput(value));
    }, []);

    const handleShowUpRateChange = useCallback((value: string) => {
        setShowUpRate(sanitizeDecimalInput(value));
    }, []);

    const handleCogsChange = useCallback((value: string) => {
        setCogs(sanitizeDecimalInput(value));
    }, []);

    const handleMarketingBudgetPercentChange = useCallback((value: string) => {
        setMarketingBudgetPercent(sanitizeDecimalInput(value));
    }, []);

    const results: Funnel4Computation = useMemo(() => {
        return computeFunnel4(
            parseCurrency(targetSales),
            parseCurrency(packagePrice),
            parseCurrency(ticketPrice),
            parseCurrency(closingRate),
            parseCurrency(showUpRate),
            parseCurrency(cogs),
            parseCurrency(marketingBudgetPercent)
        );
    }, [
        targetSales,
        packagePrice,
        ticketPrice,
        closingRate,
        showUpRate,
        cogs,
        marketingBudgetPercent,
    ]);

    const handleReset = useCallback(() => {
        setTargetSales("");
        setPackagePrice("");
        setTicketPrice("");
        setClosingRate("");
        setShowUpRate("");
        setCogs("");
        setMarketingBudgetPercent("");
    }, []);

    return {
        targetSales,
        packagePrice,
        ticketPrice,
        closingRate,
        showUpRate,
        cogs,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handlePackagePriceChange,
        handleTicketPriceChange,
        handleClosingRateChange,
        handleShowUpRateChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    };
}
