"use client";

import { useState, useMemo, useCallback } from "react";
import type { CostField, CalculatorResults } from "@/types";
import {
  parseCurrency,
  calculateExclTax,
  calculateTotalCosts,
  calculateBreakEvenROAS,
  calculateProfitMargin,
} from "@/lib/calculations";
import { formatDecimalInput } from "@/lib/calculations";

const INITIAL_COST_FIELD: CostField = { value: "", tax: "" };

export function useCalculator() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [masterTax, setMasterTax] = useState<string>("");
  const [costOfGoods, setCostOfGoods] = useState<CostField>(INITIAL_COST_FIELD);
  const [shippingCosts, setShippingCosts] = useState<CostField>(INITIAL_COST_FIELD);
  const [transactionCosts, setTransactionCosts] = useState<CostField>(INITIAL_COST_FIELD);
  const [otherCosts, setOtherCosts] = useState<CostField>(INITIAL_COST_FIELD);
  const [revenue, setRevenue] = useState<CostField>(INITIAL_COST_FIELD);

  const handleMasterTaxChange = useCallback((newValue: string) => {
    const formatted = formatDecimalInput(newValue);
    setMasterTax(formatted);
    setCostOfGoods((prev) => ({ ...prev, tax: formatted }));
    setShippingCosts((prev) => ({ ...prev, tax: formatted }));
    setTransactionCosts((prev) => ({ ...prev, tax: formatted }));
    setOtherCosts((prev) => ({ ...prev, tax: formatted }));
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

    const totalCosts = calculateTotalCosts(
      costOfGoodsExcl,
      shippingExcl,
      transactionExcl,
      otherExcl
    );

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
  }, [costOfGoods, shippingCosts, transactionCosts, otherCosts, revenue]);

  const handleReset = useCallback(() => {
    setMasterTax("");
    setCostOfGoods(INITIAL_COST_FIELD);
    setShippingCosts(INITIAL_COST_FIELD);
    setTransactionCosts(INITIAL_COST_FIELD);
    setOtherCosts(INITIAL_COST_FIELD);
    setRevenue(INITIAL_COST_FIELD);
  }, []);

  return {
    selectedCurrency,
    setSelectedCurrency,
    masterTax,
    costOfGoods,
    shippingCosts,
    transactionCosts,
    otherCosts,
    revenue,
    handleMasterTaxChange,
    handleFieldChange,
    setCostOfGoods,
    setShippingCosts,
    setTransactionCosts,
    setOtherCosts,
    setRevenue,
    results,
    handleReset,
  };
}
