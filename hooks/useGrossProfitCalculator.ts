"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { parseCurrency } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";

function getDefaultCurrency(language: string): string {
  return language === "ms" ? "MYR" : "USD";
}

export interface GrossProfitResults {
  grossProfit: number;
  markupPercent: number;
  grossMarginPercent: number;
  isProfitable: boolean;
  hasValidInput: boolean;
}

export function useGrossProfitCalculator() {
  const { language } = useLanguage();
  const [selectedCurrency, setSelectedCurrency] = useState<string>(() => getDefaultCurrency(language));
  const hasManuallyChangedCurrency = useRef(false);

  // Update currency when language changes (unless user manually selected)
  useEffect(() => {
    if (!hasManuallyChangedCurrency.current) {
      const defaultCurrency = getDefaultCurrency(language);
      queueMicrotask(() => setSelectedCurrency(defaultCurrency));
    }
  }, [language]);

  const handleCurrencyChange = useCallback((currency: string) => {
    hasManuallyChangedCurrency.current = true;
    setSelectedCurrency(currency);
  }, []);

  const [cogs, setCogs] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");

  const handleCogsChange = useCallback((value: string) => {
    // Allow only numbers and decimal point
    const sanitized = value.replace(/[^0-9.]/g, "");
    // Prevent multiple decimal points
    const parts = sanitized.split(".");
    const formatted = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
    setCogs(formatted);
  }, []);

  const handleSellingPriceChange = useCallback((value: string) => {
    // Allow only numbers and decimal point
    const sanitized = value.replace(/[^0-9.]/g, "");
    // Prevent multiple decimal points
    const parts = sanitized.split(".");
    const formatted = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
    setSellingPrice(formatted);
  }, []);

  const results: GrossProfitResults = useMemo(() => {
    const cogsValue = parseCurrency(cogs);
    const sellingPriceValue = parseCurrency(sellingPrice);

    const hasValidInput = cogsValue > 0 && sellingPriceValue > 0;

    if (!hasValidInput) {
      return {
        grossProfit: 0,
        markupPercent: 0,
        grossMarginPercent: 0,
        isProfitable: false,
        hasValidInput: false,
      };
    }

    const grossProfit = sellingPriceValue - cogsValue;
    const markupPercent = cogsValue > 0 ? (grossProfit / cogsValue) * 100 : 0;
    const grossMarginPercent = sellingPriceValue > 0 ? (grossProfit / sellingPriceValue) * 100 : 0;

    return {
      grossProfit,
      markupPercent,
      grossMarginPercent,
      isProfitable: grossProfit > 0,
      hasValidInput: true,
    };
  }, [cogs, sellingPrice]);

  const handleReset = useCallback(() => {
    hasManuallyChangedCurrency.current = false;
    setSelectedCurrency(getDefaultCurrency(language));
    setCogs("");
    setSellingPrice("");
  }, [language]);

  return {
    selectedCurrency,
    setSelectedCurrency: handleCurrencyChange,
    cogs,
    sellingPrice,
    handleCogsChange,
    handleSellingPriceChange,
    results,
    handleReset,
  };
}
