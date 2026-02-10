"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { CustomCostField as CustomCostFieldType } from "@/types";

interface CustomCostFieldProps {
    customCost: CustomCostFieldType;
    currencySymbol: string;
    onUpdate: (id: string, field: keyof CustomCostFieldType, value: string) => void;
    onRemove: (id: string) => void;
}

export function CustomCostField({
    customCost,
    currencySymbol,
    onUpdate,
    onRemove,
}: CustomCostFieldProps) {
    return (
        <div>
            <div className="flex justify-between items-center">
                <Label className="font-medium">{customCost.title}</Label>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(customCost.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex gap-2">
                <div className="flex items-center gap-2 flex-1 border rounded-md px-3 bg-background focus-within:ring-2 focus-within:ring-ring">
                    <span className="text-muted-foreground whitespace-nowrap font-medium">
                        {currencySymbol}
                    </span>
                    <Input
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={customCost.value}
                        onChange={(e) => onUpdate(customCost.id, "value", e.target.value)}
                        className="border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none"
                    />
                </div>
                <div className="relative w-[80px]">
                    <Input
                        type="text"
                        inputMode="decimal"
                        placeholder="0"
                        value={customCost.tax}
                        onChange={(e) => onUpdate(customCost.id, "tax", e.target.value)}
                        className="pr-7"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        %
                    </span>
                </div>
            </div>
        </div>
    );
}
