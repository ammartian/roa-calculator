import { useState, useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

export type CurrencyCode = string;

export function getDefaultCurrency(language: string): CurrencyCode {
    return language === "ms" ? "MYR" : "USD";
}

export interface UseCalculatorCurrencyReturn {
    selectedCurrency: CurrencyCode;
    setSelectedCurrency: (currency: CurrencyCode) => void;
    resetCurrency: () => void;
}

export function useCalculatorCurrency(): UseCalculatorCurrencyReturn {
    const { language } = useLanguage();
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() =>
        getDefaultCurrency(language)
    );
    const hasManuallyChangedCurrency = useRef(false);

    useEffect(() => {
        if (!hasManuallyChangedCurrency.current) {
            const defaultCurrency = getDefaultCurrency(language);
            queueMicrotask(() => setSelectedCurrency(defaultCurrency));
        }
    }, [language]);

    const handleCurrencyChange = useCallback((currency: CurrencyCode) => {
        hasManuallyChangedCurrency.current = true;
        setSelectedCurrency(currency);
    }, []);

    const resetCurrency = useCallback(() => {
        hasManuallyChangedCurrency.current = false;
        setSelectedCurrency(getDefaultCurrency(language));
    }, [language]);

    return {
        selectedCurrency,
        setSelectedCurrency: handleCurrencyChange,
        resetCurrency,
    };
}
