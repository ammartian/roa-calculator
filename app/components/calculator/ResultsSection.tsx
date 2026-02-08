"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import type { CalculatorResults } from "@/types";

interface ResultsSectionProps {
  results: CalculatorResults;
  formatCurrency: (value: number) => string;
  onReset: () => void;
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

export function ResultsSection({
  results,
  formatCurrency,
  onReset,
}: ResultsSectionProps) {
  const {
    breakEvenROAS,
    profitPerUnit,
    profitMarginPercent,
    maxAdSpendForBreakEven,
    totalRevenue,
    totalCosts,
  } = results;

  const profitabilityStatus = getProfitabilityStatus(breakEvenROAS);

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg text-center">Break Even ROAS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <span
            className={`text-5xl font-bold ${
              breakEvenROAS > 0 ? profitabilityStatus.color : "text-primary"
            }`}
          >
            {breakEvenROAS > 0 ? breakEvenROAS.toFixed(2) : "0.00"}
          </span>
        </div>

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

        <div className="grid grid-cols-2 gap-4">
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

        {breakEvenROAS > 0 && (
          <div className="text-xs text-muted-foreground text-center">
            <span className="font-mono">
              {formatCurrency(totalRevenue)} / ({formatCurrency(totalRevenue)} -{" "}
              {formatCurrency(totalCosts)}) = {breakEvenROAS.toFixed(2)}
            </span>
          </div>
        )}

        <div className="text-center">
          <Button onClick={onReset} variant="outline" size="lg">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
