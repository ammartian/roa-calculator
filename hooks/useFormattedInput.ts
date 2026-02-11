"use client";

import { useRef, useState, useEffect, useCallback, ChangeEvent, KeyboardEvent } from "react";
import { formatWithCommas, removeCommas, sanitizeDecimalInput, sanitizeIntegerInput } from "@/lib/formatting";

interface UseFormattedInputOptions {
    allowDecimals?: boolean;
    allowNegative?: boolean;
}

interface UseFormattedInputReturn {
    displayValue: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function useFormattedInput(
    value: string,
    onChange: (value: string) => void,
    options: UseFormattedInputOptions = {}
): UseFormattedInputReturn {
    const { allowDecimals = true, allowNegative = true } = options;
    const inputRef = useRef<HTMLInputElement>(null);
    const [displayValue, setDisplayValue] = useState(() => formatWithCommas(value));

    // Sync display value with external value changes
    useEffect(() => {
        setDisplayValue(formatWithCommas(value));
    }, [value]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const rawValue = removeCommas(input.value);
        
        // Sanitize based on allowed types
        const sanitized = allowDecimals 
            ? sanitizeDecimalInput(rawValue)
            : sanitizeIntegerInput(rawValue);
        
        const formatted = formatWithCommas(sanitized);

        // Calculate cursor position adjustment
        const selectionStart = input.selectionStart || 0;
        const commasBefore = (input.value.slice(0, selectionStart).match(/,/g) || []).length;
        const newCommasBefore = (formatted.slice(0, selectionStart).match(/,/g) || []).length;
        const commaDiff = newCommasBefore - commasBefore;

        setDisplayValue(formatted);
        onChange(sanitized);

        // Restore cursor position after React re-render
        requestAnimationFrame(() => {
            if (inputRef.current) {
                const newPosition = selectionStart + commaDiff;
                inputRef.current.setSelectionRange(newPosition, newPosition);
            }
        });
    }, [allowDecimals, onChange]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        // Allow only numbers, decimal point, negative sign, and navigation keys
        const allowedKeys = [
            "Backspace", "Delete", "Tab", "Escape", "Enter",
            "Home", "End", "ArrowLeft", "ArrowRight",
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"
        ];

        if (e.ctrlKey || e.metaKey) {
            return; // Allow copy/paste shortcuts
        }

        if (!allowedKeys.includes(e.key)) {
            e.preventDefault();
            return;
        }

        // Prevent multiple decimal points
        if (e.key === "." && (!allowDecimals || displayValue.includes("."))) {
            e.preventDefault();
            return;
        }

        // Prevent negative sign if not allowed
        if (e.key === "-" && !allowNegative) {
            e.preventDefault();
            return;
        }

        // Prevent negative sign in middle of number
        if (e.key === "-" && (e.currentTarget.selectionStart || 0) > 0) {
            e.preventDefault();
        }
    }, [allowDecimals, allowNegative, displayValue]);

    return {
        displayValue,
        inputRef,
        handleChange,
        handleKeyDown
    };
}
