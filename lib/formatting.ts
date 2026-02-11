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

/**
 * Formats a number string with commas as thousands separators.
 * Preserves decimal places. Handles the integer and decimal parts separately.
 */
export function formatWithCommas(value: string): string {
    if (!value) return value;

    const parts = value.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] || "";

    // Format integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Recombine with decimal part if it exists
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

/**
 * Removes commas from a formatted number string.
 */
export function removeCommas(value: string): string {
    return value.replace(/,/g, "");
}

/**
 * Calculates the new cursor position after formatting with commas.
 * @param value - The original unformatted value
 * @param formattedValue - The value after formatting with commas
 * @param cursorPosition - The cursor position in the original value
 * @returns The new cursor position in the formatted value
 */
export function calculateNewCursorPosition(
    value: string,
    formattedValue: string,
    cursorPosition: number
): number {
    if (!value) return 0;

    // Count commas before cursor in formatted value
    const valueBeforeCursor = value.slice(0, cursorPosition);
    const commasBeforeCursor = (valueBeforeCursor.match(/,/g) || []).length;

    // The new position should account for the commas added
    const newPosition = cursorPosition + commasBeforeCursor;

    // Ensure position doesn't exceed formatted value length
    return Math.min(newPosition, formattedValue.length);
}
