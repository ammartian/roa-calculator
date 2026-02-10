/**
 * Sanitizes a decimal input string by removing non-numeric characters
 * except for a single decimal point.
 */
export function sanitizeDecimalInput(value: string): string {
    const sanitized = value.replace(/[^0-9.]/g, "");
    const parts = sanitized.split(".");
    return parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
}

/**
 * Sanitizes an integer input string by removing all non-digit characters.
 */
export function sanitizeIntegerInput(value: string): string {
    return value.replace(/[^0-9]/g, "");
}

/**
 * Formats a decimal input for display, preventing multiple decimal points.
 * Alias for sanitizeDecimalInput for semantic clarity.
 */
export function formatDecimalInput(value: string): string {
    return sanitizeDecimalInput(value);
}
