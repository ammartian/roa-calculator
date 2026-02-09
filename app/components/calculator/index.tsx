"use client";

import { useMemo } from "react";
import { currencies } from "@/lib/currencies";
import { useCalculator } from "@/hooks/useCalculator";
import { formatCurrency, getCurrencySymbol } from "@/lib/calculations";
import { useLanguage } from "@/lib/i18n/context";
import { CostSection } from "./CostSection";
import { RevenueSection } from "./RevenueSection";
import { ResultsSection } from "./ResultsSection";

export default function Calculator() {
  const { t } = useLanguage();
  const {
    selectedCurrency,
    setSelectedCurrency,
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
    maxCustomCosts,
    results,
    handleReset,
  } = useCalculator();

  const currencySymbol = useMemo(
    () => getCurrencySymbol(currencies, selectedCurrency),
    [selectedCurrency]
  );

  const formatCurrencyWithSelected = (value: number): string =>
    formatCurrency(value, selectedCurrency);

  return (
    <div className="w-full max-w-xl md:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <CostSection
        translations={t.calculator.costs}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        masterTax={masterTax}
        onMasterTaxChange={handleMasterTaxChange}
        costOfGoods={costOfGoods}
        onCostOfGoodsValueChange={handleFieldChange(setCostOfGoods, "value")}
        onCostOfGoodsTaxChange={handleFieldChange(setCostOfGoods, "tax")}
        shippingCosts={shippingCosts}
        onShippingCostsValueChange={handleFieldChange(setShippingCosts, "value")}
        onShippingCostsTaxChange={handleFieldChange(setShippingCosts, "tax")}
        transactionCosts={transactionCosts}
        onTransactionCostsValueChange={handleFieldChange(
          setTransactionCosts,
          "value"
        )}
        onTransactionCostsTaxChange={handleFieldChange(
          setTransactionCosts,
          "tax"
        )}
        otherCosts={otherCosts}
        onOtherCostsValueChange={handleFieldChange(setOtherCosts, "value")}
        onOtherCostsTaxChange={handleFieldChange(setOtherCosts, "tax")}
        customCosts={customCosts}
        onAddCustomCost={addCustomCost}
        onRemoveCustomCost={removeCustomCost}
        onUpdateCustomCost={updateCustomCost}
        maxCustomCosts={maxCustomCosts}
        totalCosts={results.totalCosts}
        currencySymbol={currencySymbol}
        formatCurrency={formatCurrencyWithSelected}
      />

      <div className="space-y-6">
        <RevenueSection
          translations={t.calculator.revenue}
          revenue={revenue}
          onRevenueValueChange={handleFieldChange(setRevenue, "value")}
          onRevenueTaxChange={handleFieldChange(setRevenue, "tax")}
          totalRevenue={results.totalRevenue}
          currencySymbol={currencySymbol}
          formatCurrency={formatCurrencyWithSelected}
        />

        <ResultsSection
          translations={t.calculator.results}
          results={results}
          formatCurrency={formatCurrencyWithSelected}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
