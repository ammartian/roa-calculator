"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
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
  // Use lazy initialization to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>(() => {
    // During SSR, always return default
    if (typeof window === "undefined") return "en";
    // During client render, check localStorage immediately
    return getStoredLanguage() ?? "en";
  });

  // Persist to localStorage and update HTML lang attribute on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch {
        // localStorage not available
      }
      document.documentElement.lang = language;
    }
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
