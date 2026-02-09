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
      taxRateTooltip: string;
      taxRateDescription: string;
      taxInputTooltip: string;
      costOfGoods: string;
      costOfGoodsTaxDescription: string;
      shippingCosts: string;
      shippingCostsTaxDescription: string;
      transactionCosts: string;
      transactionCostsTaxDescription: string;
      otherCosts: string;
      otherCostsTaxDescription: string;
      addCustomCost: string;
      removeCustomCost: string;
      customCostTitle: string;
      customCostTitlePlaceholder: string;
      customCostRequired: string;
      customCostsLimit: string;
      customCostsNote: string;
      cancel: string;
      totalCosts: string;
    };
    revenue: {
      title: string;
      revenue: string;
      revenueTaxDescription: string;
      taxInputTooltip: string;
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
      totalRevenue: string;
      totalCosts: string;
      breakEvenROAS: string;
      perProduct: string;
      exampleTitle: string;
      exampleDescription: string;
      exampleResult: string;
    };
  };
  tabs: {
    roa: {
      title: string;
      description: string;
    };
    basic: {
      title: string;
      description: string;
    };
  };
  footer: {
    copyright: string;
  };
  grossProfitCalculator: {
    title: string;
    currency: string;
    cogs: string;
    sellingPrice: string;
    results: string;
    grossProfit: string;
    markup: string;
    grossMargin: string;
    enterValues: string;
    reset: string;
  };
  basicCalculators: {
    "gross-profit": {
      title: string;
      description: string;
    };
    "profit-margin": {
      title: string;
      description: string;
    };
    "static-cost": {
      title: string;
      description: string;
    };
    "variable-cost": {
      title: string;
      description: string;
    };
    "break-even": {
      title: string;
      description: string;
    };
    shipping: {
      title: string;
      description: string;
    };
    tax: {
      title: string;
      description: string;
    };
  };
}
