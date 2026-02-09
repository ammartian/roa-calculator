# Multi-Language Implementation Plan

## Overview
Implement English (default) and Bahasa Malaysia support for ROA Calculator using React Context + JSON translation files.

## User Requirements
1. ✅ Language and currency selectors are separate
2. ✅ Use Google Translate for Bahasa Malaysia translations
3. ✅ HTML `lang` attribute updates with language change
4. ✅ Language preference persists in localStorage

## Implementation Structure

### 1. Directory Structure
```
lib/i18n/
├── types.ts             # TypeScript interfaces
├── context.tsx          # LanguageProvider component
├── useTranslation.ts    # Hook for accessing translations
└── translations/
    ├── en.json          # English translations
    └── ms.json          # Bahasa Malaysia translations
```

### 2. Translation Files Format

#### en.json
```json
{
  "common": {
    "language": "Language",
    "english": "English",
    "malay": "Bahasa Malaysia"
  },
  "page": {
    "title": "ROA Calculator",
    "subtitle": "Calculate your Break Even ROAS in seconds"
  },
  "calculator": {
    "costs": {
      "title": "Costs (per product)",
      "currency": "Currency",
      "taxRate": "Tax rate (applies to all)",
      "taxRateDescription": "Set a default tax rate for all fields. You can customize each field individually below.",
      "costOfGoods": "Cost of goods",
      "costOfGoodsTaxDescription": "If you receive tax back on the cost of goods, you can set it here.",
      "shippingCosts": "Shipping costs",
      "shippingCostsTaxDescription": "If you receive tax back on the shipping costs, you can set it here.",
      "transactionCosts": "Transaction costs",
      "transactionCostsTaxDescription": "If you receive tax back on the transaction costs, you can set it here.",
      "otherCosts": "Other costs",
      "otherCostsTaxDescription": "If you receive tax back on other costs, you can set it here.",
      "totalCosts": "Total costs"
    },
    "revenue": {
      "title": "Revenue (per product)",
      "revenue": "Revenue",
      "revenueTaxDescription": "If you have to pay tax over the revenue, you can set it here.",
      "totalRevenue": "Total revenue"
    },
    "results": {
      "title": "Break Even ROAS",
      "profitPerUnit": "Profit per Unit",
      "profitMargin": "Profit Margin",
      "maxAdSpend": "Max ad spend to break even (per sale)",
      "maxAdSpendDescription": "Spend less than this per conversion to remain profitable",
      "reset": "Reset",
      "status": {
        "enterValues": "Enter values",
        "enterValuesDescription": "Fill in costs and revenue to see results",
        "losingMoney": "Losing Money",
        "losingMoneyDescription": "Your costs exceed or match your revenue",
        "lowMargin": "Low Margin",
        "lowMarginDescription": "Thin profit margin - optimize costs or increase prices",
        "profitable": "Profitable",
        "profitableDescription": "Good profit margin - typical for most industries",
        "highlyProfitable": "Highly Profitable",
        "highlyProfitableDescription": "Excellent profit margin - scale your campaigns!"
      }
    }
  },
  "educational": {
    "howItWorks": {
      "title": "How does the calculator work?",
      "step1": "In the first part of the calculator, you fill in all the costs, together with the correct VAT category of your product.",
      "step2": "Then in the second part of the calculator you do the same, but with the revenue.",
      "step3": "Next, the totals will be added up and the Break Even ROAS will automatically appear in the bottom section.",
      "step4": "If you want to do a new calculation, click on the \"Reset\" button and you can enter new data."
    },
    "whatIsBreakEven": {
      "title": "What is the Break Even ROAS?",
      "description1": "With a Break Even ROAS you know exactly what ROAS you need for your ads to break even.",
      "description2": "So if your Break Even ROAS is 1.8 for example:",
      "profitable": "Every campaign, ad set/ad group or ad that has a ROAS higher than 1.8 is profitable.",
      "losing": "Every campaign, ad set/ad group or ad that has a ROAS lower than 1.8 is losing you money.",
      "breakEven": "And of course on every campaign, ad set/ad group or ad that has a ROAS of 1.8 you are break even."
    },
    "whyImportant": {
      "title": "Why is it so important?",
      "description1": "Calculating the Break Even ROAS is very important.",
      "description2": "Facebook, TikTok and Snapchat for example indicates for every campaign, ad set/ad group and ad what the ROAS is.",
      "description3": "This means you can keep track of how effective that part of your online advertising campaign is at all different levels.",
      "description4": "A ROAS of 1 means you are spending exactly the same amount of money as you are earning of a conversion. If you spend $10 to sell a $10 product, the platform will indicate a ROAS of 1.",
      "description5": "Simply put, this means you break even. However, you must also take other costs into account like cost of goods, shipping costs, transaction costs, VAT, and maybe other costs. This is where the Break Even ROAS comes in."
    },
    "formula": {
      "title": "The Break Even ROAS Formula",
      "description": "First of all, you have to add up all your costs together. Then by using the formula below you can calculate the ROAS at which a campaign, ad set/ad group or ad is profitable.",
      "exampleTitle": "Example:",
      "exampleDescription": "Suppose you sell a product for $30, cost of goods are $8 & the shipping costs are $2.",
      "exampleResult": "This means that for every campaign, ad set/ad group or ad that has a ROAS higher than 1.5, you make a profit."
    }
  },
  "footer": {
    "copyright": "ROA Calculator. Product of Lima Angka."
  }
}
```

#### ms.json (Bahasa Malaysia - via Google Translate)
```json
{
  "common": {
    "language": "Bahasa",
    "english": "English",
    "malay": "Bahasa Malaysia"
  },
  "page": {
    "title": "Kalkulator ROA",
    "subtitle": "Kira Break Even ROAS anda dalam beberapa saat"
  },
  "calculator": {
    "costs": {
      "title": "Kos (setiap produk)",
      "currency": "Mata Wang",
      "taxRate": "Kadar cukai (berlaku untuk semua)",
      "taxRateDescription": "Tetapkan kadar cukai lalai untuk semua medan. Anda boleh menyesuaikan setiap medan secara individu di bawah.",
      "costOfGoods": "Kos barang",
      "costOfGoodsTaxDescription": "Jika anda menerima cukai balik untuk kos barang, anda boleh menetapkannya di sini.",
      "shippingCosts": "Kos penghantaran",
      "shippingCostsTaxDescription": "Jika anda menerima cukai balik untuk kos penghantaran, anda boleh menetapkannya di sini.",
      "transactionCosts": "Kos transaksi",
      "transactionCostsTaxDescription": "Jika anda menerima cukai balik untuk kos transaksi, anda boleh menetapkannya di sini.",
      "otherCosts": "Kos lain",
      "otherCostsTaxDescription": "Jika anda menerima cukai balik untuk kos lain, anda boleh menetapkannya di sini.",
      "totalCosts": "Jumlah kos"
    },
    "revenue": {
      "title": "Hasil (setiap produk)",
      "revenue": "Hasil",
      "revenueTaxDescription": "Jika anda perlu membayar cukai ke atas hasil, anda boleh menetapkannya di sini.",
      "totalRevenue": "Jumlah hasil"
    },
    "results": {
      "title": "Break Even ROAS",
      "profitPerUnit": "Keuntungan Seunit",
      "profitMargin": "Margin Keuntungan",
      "maxAdSpend": "Perbelanjaan iklan maksimum untuk break even (setiap jualan)",
      "maxAdSpendDescription": "Berbelanja kurang daripada ini setiap penukaran untuk kekal menguntungkan",
      "reset": "Tetapkan Semula",
      "status": {
        "enterValues": "Masukkan nilai",
        "enterValuesDescription": "Isi kos dan hasil untuk melihat keputusan",
        "losingMoney": "Rugi Wang",
        "losingMoneyDescription": "Kos anda melebihi atau sama dengan hasil anda",
        "lowMargin": "Margin Rendah",
        "lowMarginDescription": "Margin keuntungan nipis - optimakan kos atau naikkan harga",
        "profitable": "Menguntungkan",
        "profitableDescription": "Margin keuntungan yang baik - biasa untuk kebanyakan industri",
        "highlyProfitable": "Sangat Menguntungkan",
        "highlyProfitableDescription": "Margin keuntungan yang sangat baik - skalakan kempen anda!"
      }
    }
  },
  "educational": {
    "howItWorks": {
      "title": "Bagaimanakah kalkulator ini berfungsi?",
      "step1": "Dalam bahagian pertama kalkulator, anda mengisi semua kos, bersama dengan kategori VAT yang betul untuk produk anda.",
      "step2": "Kemudian dalam bahagian kedua kalkulator anda melakukan perkara yang sama, tetapi dengan hasil.",
      "step3": "Seterusnya, jumlah akan dijumlahkan dan Break Even ROAS akan muncul secara automatik di bahagian bawah.",
      "step4": "Jika anda ingin melakukan pengiraan baharu, klik butang \"Tetapkan Semula\" dan anda boleh memasukkan data baharu."
    },
    "whatIsBreakEven": {
      "title": "Apakah Break Even ROAS?",
      "description1": "Dengan Break Even ROAS anda tahu dengan tepat berapa ROAS yang anda perlukan untuk iklan anda break even.",
      "description2": "Jadi jika Break Even ROAS anda adalah 1.8 sebagai contoh:",
      "profitable": "Setiap kempen, set iklan/kumpulan iklan atau iklan yang mempunyai ROAS lebih tinggi daripada 1.8 adalah menguntungkan.",
      "losing": "Setiap kempen, set iklan/kumpulan iklan atau iklan yang mempunyai ROAS lebih rendah daripada 1.8 menyebabkan anda rugi wang.",
      "breakEven": "Dan tentu sahaja pada setiap kempen, set iklan/kumpulan iklan atau iklan yang mempunyai ROAS 1.8 anda adalah break even."
    },
    "whyImportant": {
      "title": "Mengapakah ia sangat penting?",
      "description1": "Mengira Break Even ROAS adalah sangat penting.",
      "description2": "Facebook, TikTok dan Snapchat sebagai contoh menunjukkan untuk setiap kempen, set iklan/kumpulan iklan dan iklan berapa ROASnya.",
      "description3": "Ini bermakna anda boleh mengesan berkesannya bahagian kempen pengiklanan dalam talian anda pada semua peringkat yang berbeza.",
      "description4": "ROAS 1 bermakna anda membelanjakan jumlah wang yang sama seperti yang anda peroleh daripada penukaran. Jika anda membelanjakan $10 untuk menjual produk $10, platform akan menunjukkan ROAS 1.",
      "description5": "Ringkasnya, ini bermakna anda break even. Walau bagaimanapun, anda juga mesti mengambil kira kos lain seperti kos barang, kos penghantaran, kos transaksi, VAT, dan mungkin kos lain. Di sinilah Break Even ROAS berperanan."
    },
    "formula": {
      "title": "Formula Break Even ROAS",
      "description": "Pertama sekali, anda perlu menjumlahkan semua kos anda bersama. Kemudian dengan menggunakan formula di bawah anda boleh mengira ROAS di mana kempen, set iklan/kumpulan iklan atau iklan adalah menguntungkan.",
      "exampleTitle": "Contoh:",
      "exampleDescription": "Andaikan anda menjual produk seharga $30, kos barang adalah $8 & kos penghantaran adalah $2.",
      "exampleResult": "Ini bermakna untuk setiap kempen, set iklan/kumpulan iklan atau iklan yang mempunyai ROAS lebih tinggi daripada 1.5, anda memperoleh keuntungan."
    }
  },
  "footer": {
    "copyright": "Kalkulator ROA. Produk Lima Angka."
  }
}
```

### 3. TypeScript Types (lib/i18n/types.ts)

```typescript
export type Language = "en" | "ms";

export interface Translations {
  common: {
    language: string;
    english: string;
    malay: string;
  };
  page: {
    title: string;
    subtitle: string;
  };
  calculator: {
    costs: {
      title: string;
      currency: string;
      taxRate: string;
      taxRateDescription: string;
      costOfGoods: string;
      costOfGoodsTaxDescription: string;
      shippingCosts: string;
      shippingCostsTaxDescription: string;
      transactionCosts: string;
      transactionCostsTaxDescription: string;
      otherCosts: string;
      otherCostsTaxDescription: string;
      totalCosts: string;
    };
    revenue: {
      title: string;
      revenue: string;
      revenueTaxDescription: string;
      totalRevenue: string;
    };
    results: {
      title: string;
      profitPerUnit: string;
      profitMargin: string;
      maxAdSpend: string;
      maxAdSpendDescription: string;
      reset: string;
      status: {
        enterValues: string;
        enterValuesDescription: string;
        losingMoney: string;
        losingMoneyDescription: string;
        lowMargin: string;
        lowMarginDescription: string;
        profitable: string;
        profitableDescription: string;
        highlyProfitable: string;
        highlyProfitableDescription: string;
      };
    };
  };
  educational: {
    howItWorks: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    whatIsBreakEven: {
      title: string;
      description1: string;
      description2: string;
      profitable: string;
      losing: string;
      breakEven: string;
    };
    whyImportant: {
      title: string;
      description1: string;
      description2: string;
      description3: string;
      description4: string;
      description5: string;
    };
    formula: {
      title: string;
      description: string;
      exampleTitle: string;
      exampleDescription: string;
      exampleResult: string;
    };
  };
  footer: {
    copyright: string;
  };
}
```

### 4. Language Context (lib/i18n/context.tsx)

```typescript
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && (stored === "en" || stored === "ms")) {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

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
```

### 5. Language Switcher Component (components/ui/language-switcher.tsx)

```typescript
"use client";

import { useLanguage } from "@/lib/i18n/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "ms")}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t.common.english}</SelectItem>
          <SelectItem value="ms">{t.common.malay}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

### 6. Files to Modify

#### app/layout.tsx
- Wrap children with LanguageProvider
- Remove hardcoded `lang="en"` - it will be set dynamically by the context

#### app/page.tsx
- Add LanguageSwitcher component to header
- Translate title and subtitle using useLanguage hook

#### app/components/calculator/index.tsx
- Pass translations down to child components via props

#### app/components/calculator/CostSection.tsx
- Receive translations via props
- Replace all hardcoded strings with translation keys

#### app/components/calculator/RevenueSection.tsx
- Receive translations via props
- Replace all hardcoded strings with translation keys

#### app/components/calculator/ResultsSection.tsx
- Receive translations via props
- Replace all hardcoded strings with translation keys

#### app/components/calculator/CostField.tsx
- Receive label via props (already done)
- Tax descriptions will come from parent

#### app/components/educational-content.tsx
- Use useLanguage hook
- Replace all hardcoded strings with translation keys

#### app/components/footer.tsx
- Receive translations via props or use hook
- Replace hardcoded copyright text

### 7. Implementation Order

1. Create directory structure and types.ts
2. Create translation JSON files (en.json, ms.json)
3. Create context.tsx with LanguageProvider
4. Create language-switcher.tsx component
5. Update layout.tsx to wrap with provider
6. Update page.tsx with language switcher
7. Update all calculator components
8. Update educational-content.tsx
9. Update footer.tsx
10. Run lint to verify

### 8. Testing Checklist

- [ ] Language defaults to English on first visit
- [ ] Language persists after page reload
- [ ] HTML lang attribute updates when switching
- [ ] All text content translates correctly
- [ ] No console errors
- [ ] Lint passes

## Notes

- Using React Context instead of external i18n library keeps bundle size small
- JSON files make translations easy to edit
- TypeScript provides autocomplete and type safety
- localStorage persistence ensures user preference is remembered
- Dynamic HTML lang attribute helps with SEO and accessibility
