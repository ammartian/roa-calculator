"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CostField } from "./CostField";
import type { CostField as CostFieldType } from "@/types";
import type { Translations } from "@/lib/i18n/types";

interface RevenueSectionProps {
  translations: Translations["calculator"]["revenue"];
  revenue: CostFieldType;
  onRevenueValueChange: (value: string) => void;
  onRevenueTaxChange: (value: string) => void;
  totalRevenue: number;
  currencySymbol: string;
  formatCurrency: (value: number) => string;
}

export function RevenueSection({
  translations,
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
        <CardTitle className="text-lg">{translations.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CostField
          label={translations.revenue}
          field={revenue}
          onValueChange={onRevenueValueChange}
          onTaxChange={onRevenueTaxChange}
          currencySymbol={currencySymbol}
          taxDescription={translations.revenueTaxDescription}
        />

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold">{translations.totalRevenue}</span>
          <span className="font-semibold text-lg">{formatCurrency(totalRevenue)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
