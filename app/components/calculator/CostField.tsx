"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CostField as CostFieldType } from "@/types";

interface CostFieldProps {
  label: string;
  field: CostFieldType;
  onValueChange: (value: string) => void;
  onTaxChange: (value: string) => void;
  currencySymbol: string;
  taxDescription?: string;
}

export function CostField({
  label,
  field,
  onValueChange,
  onTaxChange,
  currencySymbol,
  taxDescription,
}: CostFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="font-medium">{label}</Label>
      <div className="flex gap-2">
        <div className="flex items-center gap-2 flex-1 border rounded-md px-3 bg-background focus-within:ring-2 focus-within:ring-ring">
          <span className="text-muted-foreground whitespace-nowrap font-medium">
            {currencySymbol}
          </span>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={field.value}
            onChange={(e) => onValueChange(e.target.value)}
            className="border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none"
          />
        </div>
        <div className="relative w-[80px]">
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={field.tax}
            onChange={(e) => onTaxChange(e.target.value)}
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
}
