import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "consider" | "warning" | "danger" | "neutral" | "navy";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] font-semibold",
    md: "px-2.5 py-1 text-xs font-semibold",
  }[size];

  const variantStyles = {
    success: "bg-[#ECFDF3] text-[#15803D] border border-[#ABEFC6]",
    consider: "bg-[#F7FEE7] text-[#4D7C0F] border border-[#D9F99D]",
    warning: "bg-[#FFFAEB] text-[#B45309] border border-[#FEDF89]",
    danger: "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]",
    neutral: "bg-[#F2F4F7] text-[#475467] border border-[#E4E7EC]",
    navy: "bg-[#0B1220] text-white border border-[rgba(255,255,255,0.14)]",
  }[variant];

  const dotColor = {
    success: "bg-[#16A34A]",
    consider: "bg-[#84CC16]",
    warning: "bg-[#F59E0B]",
    danger: "bg-[#DC2626]",
    neutral: "bg-[#64748B]",
    navy: "bg-[#B8F34A]",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full select-none",
        sizeStyles,
        variantStyles,
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />}
      <span>{children}</span>
    </span>
  );
}
