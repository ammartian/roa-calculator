"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface CostField {
  value: string;
  vat: string;
}

const VAT_OPTIONS = [
  { value: "0", label: "None" },
  { value: "5", label: "5%" },
  { value: "10", label: "10%" },
  { value: "15", label: "15%" },
  { value: "20", label: "20%" },
  { value: "25", label: "25%" },
];

function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function calculateExclVAT(value: number, vatPercent: number): number {
  if (vatPercent === 0) return value;
  return value / (1 + vatPercent / 100);
}

export default function Calculator() {
  const [costOfGoods, setCostOfGoods] = useState<CostField>({
    value: "",
    vat: "0",
  });
  const [shippingCosts, setShippingCosts] = useState<CostField>({
    value: "",
    vat: "0",
  });
  const [transactionCosts, setTransactionCosts] = useState<CostField>({
    value: "",
    vat: "0",
  });
  const [otherCosts, setOtherCosts] = useState<CostField>({
    value: "",
    vat: "0",
  });
  const [revenue, setRevenue] = useState<CostField>({
    value: "",
    vat: "0",
  });

  const handleInputChange = (
    field: CostField,
    setter: React.Dispatch<React.SetStateAction<CostField>>,
    newValue: string
  ) => {
    // Only allow numbers and one decimal point
    const cleaned = newValue.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    const formatted =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
    setter({ ...field, value: formatted });
  };

  const totalCosts = useMemo(() => {
    const costOfGoodsExcl = calculateExclVAT(
      parseCurrency(costOfGoods.value),
      parseFloat(costOfGoods.vat)
    );
    const shippingExcl = calculateExclVAT(
      parseCurrency(shippingCosts.value),
      parseFloat(shippingCosts.vat)
    );
    const transactionExcl = calculateExclVAT(
      parseCurrency(transactionCosts.value),
      parseFloat(transactionCosts.vat)
    );
    const otherExcl = calculateExclVAT(
      parseCurrency(otherCosts.value),
      parseFloat(otherCosts.vat)
    );
    return costOfGoodsExcl + shippingExcl + transactionExcl + otherExcl;
  }, [costOfGoods, shippingCosts, transactionCosts, otherCosts]);

  const totalRevenue = useMemo(() => {
    return calculateExclVAT(
      parseCurrency(revenue.value),
      parseFloat(revenue.vat)
    );
  }, [revenue]);

  const breakEvenROAS = useMemo(() => {
    if (totalRevenue === 0) return 0;
    const profit = totalRevenue - totalCosts;
    if (profit <= 0) return 0;
    return totalRevenue / profit;
  }, [totalRevenue, totalCosts]);

  const handleReset = () => {
    setCostOfGoods({ value: "", vat: "0" });
    setShippingCosts({ value: "", vat: "0" });
    setTransactionCosts({ value: "", vat: "0" });
    setOtherCosts({ value: "", vat: "0" });
    setRevenue({ value: "", vat: "0" });
  };

  const renderCostField = (
    label: string,
    field: CostField,
    setter: React.Dispatch<React.SetStateAction<CostField>>,
    vatDescription?: string
  ) => (
    <div className="space-y-2">
      <Label className="font-medium">{label}</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={field.value}
            onChange={(e) => handleInputChange(field, setter, e.target.value)}
            className="pl-7"
          />
        </div>
        <Select
          value={field.vat}
          onValueChange={(value) => setter({ ...field, vat: value })}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VAT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {vatDescription && (
        <p className="text-xs text-muted-foreground">{vatDescription}</p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Costs Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Costs (per product)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderCostField(
            "Cost of goods",
            costOfGoods,
            setCostOfGoods,
            "If you receive VAT back on the cost of goods, you can select it here."
          )}

          {renderCostField(
            "Shipping costs",
            shippingCosts,
            setShippingCosts,
            "If you receive VAT back on the shipping costs, you can select it here."
          )}

          {renderCostField(
            "Transaction costs",
            transactionCosts,
            setTransactionCosts,
            "If you receive VAT back on the transaction costs, you can select it here."
          )}

          {renderCostField(
            "Other costs",
            otherCosts,
            setOtherCosts,
            "If you receive VAT back on other costs, you can select it here."
          )}

          <Separator />

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total costs</span>
            <span className="font-semibold text-lg">
              {formatCurrency(totalCosts)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue (per product)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderCostField(
            "Revenue",
            revenue,
            setRevenue,
            "If you have to pay VAT over the revenue, you can select it here."
          )}

          <Separator />

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total revenue</span>
            <span className="font-semibold text-lg">
              {formatCurrency(totalRevenue)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Result Section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-center">Break Even ROAS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="text-5xl font-bold text-primary">
              {breakEvenROAS > 0 ? breakEvenROAS.toFixed(2) : "0.00"}
            </span>
          </div>

          <div className="text-center">
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
