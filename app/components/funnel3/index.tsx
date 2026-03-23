"use client";

import { useFunnel3Calculator } from "@/hooks/useFunnel3Calculator";
import { useLanguage } from "@/lib/i18n/context";
import { InputsSection } from "./InputsSection";
import { ResultsSection } from "./ResultsSection";

export default function Funnel3Calculator() {
    const { t } = useLanguage();
    const {
        targetMonthlyCommission,
        commissionPerNewClient,
        showUpRate,
        closingRateWebinar,
        cogs,
        marketingBudgetPercent,
        handleTargetMonthlyCommissionChange,
        handleCommissionPerNewClientChange,
        handleShowUpRateChange,
        handleClosingRateWebinarChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    } = useFunnel3Calculator();

    return (
        <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
            <InputsSection
                translations={t.funnel3}
                targetMonthlyCommission={targetMonthlyCommission}
                commissionPerNewClient={commissionPerNewClient}
                showUpRate={showUpRate}
                closingRateWebinar={closingRateWebinar}
                cogs={cogs}
                marketingBudgetPercent={marketingBudgetPercent}
                onTargetMonthlyCommissionChange={handleTargetMonthlyCommissionChange}
                onCommissionPerNewClientChange={handleCommissionPerNewClientChange}
                onShowUpRateChange={handleShowUpRateChange}
                onClosingRateWebinarChange={handleClosingRateWebinarChange}
                onCogsChange={handleCogsChange}
                onMarketingBudgetPercentChange={handleMarketingBudgetPercentChange}
            />
            <ResultsSection
                translations={t.funnel3}
                results={results}
                onReset={handleReset}
            />
        </div>
    );
}
