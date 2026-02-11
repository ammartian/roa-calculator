import type { Currency } from "@/types";

export function parseCurrency(value: string): number {
    const cleaned = value.replace(/[^\d.]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
}

export function calculateExclTax(value: number, taxPercent: number): number {
    if (isNaN(taxPercent) || taxPercent === 0) return value;
    return value / (1 + taxPercent / 100);
}

export function calculateTotalCosts(
    costOfGoods: number,
    shippingCosts: number,
    transactionCosts: number
): number {
    return costOfGoods + shippingCosts + transactionCosts;
}

export function calculateBreakEvenROAS(
    totalRevenue: number,
    totalCosts: number
): number {
    if (totalRevenue === 0) return 0;
    const profit = totalRevenue - totalCosts;
    if (profit <= 0) return 0;
    return totalRevenue / profit;
}

export function calculateProfitMargin(
    profitPerUnit: number,
    totalRevenue: number
): number {
    if (totalRevenue === 0) return 0;
    return (profitPerUnit / totalRevenue) * 100;
}

export function formatCurrency(value: number, currencyCode: string): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function getCurrencySymbol(
    currencies: Currency[],
    currencyCode: string
): string {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency?.symbol || "$";
}

export function formatDecimalInput(value: string): string {
    const cleaned = value.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    return parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
}
