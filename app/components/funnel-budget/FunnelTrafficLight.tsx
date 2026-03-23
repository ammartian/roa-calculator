"use client";

import type { TrafficLightLevel } from "@/lib/funnelBudgetCalculations";
import { cn } from "@/lib/utils";

export interface FunnelTrafficLightLabels {
    healthy: string;
    borderline: string;
    over: string;
    neutral: string;
}

interface FunnelTrafficLightProps {
    level: TrafficLightLevel;
    labels: FunnelTrafficLightLabels;
}

export function FunnelTrafficLight({ level, labels }: FunnelTrafficLightProps) {
    const { className, text } = ((): { className: string; text: string } => {
        switch (level) {
            case "healthy":
                return {
                    className:
                        "bg-emerald-600 text-white dark:bg-emerald-700 dark:text-white",
                    text: labels.healthy,
                };
            case "borderline":
                return {
                    className:
                        "bg-amber-500 text-amber-950 dark:bg-amber-600 dark:text-amber-950",
                    text: labels.borderline,
                };
            case "over":
                return {
                    className: "bg-red-600 text-white dark:bg-red-700 dark:text-white",
                    text: labels.over,
                };
            default:
                return {
                    className: "bg-muted text-muted-foreground",
                    text: labels.neutral,
                };
        }
    })();

    return (
        <div
            className={cn(
                "rounded-lg px-4 py-3 text-center text-sm font-semibold",
                className
            )}
            role="status"
            aria-live="polite"
        >
            {text}
        </div>
    );
}
