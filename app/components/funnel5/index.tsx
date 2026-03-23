"use client";

import { useFunnel5Calculator } from "@/hooks/useFunnel5Calculator";
import { useT } from "@/lib/i18n/useT";
import { InputsSection } from "./InputsSection";
import { ResultsSection } from "./ResultsSection";

export default function Funnel5Calculator() {
    const t = useT();
    const {
        targetSales,
        aov,
        grossProfitMarginPerProduct,
        cogs,
        addToCartRate,
        conversionRate,
        repurchaseValue,
        repurchaseFrequency,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handleAovChange,
        handleGrossProfitMarginPerProductChange,
        handleCogsChange,
        handleAddToCartRateChange,
        handleConversionRateChange,
        handleRepurchaseValueChange,
        handleRepurchaseFrequencyChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    } = useFunnel5Calculator();

    return (
        <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
            <InputsSection
                translations={t.funnel5}
                targetSales={targetSales}
                aov={aov}
                grossProfitMarginPerProduct={grossProfitMarginPerProduct}
                cogs={cogs}
                addToCartRate={addToCartRate}
                conversionRate={conversionRate}
                repurchaseValue={repurchaseValue}
                repurchaseFrequency={repurchaseFrequency}
                marketingBudgetPercent={marketingBudgetPercent}
                onTargetSalesChange={handleTargetSalesChange}
                onAovChange={handleAovChange}
                onGrossProfitMarginPerProductChange={
                    handleGrossProfitMarginPerProductChange
                }
                onCogsChange={handleCogsChange}
                onAddToCartRateChange={handleAddToCartRateChange}
                onConversionRateChange={handleConversionRateChange}
                onRepurchaseValueChange={handleRepurchaseValueChange}
                onRepurchaseFrequencyChange={handleRepurchaseFrequencyChange}
                onMarketingBudgetPercentChange={handleMarketingBudgetPercentChange}
            />
            <ResultsSection
                translations={t.funnel5}
                results={results}
                onReset={handleReset}
            />
        </div>
    );
}
