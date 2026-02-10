"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface DynamicCostItemData {
    id: string;
    title: string;
    amount: string;
}

interface DynamicCostItemProps {
    cost: DynamicCostItemData;
    currencySymbol: string;
    onUpdate: (id: string, field: keyof DynamicCostItemData, value: string) => void;
    onRemove: (id: string) => void;
}

export function DynamicCostItem({
    cost,
    currencySymbol,
    onUpdate,
    onRemove,
}: DynamicCostItemProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label className="font-medium">{cost.title}</Label>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(cost.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center gap-2 flex-1 border rounded-md px-3 bg-background focus-within:ring-2 focus-within:ring-ring">
                <span className="text-muted-foreground whitespace-nowrap font-medium">
                    {currencySymbol}
                </span>
                <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={cost.amount}
                    onChange={(e) => onUpdate(cost.id, "amount", e.target.value)}
                    className="border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none"
                />
            </div>
        </div>
    );
}
