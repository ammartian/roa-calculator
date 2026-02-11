"use client";

import { type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { useFormattedInput } from "@/hooks/useFormattedInput";

export interface FormattedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "inputMode" | "value" | "onChange" | "ref"> {
    value: string;
    onChange: (value: string) => void;
    allowDecimals?: boolean;
    allowNegative?: boolean;
    inputMode?: "decimal" | "numeric";
}

export function FormattedInput({
    value,
    onChange,
    allowDecimals = true,
    allowNegative = true,
    inputMode = "decimal",
    ...props
}: FormattedInputProps) {
    const { displayValue, inputRef, handleChange, handleKeyDown } = useFormattedInput(
        value,
        onChange,
        { allowDecimals, allowNegative }
    );

    return (
        <Input
            ref={inputRef}
            type="text"
            inputMode={inputMode}
            value={displayValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...props}
        />
    );
}
