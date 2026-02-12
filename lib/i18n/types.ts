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
            formula: string;
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
    fixedCostCalculator: {
        currency: string;
        fixedCostsSection: string;
        premisesRent: string;
        staffSalaries: string;
        internetBill: string;
        addAdditionalCost: string;
        maxReached: string;
        unitsSold: string;
        unitsSoldLabel: string;
        results: string;
        totalFixedCosts: string;
        fixedCostPerUnit: string;
        enterValues: string;
        reset: string;
        costNamePlaceholder: string;
        cancel: string;
        add: string;
    };
    variableCostCalculator: {
        currency: string;
        variableCostsSection: string;
        productCost: string;
        courierCost: string;
        platformFee: string;
        marketingCost: string;
        addAdditionalCost: string;
        maxReached: string;
        results: string;
        totalVariableCosts: string;
        enterValues: string;
        reset: string;
        costNamePlaceholder: string;
        cancel: string;
        add: string;
    };
    costPerUnitCalculator: {
        currency: string;
        fixedCostPerUnit: string;
        variableCostPerUnit: string;
        results: string;
        totalCostPerUnit: string;
        enterValues: string;
        reset: string;
        importantNotice: string;
        noticeDescription: string;
    };
    sellingPriceCalculator: {
        currency: string;
        totalCostPerUnit: string;
        desiredProfit: string;
        safetyMargin: string;
        results: string;
        minimumSellingPrice: string;
        recommendedSellingPrice: string;
        netProfit: string;
        netMargin: string;
        enterValues: string;
        reset: string;
    };
    salesTargetCalculator: {
        currency: string;
        targetRevenue: string;
        sellingPricePerUnit: string;
        netMarginPercent: string;
        results: string;
        unitsRequired: string;
        units: string;
        estimatedProfit: string;
        enterValues: string;
        reset: string;
    };
    basicCalculators: {
        "gross-profit": {
            title: string;
            description: string;
        };
        "fixed-cost": {
            title: string;
            description: string;
        };
        "variable-cost": {
            title: string;
            description: string;
        };
        "cost-per-unit": {
            title: string;
            description: string;
        };
        "selling-price-profit": {
            title: string;
            description: string;
        };
        "sales-target-profit": {
            title: string;
            description: string;
        };
    };
}
