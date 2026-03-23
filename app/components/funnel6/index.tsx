"use client";

import { useFunnel6Calculator } from "@/hooks/useFunnel6Calculator";
import { useLanguage } from "@/lib/i18n/context";
import { InputsSection } from "./InputsSection";
import { ResultsSection } from "./ResultsSection";

export default function Funnel6Calculator() {
    const { t } = useLanguage();
    const {
        targetSales,
        aov,
        leadsToAppointmentRate,
        appointmentToCustomerRate,
        cogs,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handleAovChange,
        handleLeadsToAppointmentRateChange,
        handleAppointmentToCustomerRateChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    } = useFunnel6Calculator();

    return (
        <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
            <InputsSection
                translations={t.funnel6}
                targetSales={targetSales}
                aov={aov}
                leadsToAppointmentRate={leadsToAppointmentRate}
                appointmentToCustomerRate={appointmentToCustomerRate}
                cogs={cogs}
                marketingBudgetPercent={marketingBudgetPercent}
                onTargetSalesChange={handleTargetSalesChange}
                onAovChange={handleAovChange}
                onLeadsToAppointmentRateChange={handleLeadsToAppointmentRateChange}
                onAppointmentToCustomerRateChange={
                    handleAppointmentToCustomerRateChange
                }
                onCogsChange={handleCogsChange}
                onMarketingBudgetPercentChange={handleMarketingBudgetPercentChange}
            />
            <ResultsSection
                translations={t.funnel6}
                results={results}
                onReset={handleReset}
            />
        </div>
    );
}
