"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertCircle, XCircle, TrendingUp, DollarSign } from "lucide-react";

interface CostField {
  value: string;
  tax: string;
}

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

function calculateExclTax(value: number, taxPercent: number): number {
  if (isNaN(taxPercent) || taxPercent === 0) return value;
  return value / (1 + taxPercent / 100);
}

interface ProfitabilityStatus {
  label: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

function getProfitabilityStatus(roas: number): ProfitabilityStatus {
  if (roas === 0) {
    return {
      label: "Enter values",
      color: "text-muted-foreground",
      icon: null,
      description: "Fill in costs and revenue to see results",
    };
  }
  if (roas <= 1) {
    return {
      label: "Losing Money",
      color: "text-red-500",
      icon: <XCircle className="h-5 w-5" />,
      description: "Your costs exceed or match your revenue",
    };
  }
  if (roas <= 1.5) {
    return {
      label: "Low Margin",
      color: "text-yellow-500",
      icon: <AlertCircle className="h-5 w-5" />,
      description: "Thin profit margin - optimize costs or increase prices",
    };
  }
  if (roas <= 2.5) {
    return {
      label: "Profitable",
      color: "text-green-500",
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: "Good profit margin - typical for most industries",
    };
  }
  return {
    label: "Highly Profitable",
    color: "text-emerald-500",
    icon: <TrendingUp className="h-5 w-5" />,
    description: "Excellent profit margin - scale your campaigns!",
  };
}

export default function Calculator() {
  const [masterTax, setMasterTax] = useState<string>("");

  const [costOfGoods, setCostOfGoods] = useState<CostField>({
    value: "",
    tax: "",
  });
  const [shippingCosts, setShippingCosts] = useState<CostField>({
    value: "",
    tax: "",
  });
  const [transactionCosts, setTransactionCosts] = useState<CostField>({
    value: "",
    tax: "",
  });
  const [otherCosts, setOtherCosts] = useState<CostField>({
    value: "",
    tax: "",
  });
  const [revenue, setRevenue] = useState<CostField>({
    value: "",
    tax: "",
  });

  const handleMasterTaxChange = (newValue: string) => {
    // Only allow numbers and one decimal point
    const cleaned = newValue.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    const formatted =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
    
    setMasterTax(formatted);
    
    // Update all individual tax fields
    setCostOfGoods((prev) => ({ ...prev, tax: formatted }));
    setShippingCosts((prev) => ({ ...prev, tax: formatted }));
    setTransactionCosts((prev) => ({ ...prev, tax: formatted }));
    setOtherCosts((prev) => ({ ...prev, tax: formatted }));
    setRevenue((prev) => ({ ...prev, tax: formatted }));
  };

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
    const costOfGoodsExcl = calculateExclTax(
      parseCurrency(costOfGoods.value),
      parseFloat(costOfGoods.tax) || 0
    );
    const shippingExcl = calculateExclTax(
      parseCurrency(shippingCosts.value),
      parseFloat(shippingCosts.tax) || 0
    );
    const transactionExcl = calculateExclTax(
      parseCurrency(transactionCosts.value),
      parseFloat(transactionCosts.tax) || 0
    );
    const otherExcl = calculateExclTax(
      parseCurrency(otherCosts.value),
      parseFloat(otherCosts.tax) || 0
    );
    return costOfGoodsExcl + shippingExcl + transactionExcl + otherExcl;
  }, [costOfGoods, shippingCosts, transactionCosts, otherCosts]);

  const totalRevenue = useMemo(() => {
    return calculateExclTax(
      parseCurrency(revenue.value),
      parseFloat(revenue.tax) || 0
    );
  }, [revenue]);

  const breakEvenROAS = useMemo(() => {
    if (totalRevenue === 0) return 0;
    const profit = totalRevenue - totalCosts;
    if (profit <= 0) return 0;
    return totalRevenue / profit;
  }, [totalRevenue, totalCosts]);

  const profitPerUnit = useMemo(() => {
    return totalRevenue - totalCosts;
  }, [totalRevenue, totalCosts]);

  const profitMarginPercent = useMemo(() => {
    if (totalRevenue === 0) return 0;
    return (profitPerUnit / totalRevenue) * 100;
  }, [profitPerUnit, totalRevenue]);

  const maxAdSpendForBreakEven = useMemo(() => {
    // At break even: Revenue = Costs + Ad Spend
    // So: Ad Spend = Revenue - Costs = Profit
    return profitPerUnit;
  }, [profitPerUnit]);

  const profitabilityStatus = getProfitabilityStatus(breakEvenROAS);

  const handleReset = () => {
    setMasterTax("");
    setCostOfGoods({ value: "", tax: "" });
    setShippingCosts({ value: "", tax: "" });
    setTransactionCosts({ value: "", tax: "" });
    setOtherCosts({ value: "", tax: "" });
    setRevenue({ value: "", tax: "" });
  };

  const handleTaxChange = (
    field: CostField,
    setter: React.Dispatch<React.SetStateAction<CostField>>,
    newValue: string
  ) => {
    // Only allow numbers and one decimal point
    const cleaned = newValue.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    const formatted =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
    setter({ ...field, tax: formatted });
  };

  const renderCostField = (
    label: string,
    field: CostField,
    setter: React.Dispatch<React.SetStateAction<CostField>>,
    taxDescription?: string
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
        <div className="relative w-[100px]">
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={field.tax}
            onChange={(e) => handleTaxChange(field, setter, e.target.value)}
            className="pr-7"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            %
          </span>
        </div>
      </div>
      {taxDescription && (
        <p className="text-xs text-muted-foreground">{taxDescription}</p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-xl md:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Column 1: Costs Section */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-lg">Costs (per product)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master Tax Input */}
          <div className="space-y-2">
            <Label className="font-medium">Tax rate (applies to all)</Label>
            <div className="relative w-[120px]">
              <Input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={masterTax}
                onChange={(e) => handleMasterTaxChange(e.target.value)}
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

          {renderCostField(
            "Cost of goods",
            costOfGoods,
            setCostOfGoods,
            "If you receive tax back on the cost of goods, you can set it here."
          )}

          {renderCostField(
            "Shipping costs",
            shippingCosts,
            setShippingCosts,
            "If you receive tax back on the shipping costs, you can set it here."
          )}

          {renderCostField(
            "Transaction costs",
            transactionCosts,
            setTransactionCosts,
            "If you receive tax back on the transaction costs, you can set it here."
          )}

          {renderCostField(
            "Other costs",
            otherCosts,
            setOtherCosts,
            "If you receive tax back on other costs, you can set it here."
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

      {/* Column 2: Revenue & Result stacked */}
      <div className="space-y-6">
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
              "If you have to pay tax over the revenue, you can set it here."
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
          {/* Main ROAS Display */}
          <div className="text-center">
            <span
              className={`text-5xl font-bold ${
                breakEvenROAS > 0 ? profitabilityStatus.color : "text-primary"
              }`}
            >
              {breakEvenROAS > 0 ? breakEvenROAS.toFixed(2) : "0.00"}
            </span>
          </div>

          {/* Profitability Status */}
          {breakEvenROAS > 0 && (
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex items-center gap-2 font-medium ${profitabilityStatus.color}`}
              >
                {profitabilityStatus.icon}
                {profitabilityStatus.label}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {profitabilityStatus.description}
              </p>
            </div>
          )}

          <Separator />

          {/* Enhanced Results Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Profit per Unit */}
            <div className="bg-background rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                <DollarSign className="h-4 w-4" />
                Profit per Unit
              </div>
              <span
                className={`text-xl font-semibold ${
                  profitPerUnit >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {formatCurrency(profitPerUnit)}
              </span>
            </div>

            {/* Profit Margin */}
            <div className="bg-background rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                <TrendingUp className="h-4 w-4" />
                Profit Margin
              </div>
              <span
                className={`text-xl font-semibold ${
                  profitMarginPercent >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {profitMarginPercent.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Max Ad Spend for Break Even */}
          {breakEvenROAS > 0 && profitPerUnit > 0 && (
            <div className="bg-background rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Max ad spend to break even (per sale):
                </span>
                <span className="font-semibold text-lg">
                  {formatCurrency(maxAdSpendForBreakEven)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Spend less than this per conversion to remain profitable
              </p>
            </div>
          )}

          {/* Calculation Breakdown */}
          {breakEvenROAS > 0 && (
            <div className="text-xs text-muted-foreground text-center">
              <span className="font-mono">
                {formatCurrency(totalRevenue)} / ({formatCurrency(totalRevenue)} -{" "}
                {formatCurrency(totalCosts)}) = {breakEvenROAS.toFixed(2)}
              </span>
            </div>
          )}

          <div className="text-center">
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
