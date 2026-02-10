"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, DollarSign, Package, Calculator, TrendingUp, Target } from "lucide-react";
import { GrossProfitCalculator } from "./GrossProfitCalculator";
import { useLanguage } from "@/lib/i18n/context";

const calculatorMetadata = [
    {
        id: "gross-profit",
        icon: PieChart,
        component: GrossProfitCalculator,
    },
    {
        id: "fixed-cost",
        icon: DollarSign,
        component: null,
    },
    {
        id: "variable-cost",
        icon: Package,
        component: null,
    },
    {
        id: "cost-per-unit",
        icon: Calculator,
        component: null,
    },
    {
        id: "selling-price-profit",
        icon: TrendingUp,
        component: null,
    },
    {
        id: "sales-target-profit",
        icon: Target,
        component: null,
    },
];

export default function BasicCalculators() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {calculatorMetadata.map((calc) => {
                    const Icon = calc.icon;
                    const CalculatorComponent = calc.component;

                    // Get translated title and description from the basicCalculators section
                    const title = t.basicCalculators?.[calc.id as keyof typeof t.basicCalculators]?.title || calc.id;
                    const description = t.basicCalculators?.[calc.id as keyof typeof t.basicCalculators]?.description || "";

                    return (
                        <Card key={calc.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">{title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {CalculatorComponent ? (
                                    <CalculatorComponent />
                                ) : (
                                    <>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {description}
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
