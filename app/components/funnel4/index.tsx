"use client";

import { useFunnel4Calculator } from "@/hooks/useFunnel4Calculator";
import { useT } from "@/lib/i18n/useT";
import { InputsSection } from "./InputsSection";
import { ResultsSection } from "./ResultsSection";

export default function Funnel4Calculator() {
    const t = useT();
    const {
        targetSales,
        packagePrice,
        ticketPrice,
        closingRate,
        showUpRate,
        cogs,
        marketingBudgetPercent,
        handleTargetSalesChange,
        handlePackagePriceChange,
        handleTicketPriceChange,
        handleClosingRateChange,
        handleShowUpRateChange,
        handleCogsChange,
        handleMarketingBudgetPercentChange,
        results,
        handleReset,
    } = useFunnel4Calculator();

    return (
        <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
            <InputsSection
                translations={t.funnel4}
                targetSales={targetSales}
                packagePrice={packagePrice}
                ticketPrice={ticketPrice}
                closingRate={closingRate}
                showUpRate={showUpRate}
                cogs={cogs}
                marketingBudgetPercent={marketingBudgetPercent}
                onTargetSalesChange={handleTargetSalesChange}
                onPackagePriceChange={handlePackagePriceChange}
                onTicketPriceChange={handleTicketPriceChange}
                onClosingRateChange={handleClosingRateChange}
                onShowUpRateChange={handleShowUpRateChange}
                onCogsChange={handleCogsChange}
                onMarketingBudgetPercentChange={handleMarketingBudgetPercentChange}
            />
            <ResultsSection
                translations={t.funnel4}
                results={results}
                onReset={handleReset}
            />
        </div>
    );
}
