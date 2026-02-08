"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, HelpCircle, Lightbulb } from "lucide-react";

export default function EducationalContent() {
  return (
    <div className="w-full max-w-xl md:max-w-4xl mx-auto space-y-6 mt-8">
      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            How does the calculator work?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            In the first part of the calculator, you fill in all the{" "}
            <strong>costs</strong>, together with the <strong>correct VAT category</strong>{" "}
            of your product.
          </p>
          <p className="text-muted-foreground">
            Then in the second part of the calculator you do the same, but with the{" "}
            <strong>revenue</strong>.
          </p>
          <p className="text-muted-foreground">
            Next, the totals will be added up and the Break Even ROAS will{" "}
            <strong>automatically appear in the bottom section</strong>.
          </p>
          <p className="text-muted-foreground">
            If you want to do a new calculation, click on the{" "}
            <strong>&ldquo;Reset&rdquo;</strong> button and you can enter new data.
          </p>
        </CardContent>
      </Card>

      {/* What is Break Even ROAS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            What is the Break Even ROAS?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            With a Break Even ROAS you know exactly what ROAS you need for your ads to break even.
          </p>
          <p className="text-muted-foreground">
            So if your Break Even ROAS is <strong>1.8</strong> for example:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
            <li>
              Every campaign, ad set/ad group or ad that has a{" "}
              <strong>ROAS higher than 1.8 is profitable</strong>.
            </li>
            <li>
              Every campaign, ad set/ad group or ad that has a{" "}
              <strong>ROAS lower than 1.8 is losing you money</strong>.
            </li>
            <li>
              And of course on every campaign, ad set/ad group or ad that has a{" "}
              <strong>ROAS of 1.8 you are break even</strong>.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Why it matters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Why is it so important?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Calculating the <strong>Break Even ROAS</strong> is very important.
          </p>
          <p className="text-muted-foreground">
            Facebook, TikTok and Snapchat for example indicates for every campaign, ad set/ad group and ad what the ROAS is.
          </p>
          <p className="text-muted-foreground">
            This means you can keep track of how effective that part of your online advertising campaign is at all different levels.
          </p>
          <p className="text-muted-foreground">
            A ROAS of 1 means you are spending exactly the same amount of money as you are earning of a conversion. If you spend $10 to sell a $10 product, the platform will indicate a ROAS of 1.
          </p>
          <p className="text-muted-foreground">
            Simply put, this means you break even. However, you must also take other costs into account like cost of goods, shipping costs, transaction costs, VAT, and maybe other costs. This is where the <strong>Break Even ROAS</strong> comes in.
          </p>
        </CardContent>
      </Card>

      {/* The Formula */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            The Break Even ROAS Formula
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            First of all, you have to add up all your costs together. Then by using the formula below you can calculate the ROAS at which a campaign, ad set/ad group or ad is profitable.
          </p>
          
          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="font-mono text-sm sm:text-base">
              <strong>Total Revenue</strong> per product / (
              <strong>Total Revenue</strong> per product -{" "}
              <strong>Total Costs</strong> per product) ={" "}
              <strong>Break Even ROAS</strong>
            </p>
          </div>

          <Separator />

          <div>
            <p className="font-medium mb-2">Example:</p>
            <p className="text-muted-foreground mb-2">
              Suppose you sell a product for <strong>$30</strong>, cost of goods are{" "}
              <strong>$8</strong> & the shipping costs are <strong>$2</strong>.
            </p>
            <div className="bg-muted rounded-lg p-3 text-center font-mono text-sm">
              30 / (30 - (8 + 2)) = <strong>1.5</strong>
            </div>
            <p className="text-muted-foreground mt-2">
              This means that for every campaign, ad set/ad group or ad that has a ROAS higher than 1.5, you make a profit.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
