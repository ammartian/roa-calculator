"use client";

import { type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormattedInput } from "@/hooks/useFormattedInput";

export interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "inputMode" | "value" | "onChange" | "ref"> {
    currencySymbol: string;
    inputClassName?: string;
    value: string;
    onChange: (value: string) => void;
}

export function CurrencyInput({
    currencySymbol,
    className,
    inputClassName,
    value,
    onChange,
    ...props
}: CurrencyInputProps) {
    const { displayValue, inputRef, handleChange, handleKeyDown } = useFormattedInput(value, onChange);

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
                ref={inputRef}
                type="text"
                inputMode="decimal"
                className={cn(
                    "border-0 bg-transparent px-0 focus-visible:ring-0 shadow-none",
                    inputClassName
                )}
                value={displayValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...props}
            />
        </div>
    );
}
