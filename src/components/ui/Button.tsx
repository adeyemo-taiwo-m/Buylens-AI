import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "h-8 px-3 text-xs rounded-[8px]",
    md: "h-10 px-4 text-sm rounded-[10px]",
    lg: "h-12 px-5 text-base rounded-[10px]",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#0B1220] text-white hover:bg-[#111A2B] active:scale-[0.98] transition-all duration-150 border-0 font-medium",
    secondary:
      "bg-[#FFFFFF] text-[#101828] border border-[#E4E7EC] hover:bg-[#F7F8F5] hover:border-[#D0D5DD] active:scale-[0.98] transition-all duration-150 font-medium",
    accent:
      "bg-[#B8F34A] text-[#0B1220] hover:bg-[#A7E932] active:scale-[0.98] transition-all duration-150 border-0 font-semibold shadow-sm",
    ghost:
      "bg-transparent text-[#101828] hover:bg-[#F2F4F0] active:scale-[0.98] transition-all duration-150 font-medium",
    danger:
      "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA] hover:bg-[#FEE4E2] active:scale-[0.98] transition-all duration-150 font-medium",
  }[variant];

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
        sizeStyles,
        variantStyles,
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
