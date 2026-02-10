export interface Currency {
    code: string;
    name: string;
    symbol: string;
    country: string;
}

export interface CostField {
    value: string;
    tax: string;
}

export interface CustomCostField extends CostField {
    id: string;
    title: string;
}

import type { ReactNode } from "react";

export interface ProfitabilityStatus {
    label: string;
    color: string;
    icon: ReactNode | null;
    description: string;
}

export interface CalculatorState {
    selectedCurrency: string;
    masterTax: string;
    costOfGoods: CostField;
    shippingCosts: CostField;
    transactionCosts: CostField;
    otherCosts: CostField;
    customCosts: CustomCostField[];
    revenue: CostField;
}

export interface CalculatorResults {
    totalCosts: number;
    totalRevenue: number;
    breakEvenROAS: number;
    profitPerUnit: number;
    profitMarginPercent: number;
    maxAdSpendForBreakEven: number;
}
