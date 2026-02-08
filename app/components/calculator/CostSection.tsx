"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { currencies } from "@/lib/currencies";
import { CostField } from "./CostField";
import type { CostField as CostFieldType } from "@/types";

interface CostSectionProps {
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
  masterTax: string;
  onMasterTaxChange: (value: string) => void;
  costOfGoods: CostFieldType;
  onCostOfGoodsValueChange: (value: string) => void;
  onCostOfGoodsTaxChange: (value: string) => void;
  shippingCosts: CostFieldType;
  onShippingCostsValueChange: (value: string) => void;
  onShippingCostsTaxChange: (value: string) => void;
  transactionCosts: CostFieldType;
  onTransactionCostsValueChange: (value: string) => void;
  onTransactionCostsTaxChange: (value: string) => void;
  otherCosts: CostFieldType;
  onOtherCostsValueChange: (value: string) => void;
  onOtherCostsTaxChange: (value: string) => void;
  totalCosts: number;
  currencySymbol: string;
  formatCurrency: (value: number) => string;
}

export function CostSection({
  selectedCurrency,
  onCurrencyChange,
  masterTax,
  onMasterTaxChange,
  costOfGoods,
  onCostOfGoodsValueChange,
  onCostOfGoodsTaxChange,
  shippingCosts,
  onShippingCostsValueChange,
  onShippingCostsTaxChange,
  transactionCosts,
  onTransactionCostsValueChange,
  onTransactionCostsTaxChange,
  otherCosts,
  onOtherCostsValueChange,
  onOtherCostsTaxChange,
  totalCosts,
  currencySymbol,
  formatCurrency,
}: CostSectionProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Costs (per product)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="font-medium">Currency</Label>
          <CurrencyCombobox
            currencies={currencies}
            value={selectedCurrency}
            onChange={onCurrencyChange}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label className="font-medium">Tax rate (applies to all)</Label>
          <div className="relative w-[80px]">
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={masterTax}
              onChange={(e) => onMasterTaxChange(e.target.value)}
              className="pr-7"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              %
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Set a default tax rate for all fields. You can customize each field individually below.
          </p>
        </div>

        <Separator />

        <CostField
          label="Cost of goods"
          field={costOfGoods}
          onValueChange={onCostOfGoodsValueChange}
          onTaxChange={onCostOfGoodsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription="If you receive tax back on the cost of goods, you can set it here."
        />

        <CostField
          label="Shipping costs"
          field={shippingCosts}
          onValueChange={onShippingCostsValueChange}
          onTaxChange={onShippingCostsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription="If you receive tax back on the shipping costs, you can set it here."
        />

        <CostField
          label="Transaction costs"
          field={transactionCosts}
          onValueChange={onTransactionCostsValueChange}
          onTaxChange={onTransactionCostsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription="If you receive tax back on the transaction costs, you can set it here."
        />

        <CostField
          label="Other costs"
          field={otherCosts}
          onValueChange={onOtherCostsValueChange}
          onTaxChange={onOtherCostsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription="If you receive tax back on other costs, you can set it here."
        />

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold">Total costs</span>
          <span className="font-semibold text-lg">{formatCurrency(totalCosts)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
