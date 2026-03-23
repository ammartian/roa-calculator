export type TrafficLightLevel = "neutral" | "healthy" | "borderline" | "over";

export interface CplThresholds {
    yellowMin: number;
    yellowMax: number;
}

/** PRD Funnel 1 — Cost Per Lead (CPL) traffic light bands (RM). */
export const FUNNEL1_CPL_THRESHOLDS: CplThresholds = {
    yellowMin: 20,
    yellowMax: 25,
};

/** PRD Funnel 2 — Cost Per Lead (CPL) traffic light bands (RM). */
export const FUNNEL2_CPL_THRESHOLDS: CplThresholds = {
    yellowMin: 480,
    yellowMax: 600,
};

export function trafficLightFromCpl(
    cpl: number,
    hasValidMetric: boolean,
    thresholds: CplThresholds
): TrafficLightLevel {
    if (!hasValidMetric || !Number.isFinite(cpl) || cpl < 0) {
        return "neutral";
    }
    if (cpl === 0) {
        return "neutral";
    }
    if (cpl > thresholds.yellowMax) {
        return "over";
    }
    if (cpl >= thresholds.yellowMin) {
        return "borderline";
    }
    return "healthy";
}

export interface Funnel1Computation {
    totalCustomers: number;
    leadsNeeded: number;
    grossProfitMargin: number;
    maxCPP: number;
    maxCPL: number;
    totalMarketingBudget: number;
    roas: number;
    trafficLight: TrafficLightLevel;
    isValid: boolean;
}

/**
 * Funnel 1 — Retail sales via WhatsApp / telemarketing (PRD §6).
 * Percentages are whole numbers (e.g. 20 = 20%).
 */
export function computeFunnel1(
    targetSales: number,
    aov: number,
    conversionRatePercent: number,
    cogs: number,
    marketingBudgetPercent: number
): Funnel1Computation {
    const isValid =
        targetSales > 0 &&
        aov > 0 &&
        conversionRatePercent > 0 &&
        conversionRatePercent <= 100;

    if (!isValid) {
        return {
            totalCustomers: 0,
            leadsNeeded: 0,
            grossProfitMargin: 0,
            maxCPP: 0,
            maxCPL: 0,
            totalMarketingBudget: 0,
            roas: 0,
            trafficLight: "neutral",
            isValid: false,
        };
    }

    const cr = conversionRatePercent / 100;
    const mb = marketingBudgetPercent / 100;

    const totalCustomers = targetSales / aov;
    const leadsNeeded = totalCustomers / cr;
    const grossProfitMargin = aov - cogs;
    const maxCPP = grossProfitMargin * mb;
    const maxCPL = maxCPP * cr;
    const totalMarketingBudget = maxCPP * totalCustomers;
    const roas =
        totalMarketingBudget > 0 ? targetSales / totalMarketingBudget : 0;

    const trafficLight = trafficLightFromCpl(
        maxCPL,
        Number.isFinite(maxCPL) && maxCPL > 0,
        FUNNEL1_CPL_THRESHOLDS
    );

    return {
        totalCustomers,
        leadsNeeded,
        grossProfitMargin,
        maxCPP,
        maxCPL,
        totalMarketingBudget,
        roas,
        trafficLight,
        isValid: true,
    };
}

export interface Funnel2Computation {
    totalRegFeeCollected: number;
    leadsRequired: number;
    potentialActiveAgents: number;
    ltv: number;
    maxCPA: number;
    maxCPL: number;
    totalMarketingBudget: number;
    roasPerYear: number;
    trafficLight: TrafficLightLevel;
    isValid: boolean;
}

/**
 * Funnel 2 — Recruit agent with registration fee (PRD §7).
 * Percentages are whole numbers (e.g. 20 = 20%).
 */
export function computeFunnel2(
    registrationFee: number,
    targetAgents: number,
    conversionRatePercent: number,
    activeAgentPercent: number,
    restockValue: number,
    restockFrequency: number,
    marketingBudgetPercent: number
): Funnel2Computation {
    const isValid =
        targetAgents > 0 &&
        conversionRatePercent > 0 &&
        conversionRatePercent <= 100 &&
        registrationFee >= 0 &&
        activeAgentPercent >= 0;

    if (!isValid) {
        return {
            totalRegFeeCollected: 0,
            leadsRequired: 0,
            potentialActiveAgents: 0,
            ltv: 0,
            maxCPA: 0,
            maxCPL: 0,
            totalMarketingBudget: 0,
            roasPerYear: 0,
            trafficLight: "neutral",
            isValid: false,
        };
    }

    const cr = conversionRatePercent / 100;
    const mb = marketingBudgetPercent / 100;

    const totalRegFeeCollected = registrationFee * targetAgents;
    const leadsRequired = targetAgents / cr;
    const potentialActiveAgents = targetAgents * (activeAgentPercent / 100);
    const ltv = restockValue * restockFrequency;
    const maxCPA = registrationFee * mb;
    const maxCPL = maxCPA * cr;
    const totalMarketingBudget = maxCPA * targetAgents;
    const roasPerYear =
        totalMarketingBudget > 0
            ? (potentialActiveAgents * ltv) / totalMarketingBudget
            : 0;

    const trafficLight = trafficLightFromCpl(
        maxCPL,
        Number.isFinite(maxCPL) && maxCPL > 0,
        FUNNEL2_CPL_THRESHOLDS
    );

    return {
        totalRegFeeCollected,
        leadsRequired,
        potentialActiveAgents,
        ltv,
        maxCPA,
        maxCPL,
        totalMarketingBudget,
        roasPerYear,
        trafficLight,
        isValid: true,
    };
}
