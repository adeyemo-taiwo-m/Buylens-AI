"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const formatNaira = (value: string) => value ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Number(value)) : "";

type PriceInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "onBlur"> & {
  value: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
};

export function PriceInput({ value, onValueChange, onBlur, invalid = false, className, ...props }: PriceInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      {...props}
      value={focused ? value : formatNaira(value)}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
      onChange={(event) => onValueChange(event.target.value.replace(/[^0-9]/g, ""))}
      className={cn("dashboard-input", invalid && "analyze-input-error", className)}
    />
  );
}
