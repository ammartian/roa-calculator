"use client";

import { useMemo } from "react";
import { useLanguage } from "./context";
import { useBusinessType } from "./business-type-context";
import { resolveTranslations } from "./resolveTranslations";
import type { Translations } from "./types";

/**
 * Resolved translations for the current language and business type (product vs service).
 */
export function useT(): Translations {
    const { t } = useLanguage();
    const { businessType } = useBusinessType();

    return useMemo(
        () => resolveTranslations(t, businessType),
        [t, businessType]
    );
}
