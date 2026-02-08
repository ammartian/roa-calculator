import type { ReactNode } from "react";

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

export interface ProfitabilityStatus {
  label: string;
  color: string;
  icon: ReactNode;
  description: string;
}

export interface CalculatorState {
  selectedCurrency: string;
  masterTax: string;
  costOfGoods: CostField;
  shippingCosts: CostField;
  transactionCosts: CostField;
  otherCosts: CostField;
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
