"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "inputMode"> {
    currencySymbol: string;
    inputClassName?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ currencySymbol, className, inputClassName, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex items-center gap-2 flex-1 border rounded-md px-3 bg-background focus-within:ring-2 focus-within:ring-ring",
                    className
                )}
            >
                <span className="text-muted-foreground whitespace-nowrap font-medium">
                    {currencySymbol}
                </span>
                <Input
                    ref={ref}
                    type="text"
                    inputMode="decimal"
                    className={cn(
                        "border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none",
                        inputClassName
                    )}
                    {...props}
                />
            </div>
        );
    }
);

CurrencyInput.displayName = "CurrencyInput";
