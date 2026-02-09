"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from "react";
import type { Language, Translations } from "./types";
import en from "./translations/en.json";
import ms from "./translations/ms.json";

const translations: Record<Language, Translations> = { en, ms };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "roa-calculator-language";

function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && (stored === "en" || stored === "ms")) {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return null;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Always start with default to match SSR
  const [language, setLanguageState] = useState<Language>("en");
  const hasSyncedRef = useRef(false);

  // Sync with localStorage on mount (after hydration), then persist changes
  useEffect(() => {
    if (!hasSyncedRef.current) {
      // Initial mount: read from localStorage if available
      hasSyncedRef.current = true;
      const stored = getStoredLanguage();
      if (stored && stored !== language) {
        // Use queueMicrotask to avoid synchronous setState in effect body
        queueMicrotask(() => {
          setLanguageState(stored);
        });
      }
    } else {
      // Subsequent changes: persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch {
        // localStorage not available
      }
    }

    // Always update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
