"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, HelpCircle, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function EducationalContent() {
    const { t } = useLanguage();

    return (
        <div className="w-full max-w-xl md:max-w-4xl mx-auto space-y-6 mt-8">
            {/* How it works */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        {t.educational.howItWorks.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        {t.educational.howItWorks.step1}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.howItWorks.step2}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.howItWorks.step3}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.howItWorks.step4}
                    </p>
                </CardContent>
            </Card>

            {/* What is Break Even ROAS */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        {t.educational.whatIsBreakEven.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        {t.educational.whatIsBreakEven.description1}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.whatIsBreakEven.description2}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                        <li>
                            {t.educational.whatIsBreakEven.profitable}
                        </li>
                        <li>
                            {t.educational.whatIsBreakEven.losing}
                        </li>
                        <li>
                            {t.educational.whatIsBreakEven.breakEven}
                        </li>
                    </ul>
                </CardContent>
            </Card>

            {/* Why it matters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        {t.educational.whyImportant.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        {t.educational.whyImportant.description1}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.whyImportant.description2}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.whyImportant.description3}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.whyImportant.description4}
                    </p>
                    <p className="text-muted-foreground">
                        {t.educational.whyImportant.description5}
                    </p>
                </CardContent>
            </Card>

            {/* The Formula */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        {t.educational.formula.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        {t.educational.formula.description}
                    </p>

                    <div className="bg-muted rounded-lg p-4 text-center">
                        <p className="font-mono text-sm sm:text-base">
                            <strong>{t.educational.formula.totalRevenue}</strong> {t.educational.formula.perProduct} / (
                            <strong>{t.educational.formula.totalRevenue}</strong> {t.educational.formula.perProduct} -{" "}
                            <strong>{t.educational.formula.totalCosts}</strong> {t.educational.formula.perProduct}) ={" "}
                            <strong>{t.educational.formula.breakEvenROAS}</strong>
                        </p>
                    </div>

                    <Separator />

                    <div>
                        <p className="font-medium mb-2">{t.educational.formula.exampleTitle}</p>
                        <p className="text-muted-foreground mb-2">
                            {t.educational.formula.exampleDescription}
                        </p>
                        <div className="bg-muted rounded-lg p-3 text-center font-mono text-sm">
                            30 / (30 - (8 + 2)) = <strong>1.5</strong>
                        </div>
                        <p className="text-muted-foreground mt-2">
                            {t.educational.formula.exampleResult}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
