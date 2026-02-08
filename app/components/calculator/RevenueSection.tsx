"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CostField } from "./CostField";
import type { CostField as CostFieldType } from "@/types";

interface RevenueSectionProps {
  revenue: CostFieldType;
  onRevenueValueChange: (value: string) => void;
  onRevenueTaxChange: (value: string) => void;
  totalRevenue: number;
  currencySymbol: string;
  formatCurrency: (value: number) => string;
}

export function RevenueSection({
  revenue,
  onRevenueValueChange,
  onRevenueTaxChange,
  totalRevenue,
  currencySymbol,
  formatCurrency,
}: RevenueSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Revenue (per product)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CostField
          label="Revenue"
          field={revenue}
          onValueChange={onRevenueValueChange}
          onTaxChange={onRevenueTaxChange}
          currencySymbol={currencySymbol}
          taxDescription="If you have to pay tax over the revenue, you can set it here."
        />

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold">Total revenue</span>
          <span className="font-semibold text-lg">{formatCurrency(totalRevenue)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
