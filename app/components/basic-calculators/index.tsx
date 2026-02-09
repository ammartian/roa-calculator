"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Package, Truck, Receipt, PieChart } from "lucide-react";
import { GrossProfitCalculator } from "./GrossProfitCalculator";

const calculatorMetadata = [
  {
    id: "gross-profit",
    title: "Gross Profit Calculator",
    description: "Calculate gross profit, markup, and gross margin",
    icon: PieChart,
    component: GrossProfitCalculator,
  },
  {
    id: "profit-margin",
    title: "Profit Margin Calculator",
    description: "Calculate profit margins and markup percentages",
    icon: TrendingUp,
    component: null,
  },
  {
    id: "static-cost",
    title: "Static Cost Calculator",
    description: "Calculate fixed costs and break-even points",
    icon: DollarSign,
    component: null,
  },
  {
    id: "variable-cost",
    title: "Variable Cost Calculator",
    description: "Analyze costs that change with production volume",
    icon: Package,
    component: null,
  },
  {
    id: "break-even",
    title: "Break-Even Calculator",
    description: "Determine the point where revenue equals costs",
    icon: Calculator,
    component: null,
  },
  {
    id: "shipping",
    title: "Shipping Cost Calculator",
    description: "Estimate shipping and logistics costs",
    icon: Truck,
    component: null,
  },
  {
    id: "tax",
    title: "Tax Calculator",
    description: "Calculate taxes and after-tax amounts",
    icon: Receipt,
    component: null,
  },
];

export default function BasicCalculators() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculatorMetadata.map((calc) => {
          const Icon = calc.icon;
          const CalculatorComponent = calc.component;
          
          return (
            <Card key={calc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{calc.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {CalculatorComponent ? (
                  <CalculatorComponent />
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      {calc.description}
                    </p>
                    <div className="p-8 border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        Coming soon
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
