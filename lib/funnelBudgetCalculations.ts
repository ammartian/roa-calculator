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

/** PRD Funnel 3 — Cost per webinar signup traffic light bands (RM). */
export const FUNNEL3_SIGNUP_THRESHOLDS: CplThresholds = {
    yellowMin: 16.8,
    yellowMax: 21,
};

/** PRD Funnel 4 — Cost per webinar signup traffic light bands (RM). */
export const FUNNEL4_SIGNUP_THRESHOLDS: CplThresholds = {
    yellowMin: 16,
    yellowMax: 20,
};

/** PRD Funnel 5 — Cost per purchase (CPP) traffic light bands (RM). */
export const FUNNEL5_CPP_THRESHOLDS: CplThresholds = {
    yellowMin: 20.4,
    yellowMax: 25.5,
};

/** PRD Funnel 6 — Cost per lead (CPL) traffic light bands (RM). */
export const FUNNEL6_CPL_THRESHOLDS: CplThresholds = {
    yellowMin: 33.6,
    yellowMax: 42,
};

/** PRD Funnel 7 — Cost per click (CPC) traffic light bands (RM). */
export const FUNNEL7_CPC_THRESHOLDS: CplThresholds = {
    yellowMin: 24,
    yellowMax: 30,
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

export interface Funnel3Computation {
    newClientsRequired: number;
    showupsNeeded: number;
    signupsNeeded: number;
    grossProfitPerClient: number;
    maxCPA: number;
    maxCostPerSignup: number;
    totalMarketingBudget: number;
    roas: number;
    trafficLight: TrafficLightLevel;
    isValid: boolean;
}

/**
 * Funnel 3 — Webinar affiliate (PRD §8).
 * Percentages are whole numbers (e.g. 25 = 25%).
 */
export function computeFunnel3(
    targetCommission: number,
    commissionPerClient: number,
    showUpRatePercent: number,
    closingRatePercent: number,
    cogs: number,
    marketingBudgetPercent: number
): Funnel3Computation {
    const isValid =
        targetCommission > 0 &&
        commissionPerClient > 0 &&
        showUpRatePercent > 0 &&
        showUpRatePercent <= 100 &&
        closingRatePercent > 0 &&
        closingRatePercent <= 100;

    if (!isValid) {
        return {
            newClientsRequired: 0,
            showupsNeeded: 0,
            signupsNeeded: 0,
            grossProfitPerClient: 0,
            maxCPA: 0,
            maxCostPerSignup: 0,
            totalMarketingBudget: 0,
            roas: 0,
            trafficLight: "neutral",
            isValid: false,
        };
    }

    const showUp = showUpRatePercent / 100;
    const closing = closingRatePercent / 100;
    const mb = marketingBudgetPercent / 100;

    const newClientsRequired = targetCommission / commissionPerClient;
    const showupsNeeded = newClientsRequired / closing;
    const signupsNeeded = showupsNeeded / showUp;
    const grossProfitPerClient = commissionPerClient - cogs;
    const maxCPA = grossProfitPerClient * mb;
    const maxCostPerSignup = maxCPA * closing * showUp;
    const totalMarketingBudget = maxCPA * newClientsRequired;
    const roas =
        totalMarketingBudget > 0 ? targetCommission / totalMarketingBudget : 0;

    const trafficLight = trafficLightFromCpl(
        maxCostPerSignup,
        Number.isFinite(maxCostPerSignup) && maxCostPerSignup > 0,
        FUNNEL3_SIGNUP_THRESHOLDS
    );

    return {
        newClientsRequired,
        showupsNeeded,
        signupsNeeded,
        grossProfitPerClient,
        maxCPA,
        maxCostPerSignup,
        totalMarketingBudget,
        roas,
        trafficLight,
        isValid: true,
    };
}

export interface Funnel4Computation {
    premiumCustomers: number;
    showupsNeeded: number;
    signupsNeeded: number;
    upfrontSales: number;
    totalSales: number;
    grossProfitPerCustomer: number;
    maxCPA: number;
    maxCostPerSignup: number;
    totalMarketingBudget: number;
    roas: number;
    trafficLight: TrafficLightLevel;
    isValid: boolean;
}

/**
 * Funnel 4 — Free webinar with premium upsell (PRD §9).
 * Percentages are whole numbers (e.g. 40 = 40%).
 */
export function computeFunnel4(
    targetSales: number,
    packagePrice: number,
    ticketPrice: number,
    closingRatePercent: number,
    showUpRatePercent: number,
    cogs: number,
    marketingBudgetPercent: number
): Funnel4Computation {
    const isValid =
        targetSales > 0 &&
        packagePrice > 0 &&
        showUpRatePercent > 0 &&
        showUpRatePercent <= 100 &&
        closingRatePercent > 0 &&
        closingRatePercent <= 100;

    if (!isValid) {
        return {
            premiumCustomers: 0,
            showupsNeeded: 0,
            signupsNeeded: 0,
            upfrontSales: 0,
            totalSales: 0,
            grossProfitPerCustomer: 0,
            maxCPA: 0,
            maxCostPerSignup: 0,
            totalMarketingBudget: 0,
            roas: 0,
            trafficLight: "neutral",
            isValid: false,
        };
    }

    const showUp = showUpRatePercent / 100;
    const closing = closingRatePercent / 100;
    const mb = marketingBudgetPercent / 100;

    const premiumCustomers = targetSales / packagePrice;
    const showupsNeeded = premiumCustomers / closing;
    const signupsNeeded = showupsNeeded / showUp;
    const upfrontSales = signupsNeeded * ticketPrice;
    const totalSales = upfrontSales + targetSales;
    const grossProfitPerCustomer = packagePrice - cogs;
    const maxCPA = grossProfitPerCustomer * mb;
    const maxCostPerSignup = maxCPA * closing * showUp;
    const totalMarketingBudget = maxCPA * premiumCustomers;
    const roas =
        totalMarketingBudget > 0 ? totalSales / totalMarketingBudget : 0;

    const trafficLight = trafficLightFromCpl(
        maxCostPerSignup,
        Number.isFinite(maxCostPerSignup) && maxCostPerSignup > 0,
        FUNNEL4_SIGNUP_THRESHOLDS
    );

    return {
        premiumCustomers,
        showupsNeeded,
        signupsNeeded,
        upfrontSales,
        totalSales,
        grossProfitPerCustomer,
        maxCPA,
        maxCostPerSignup,
        totalMarketingBudget,
        roas,
        trafficLight,
        isValid: true,
    };
}

export interface Funnel5Computation {
    totalCustomers: number;
    visitorsNeeded: number;
    addToCartCount: number;
    ltv: number;
    maxCPP: number;
    totalMarketingBudget: number;
    roas: number;
    trafficLight: TrafficLightLevel;
    isValid: boolean;
}

/**
 * Funnel 5 — E-commerce product page (PRD §10).
 * Gross profit margin is a direct RM input. Percentages as whole numbers (e.g. 4 = 4%).
 */
export function computeFunnel5(
    targetSales: number,
    aov: number,
    grossProfitMarginPerProduct: number,
    addToCartRatePercent: number,
    conversionRatePercent: number,
    repurchaseValue: number,
    repurchaseFrequency: number,
    marketingBudgetPercent: number
): Funnel5Computation {
    const isValid =
        targetSales > 0 &&
        aov > 0 &&
        conversionRatePercent > 0 &&
        conversionRatePercent <= 100;

    if (!isValid) {
        return {
            totalCustomers: 0,
            visitorsNeeded: 0,
            addToCartCount: 0,
            ltv: 0,
            maxCPP: 0,
            totalMarketingBudget: 0,
            roas: 0,
            trafficLight: "neutral",
            isValid: false,
        };
    }

    const cr = conversionRatePercent / 100;
    const atc = addToCartRatePercent / 100;
    const mb = marketingBudgetPercent / 100;

    const totalCustomers = targetSales / aov;
    const visitorsNeeded = totalCustomers / cr;
    const addToCartCount = visitorsNeeded * atc;
    const ltv = repurchaseValue * repurchaseFrequency;
    const maxCPP = grossProfitMarginPerProduct * mb;
    const totalMarketingBudget = maxCPP * totalCustomers;
    const roas =
        totalMarketingBudget > 0 ? targetSales / totalMarketingBudget : 0;

    const trafficLight = trafficLightFromCpl(
        maxCPP,
        Number.isFinite(maxCPP) && maxCPP > 0,
        FUNNEL5_CPP_THRESHOLDS
    );

    return {
        totalCustomers,
        visitorsNeeded,
        addToCartCount,
        ltv,
        maxCPP,
        totalMarketingBudget,
        roas,
        trafficLight,
        isValid: true,
    };
}

export interface Funnel6Computation {
    totalCustomers: number;
    appointmentsNeeded: number;
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
 * Funnel 6 — Service business / interior design (PRD §11).
 * Percentages as whole numbers (e.g. 20 = 20%).
 */
export function computeFunnel6(
    targetSales: number,
    aov: number,
    leadsToAppointmentCrPercent: number,
    appointmentToCustomerCrPercent: number,
    cogs: number,
    marketingBudgetPercent: number
): Funnel6Computation {
    const isValid =
        targetSales > 0 &&
        aov > 0 &&
        leadsToAppointmentCrPercent > 0 &&
        leadsToAppointmentCrPercent <= 100 &&
        appointmentToCustomerCrPercent > 0 &&
        appointmentToCustomerCrPercent <= 100;

    if (!isValid) {
        return {
            totalCustomers: 0,
            appointmentsNeeded: 0,
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

    const l2a = leadsToAppointmentCrPercent / 100;
    const a2c = appointmentToCustomerCrPercent / 100;
    const mb = marketingBudgetPercent / 100;

    const totalCustomers = targetSales / aov;
    const appointmentsNeeded = totalCustomers / a2c;
    const leadsNeeded = appointmentsNeeded / l2a;
    const grossProfitMargin = aov - cogs;
    const maxCPP = grossProfitMargin * mb;
    const maxCPL = maxCPP * l2a * a2c;
    const totalMarketingBudget = maxCPP * totalCustomers;
    const roas =
        totalMarketingBudget > 0 ? targetSales / totalMarketingBudget : 0;

    const trafficLight = trafficLightFromCpl(
        maxCPL,
        Number.isFinite(maxCPL) && maxCPL > 0,
        FUNNEL6_CPL_THRESHOLDS
    );

    return {
        totalCustomers,
        appointmentsNeeded,
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

export interface Funnel7Computation {
    totalCustomers: number;
    linkClicksNeeded: number;
    grossProfitMargin: number;
    maxCPP: number;
    maxCPC: number;
    totalMarketingBudget: number;
    roas: number;
    trafficLight: TrafficLightLevel;
    isValid: boolean;
}

/**
 * Funnel 7 — Digital product / ebook (PRD §12).
 * Percentages as whole numbers (e.g. 20 = 20%).
 */
export function computeFunnel7(
    targetSales: number,
    aov: number,
    conversionRatePercent: number,
    cogs: number,
    marketingBudgetPercent: number
): Funnel7Computation {
    const isValid =
        targetSales > 0 &&
        aov > 0 &&
        conversionRatePercent > 0 &&
        conversionRatePercent <= 100;

    if (!isValid) {
        return {
            totalCustomers: 0,
            linkClicksNeeded: 0,
            grossProfitMargin: 0,
            maxCPP: 0,
            maxCPC: 0,
            totalMarketingBudget: 0,
            roas: 0,
            trafficLight: "neutral",
            isValid: false,
        };
    }

    const cr = conversionRatePercent / 100;
    const mb = marketingBudgetPercent / 100;

    const totalCustomers = targetSales / aov;
    const linkClicksNeeded = totalCustomers / cr;
    const grossProfitMargin = aov - cogs;
    const maxCPP = grossProfitMargin * mb;
    const maxCPC = maxCPP * cr;
    const totalMarketingBudget = maxCPP * totalCustomers;
    const roas =
        totalMarketingBudget > 0 ? targetSales / totalMarketingBudget : 0;

    const trafficLight = trafficLightFromCpl(
        maxCPC,
        Number.isFinite(maxCPC) && maxCPC > 0,
        FUNNEL7_CPC_THRESHOLDS
    );

    return {
        totalCustomers,
        linkClicksNeeded,
        grossProfitMargin,
        maxCPP,
        maxCPC,
        totalMarketingBudget,
        roas,
        trafficLight,
        isValid: true,
    };
}
