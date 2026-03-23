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
        funnel1: {
            title: string;
            description: string;
        };
        funnel2: {
            title: string;
            description: string;
        };
        funnel3: {
            title: string;
            description: string;
        };
        funnel4: {
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
        grossProfitFormula: string;
        markup: string;
        markupFormula: string;
        grossMargin: string;
        grossMarginFormula: string;
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
        fixedCostPerUnitFormula: string;
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
        totalVariableCostsFormula: string;
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
        totalCostPerUnitFormula: string;
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
        minimumSellingPriceFormula: string;
        recommendedSellingPrice: string;
        recommendedSellingPriceFormula: string;
        netProfit: string;
        netProfitFormula: string;
        netMargin: string;
        netMarginFormula: string;
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
        unitsRequiredFormula: string;
        units: string;
        estimatedProfit: string;
        estimatedProfitFormula: string;
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
    funnel1: {
        inputsTitle: string;
        resultsTitle: string;
        trafficLightTitle: string;
        trafficLightHealthy: string;
        trafficLightBorderline: string;
        trafficLightOver: string;
        trafficLightNeutral: string;
        targetSales: string;
        targetSalesTooltip: string;
        averageOrderValue: string;
        averageOrderValueTooltip: string;
        conversionRate: string;
        conversionRateTooltip: string;
        cogs: string;
        cogsTooltip: string;
        marketingBudgetPercent: string;
        marketingBudgetPercentTooltip: string;
        percentSuffix: string;
        totalCustomers: string;
        leadsNeeded: string;
        grossProfitMargin: string;
        maxCPP: string;
        maxCPL: string;
        totalMarketingBudget: string;
        roas: string;
        primaryMetricHint: string;
        reset: string;
        enterValues: string;
    };
    funnel2: {
        inputsTitle: string;
        resultsTitle: string;
        trafficLightTitle: string;
        trafficLightHealthy: string;
        trafficLightBorderline: string;
        trafficLightOver: string;
        trafficLightNeutral: string;
        registrationFee: string;
        registrationFeeTooltip: string;
        targetAgents: string;
        targetAgentsTooltip: string;
        conversionRate: string;
        conversionRateTooltip: string;
        activeAgentPercent: string;
        activeAgentPercentTooltip: string;
        restockValue: string;
        restockValueTooltip: string;
        restockFrequency: string;
        restockFrequencyTooltip: string;
        marketingBudgetPercent: string;
        marketingBudgetPercentTooltip: string;
        percentSuffix: string;
        totalRegFeeCollected: string;
        leadsRequired: string;
        potentialActiveAgents: string;
        ltv: string;
        maxCPA: string;
        maxCPL: string;
        totalMarketingBudget: string;
        roasPerYear: string;
        primaryMetricHint: string;
        reset: string;
        enterValues: string;
    };
    funnel3: {
        inputsTitle: string;
        resultsTitle: string;
        trafficLightTitle: string;
        trafficLightHealthy: string;
        trafficLightBorderline: string;
        trafficLightOver: string;
        trafficLightNeutral: string;
        targetMonthlyCommission: string;
        targetMonthlyCommissionTooltip: string;
        commissionPerNewClient: string;
        commissionPerNewClientTooltip: string;
        showUpRate: string;
        showUpRateTooltip: string;
        closingRateWebinar: string;
        closingRateWebinarTooltip: string;
        cogs: string;
        cogsTooltip: string;
        marketingBudgetPercent: string;
        marketingBudgetPercentTooltip: string;
        percentSuffix: string;
        newClientsRequired: string;
        showupsNeeded: string;
        signupsNeeded: string;
        grossProfitPerClient: string;
        maxCPA: string;
        maxCostPerSignup: string;
        totalMarketingBudget: string;
        roas: string;
        primaryMetricHint: string;
        reset: string;
        enterValues: string;
    };
    funnel4: {
        inputsTitle: string;
        resultsTitle: string;
        trafficLightTitle: string;
        trafficLightHealthy: string;
        trafficLightBorderline: string;
        trafficLightOver: string;
        trafficLightNeutral: string;
        targetSales: string;
        targetSalesTooltip: string;
        packagePrice: string;
        packagePriceTooltip: string;
        ticketPrice: string;
        ticketPriceTooltip: string;
        closingRate: string;
        closingRateTooltip: string;
        showUpRate: string;
        showUpRateTooltip: string;
        cogs: string;
        cogsTooltip: string;
        marketingBudgetPercent: string;
        marketingBudgetPercentTooltip: string;
        percentSuffix: string;
        premiumCustomers: string;
        showupsNeeded: string;
        signupsNeeded: string;
        upfrontSales: string;
        totalSales: string;
        grossProfitPerCustomer: string;
        maxCPA: string;
        maxCostPerSignup: string;
        totalMarketingBudget: string;
        roas: string;
        primaryMetricHint: string;
        reset: string;
        enterValues: string;
    };
}
