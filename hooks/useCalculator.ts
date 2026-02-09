"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { CostField, CalculatorResults, CustomCostField } from "@/types";
import {
  parseCurrency,
  calculateExclTax,
  calculateTotalCosts,
  calculateBreakEvenROAS,
  calculateProfitMargin,
} from "@/lib/calculations";
import { formatDecimalInput } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";

const INITIAL_COST_FIELD: CostField = { value: "", tax: "" };

function getDefaultCurrency(language: string): string {
  return language === "ms" ? "MYR" : "USD";
}

export function useCalculator() {
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

  const [masterTax, setMasterTax] = useState<string>("");
  const [costOfGoods, setCostOfGoods] = useState<CostField>(INITIAL_COST_FIELD);
  const [shippingCosts, setShippingCosts] = useState<CostField>(INITIAL_COST_FIELD);
  const [transactionCosts, setTransactionCosts] = useState<CostField>(INITIAL_COST_FIELD);
  const [otherCosts, setOtherCosts] = useState<CostField>(INITIAL_COST_FIELD);
  const [customCosts, setCustomCosts] = useState<CustomCostField[]>([]);
  const [revenue, setRevenue] = useState<CostField>(INITIAL_COST_FIELD);

  const MAX_CUSTOM_COSTS = 10;

  const addCustomCost = useCallback((title: string) => {
    if (customCosts.length >= MAX_CUSTOM_COSTS) return;
    
    const newCustomCost: CustomCostField = {
      id: crypto.randomUUID(),
      title: title.trim(),
      value: "",
      tax: masterTax,
    };
    setCustomCosts((prev) => [...prev, newCustomCost]);
  }, [customCosts.length, masterTax]);

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

  const resetCustomCostValues = useCallback(() => {
    setCustomCosts((prev) =>
      prev.map((cost) => ({
        ...cost,
        value: "",
        tax: masterTax,
      }))
    );
  }, [masterTax]);

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
    (setter: React.Dispatch<React.SetStateAction<CostField>>, field: keyof CostField) =>
      (newValue: string) => {
        const formatted = formatDecimalInput(newValue);
        setter((prev) => ({ ...prev, [field]: formatted }));
      },
    []
  );

  const results: CalculatorResults = useMemo(() => {
    const costOfGoodsExcl = calculateExclTax(
      parseCurrency(costOfGoods.value),
      parseFloat(costOfGoods.tax) || 0
    );
    const shippingExcl = calculateExclTax(
      parseCurrency(shippingCosts.value),
      parseFloat(shippingCosts.tax) || 0
    );
    const transactionExcl = calculateExclTax(
      parseCurrency(transactionCosts.value),
      parseFloat(transactionCosts.tax) || 0
    );
    const otherExcl = calculateExclTax(
      parseCurrency(otherCosts.value),
      parseFloat(otherCosts.tax) || 0
    );

    // Calculate custom costs total
    const customCostsTotal = customCosts.reduce((sum, cost) => {
      const costExcl = calculateExclTax(
        parseCurrency(cost.value),
        parseFloat(cost.tax) || 0
      );
      return sum + costExcl;
    }, 0);

    const baseTotalCosts = calculateTotalCosts(
      costOfGoodsExcl,
      shippingExcl,
      transactionExcl,
      otherExcl
    );

    const totalCosts = baseTotalCosts + customCostsTotal;

    const totalRevenue = calculateExclTax(
      parseCurrency(revenue.value),
      parseFloat(revenue.tax) || 0
    );

    const profitPerUnit = totalRevenue - totalCosts;
    const breakEvenROAS = calculateBreakEvenROAS(totalRevenue, totalCosts);
    const profitMarginPercent = calculateProfitMargin(profitPerUnit, totalRevenue);
    const maxAdSpendForBreakEven = profitPerUnit;

    return {
      totalCosts,
      totalRevenue,
      breakEvenROAS,
      profitPerUnit,
      profitMarginPercent,
      maxAdSpendForBreakEven,
    };
  }, [costOfGoods, shippingCosts, transactionCosts, otherCosts, customCosts, revenue]);

  const handleReset = useCallback(() => {
    hasManuallyChangedCurrency.current = false;
    setSelectedCurrency(getDefaultCurrency(language));
    setMasterTax("");
    setCostOfGoods(INITIAL_COST_FIELD);
    setShippingCosts(INITIAL_COST_FIELD);
    setTransactionCosts(INITIAL_COST_FIELD);
    setOtherCosts(INITIAL_COST_FIELD);
    // Reset custom cost values but keep the custom costs themselves
    setCustomCosts((prev) =>
      prev.map((cost) => ({
        ...cost,
        value: "",
        tax: "",
      }))
    );
    setRevenue(INITIAL_COST_FIELD);
  }, [language]);

  return {
    selectedCurrency,
    setSelectedCurrency: handleCurrencyChange,
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
    resetCustomCostValues,
    maxCustomCosts: MAX_CUSTOM_COSTS,
    results,
    handleReset,
  };
}
