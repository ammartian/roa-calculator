"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { DollarSign, Hash, HelpCircle, TrendingUp } from "lucide-react";
import { CurrencyInput } from "@/components/ui/currency-input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/** Funnel calculators use fixed RM display (matches Basic Calculators’ CurrencyInput shell). */
export const FUNNEL_CURRENCY_SYMBOL = "RM";

interface FunnelLabeledRowProps {
    id: string;
    label: string;
    tooltip: string;
    icon: LucideIcon;
    children: ReactNode;
}

export function FunnelLabeledRow({
    id,
    label,
    tooltip,
    icon: Icon,
    children,
}: FunnelLabeledRowProps): React.JSX.Element {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
                <Label
                    htmlFor={id}
                    className="flex min-w-0 items-center gap-2 font-medium"
                >
                    <Icon
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden
                    />
                    <span className="truncate">{label}</span>
                </Label>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            className="shrink-0 text-muted-foreground hover:text-foreground"
                            aria-label={tooltip}
                        >
                            <HelpCircle className="size-4" aria-hidden />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            {children}
        </div>
    );
}

interface FunnelCurrencyFieldProps {
    id: string;
    label: string;
    tooltip: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export function FunnelCurrencyField({
    id,
    label,
    tooltip,
    value,
    onChange,
    placeholder,
}: FunnelCurrencyFieldProps): React.JSX.Element {
    return (
        <FunnelLabeledRow
            id={id}
            label={label}
            tooltip={tooltip}
            icon={DollarSign}
        >
            <CurrencyInput
                id={id}
                currencySymbol={FUNNEL_CURRENCY_SYMBOL}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </FunnelLabeledRow>
    );
}

interface FunnelPercentFieldProps {
    id: string;
    label: string;
    tooltip: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    percentSymbol: string;
}

export function FunnelPercentField({
    id,
    label,
    tooltip,
    value,
    onChange,
    placeholder,
    percentSymbol,
}: FunnelPercentFieldProps): React.JSX.Element {
    return (
        <FunnelLabeledRow
            id={id}
            label={label}
            tooltip={tooltip}
            icon={TrendingUp}
        >
            <CurrencyInput
                id={id}
                currencySymbol={percentSymbol}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </FunnelLabeledRow>
    );
}

interface FunnelNumberFieldProps {
    id: string;
    label: string;
    tooltip: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    allowDecimals?: boolean;
    icon?: LucideIcon;
}

export function FunnelNumberField({
    id,
    label,
    tooltip,
    value,
    onChange,
    placeholder,
    allowDecimals = true,
    icon: Icon = Hash,
}: FunnelNumberFieldProps): React.JSX.Element {
    return (
        <FunnelLabeledRow id={id} label={label} tooltip={tooltip} icon={Icon}>
            <FormattedInput
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="focus-visible:ring-2"
                allowDecimals={allowDecimals}
                allowNegative={false}
                inputMode={allowDecimals ? "decimal" : "numeric"}
            />
        </FunnelLabeledRow>
    );
}
