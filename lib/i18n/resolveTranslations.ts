import type { BusinessType, Translations } from "./types";

const VARIANT_RE = /^(.+)_(product|service)$/;

function resolveValue(
    record: Record<string, unknown>,
    key: string,
    businessType: BusinessType,
    basesWithVariants: Set<string>
): unknown {
    const variantKey = `${key}_${businessType}`;
    let value = record[key];
    if (
        basesWithVariants.has(key) &&
        variantKey in record &&
        typeof record[variantKey] === "string"
    ) {
        value = record[variantKey];
    }
    return value;
}

/**
 * Deep-clones translation JSON and replaces each base string key with
 * `key_product` or `key_service` when those sibling keys exist.
 */
export function resolveTranslations(
    raw: Translations,
    businessType: BusinessType
): Translations {
    return resolveNode(raw, businessType) as Translations;
}

function resolveNode(node: unknown, businessType: BusinessType): unknown {
    if (node === null || typeof node !== "object") {
        return node;
    }
    if (Array.isArray(node)) {
        return node.map((item) => resolveNode(item, businessType));
    }

    const record = node as Record<string, unknown>;
    const keys = Object.keys(record);
    const basesWithVariants = new Set<string>();
    for (const key of keys) {
        const m = key.match(VARIANT_RE);
        if (m) {
            basesWithVariants.add(m[1]);
        }
    }

    const out: Record<string, unknown> = {};

    for (const key of keys) {
        if (VARIANT_RE.test(key)) {
            continue;
        }
        const value = resolveValue(record, key, businessType, basesWithVariants);
        if (value !== null && typeof value === "object") {
            out[key] = resolveNode(value, businessType);
        } else {
            out[key] = value;
        }
    }

    for (const base of basesWithVariants) {
        if (!(base in out)) {
            const variantKey = `${base}_${businessType}`;
            if (variantKey in record) {
                out[base] = record[variantKey];
            }
        }
    }

    return out;
}
