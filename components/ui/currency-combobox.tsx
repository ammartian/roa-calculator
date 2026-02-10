"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Currency } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface CurrencyComboboxProps {
    currencies: Currency[];
    value: string;
    onChange: (value: string) => void;
}

export function CurrencyCombobox({ currencies, value, onChange }: CurrencyComboboxProps) {
    const [open, setOpen] = useState(false);

    const selectedCurrency = currencies.find((c) => c.code === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedCurrency ? (
                        <span className="flex items-center gap-2">
                            <span className="text-lg">{selectedCurrency.symbol}</span>
                            <span>{selectedCurrency.code} - {selectedCurrency.name}</span>
                        </span>
                    ) : (
                        "Select currency..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search currency..." />
                    <CommandList>
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                            {currencies.map((currency) => (
                                <CommandItem
                                    key={currency.code}
                                    value={`${currency.code} ${currency.name} ${currency.country}`}
                                    onSelect={() => {
                                        onChange(currency.code)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === currency.code ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <span className="text-lg mr-2">{currency.symbol}</span>
                                    <span className="flex-1">{currency.code}</span>
                                    <span className="text-muted-foreground text-sm">{currency.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
