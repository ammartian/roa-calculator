"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { currencies } from "@/lib/currencies";
import { CostField } from "./CostField";
import type { CostField as CostFieldType } from "@/types";
import type { Translations } from "@/lib/i18n/types";

interface CostSectionProps {
  translations: Translations["calculator"]["costs"];
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
  translations,
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
        <CardTitle className="text-lg">{translations.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="font-medium">{translations.currency}</Label>
          <CurrencyCombobox
            currencies={currencies}
            value={selectedCurrency}
            onChange={onCurrencyChange}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="font-medium">{translations.taxRate}</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{translations.taxRateTooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>
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
            {translations.taxRateDescription}
          </p>
        </div>

        <Separator />

        <CostField
          label={translations.costOfGoods}
          field={costOfGoods}
          onValueChange={onCostOfGoodsValueChange}
          onTaxChange={onCostOfGoodsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription={translations.costOfGoodsTaxDescription}
          taxInputTooltip={translations.taxInputTooltip}
        />

        <CostField
          label={translations.shippingCosts}
          field={shippingCosts}
          onValueChange={onShippingCostsValueChange}
          onTaxChange={onShippingCostsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription={translations.shippingCostsTaxDescription}
          taxInputTooltip={translations.taxInputTooltip}
        />

        <CostField
          label={translations.transactionCosts}
          field={transactionCosts}
          onValueChange={onTransactionCostsValueChange}
          onTaxChange={onTransactionCostsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription={translations.transactionCostsTaxDescription}
          taxInputTooltip={translations.taxInputTooltip}
        />

        <CostField
          label={translations.otherCosts}
          field={otherCosts}
          onValueChange={onOtherCostsValueChange}
          onTaxChange={onOtherCostsTaxChange}
          currencySymbol={currencySymbol}
          taxDescription={translations.otherCostsTaxDescription}
          taxInputTooltip={translations.taxInputTooltip}
        />

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold">{translations.totalCosts}</span>
          <span className="font-semibold text-lg">{formatCurrency(totalCosts)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
