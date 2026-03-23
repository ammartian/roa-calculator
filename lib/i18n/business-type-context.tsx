"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import type { BusinessType } from "./types";

interface BusinessTypeContextType {
    businessType: BusinessType;
    setBusinessType: (value: BusinessType) => void;
}

const BusinessTypeContext = createContext<BusinessTypeContextType | undefined>(
    undefined
);

const STORAGE_KEY = "roa-calculator-business-type";

function getStoredBusinessType(): BusinessType | null {
    if (typeof window === "undefined") return null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY) as BusinessType | null;
        if (stored === "product" || stored === "service") {
            return stored;
        }
    } catch {
        // localStorage not available
    }
    return null;
}

interface BusinessTypeProviderProps {
    children: ReactNode;
}

export function BusinessTypeProvider({ children }: BusinessTypeProviderProps) {
    const [businessType, setBusinessTypeState] = useState<BusinessType>("product");
    const hasSyncedRef = useRef(false);

    useEffect(() => {
        if (!hasSyncedRef.current) {
            hasSyncedRef.current = true;
            const stored = getStoredBusinessType();
            if (stored && stored !== businessType) {
                queueMicrotask(() => {
                    setBusinessTypeState(stored);
                });
            }
        } else {
            try {
                localStorage.setItem(STORAGE_KEY, businessType);
            } catch {
                // localStorage not available
            }
        }
    }, [businessType]);

    const setBusinessType = useCallback((value: BusinessType) => {
        setBusinessTypeState(value);
    }, []);

    const value: BusinessTypeContextType = {
        businessType,
        setBusinessType,
    };

    return (
        <BusinessTypeContext.Provider value={value}>
            {children}
        </BusinessTypeContext.Provider>
    );
}

export function useBusinessType(): BusinessTypeContextType {
    const context = useContext(BusinessTypeContext);
    if (context === undefined) {
        throw new Error("useBusinessType must be used within a BusinessTypeProvider");
    }
    return context;
}
