"use client";

import { useFunnel2Calculator } from "@/hooks/useFunnel2Calculator";
import { useT } from "@/lib/i18n/useT";
import { InputsSection } from "./InputsSection";
import { ResultsSection } from "./ResultsSection";

export default function Funnel2Calculator() {
    const t = useT();
    const {
        registrationFee,
        targetAgents,
        conversionRate,
        activeAgentPercent,
        restockValue,
        restockFrequency,
        marketingBudgetPercent,
        handleRegistrationFeeChange,
        handleTargetAgentsChange,
        handleConversionRateChange,
        handleActiveAgentPercentChange,
        handleRestockValueChange,
        handleRestockFrequencyChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    } = useFunnel2Calculator();

    return (
        <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
            <InputsSection
                translations={t.funnel2}
                registrationFee={registrationFee}
                targetAgents={targetAgents}
                conversionRate={conversionRate}
                activeAgentPercent={activeAgentPercent}
                restockValue={restockValue}
                restockFrequency={restockFrequency}
                marketingBudgetPercent={marketingBudgetPercent}
                onRegistrationFeeChange={handleRegistrationFeeChange}
                onTargetAgentsChange={handleTargetAgentsChange}
                onConversionRateChange={handleConversionRateChange}
                onActiveAgentPercentChange={handleActiveAgentPercentChange}
                onRestockValueChange={handleRestockValueChange}
                onRestockFrequencyChange={handleRestockFrequencyChange}
                onMarketingBudgetPercentChange={handleMarketingBudgetPercentChange}
            />
            <ResultsSection
                translations={t.funnel2}
                results={results}
                onReset={handleReset}
            />
        </div>
    );
}
