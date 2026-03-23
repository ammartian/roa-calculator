"use client";

import { useFunnel1Calculator } from "@/hooks/useFunnel1Calculator";
import { useT } from "@/lib/i18n/useT";
import { InputsSection } from "./InputsSection";
import { ResultsSection } from "./ResultsSection";

export default function Funnel1Calculator() {
    const t = useT();
    const {
        targetSales,
        aov,
        conversionRate,
        cogs,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handleAovChange,
        handleConversionRateChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    } = useFunnel1Calculator();

    return (
        <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
            <InputsSection
                translations={t.funnel1}
                targetSales={targetSales}
                aov={aov}
                conversionRate={conversionRate}
                cogs={cogs}
                marketingBudgetPercent={marketingBudgetPercent}
                onTargetSalesChange={handleTargetSalesChange}
                onAovChange={handleAovChange}
                onConversionRateChange={handleConversionRateChange}
                onCogsChange={handleCogsChange}
                onMarketingBudgetPercentChange={handleMarketingBudgetPercentChange}
            />
            <ResultsSection
                translations={t.funnel1}
                results={results}
                onReset={handleReset}
            />
        </div>
    );
}
