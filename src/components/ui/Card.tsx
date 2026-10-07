import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "subtle"
    | "interactive"
    | "selected"
    | "status"
    | "decision"
    | "recommendation"
    | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  }[padding];

  const variantStyles = {
    default: "bg-[#FFFFFF] border border-[#E4E7EC] rounded-[14px]",
    subtle: "bg-[#F2F4F0] border border-transparent rounded-[10px]",
    interactive:
      "bg-[#FFFFFF] border border-[#E4E7EC] rounded-[14px] cursor-pointer hover:border-[#D0D5DD] hover:-translate-y-0.5 hover:shadow-[0_1px_3px_rgba(11,18,32,0.06)] active:translate-y-0 active:scale-[0.995] transition-all duration-150 ease-out",
    selected:
      "bg-[#FFFFFF] border-[1.5px] border-[#0B1220] rounded-[14px] shadow-[0_4px_12px_-2px_rgba(11,18,32,0.08)]",
    status: "rounded-[14px]",
    decision:
      "bg-[#0B1220] text-white border border-[rgba(255,255,255,0.08)] rounded-[18px] shadow-[0_20px_40px_-16px_rgba(11,18,32,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden",
    recommendation:
      "bg-[#0B1220] text-white border border-[rgba(255,255,255,0.08)] rounded-[18px] shadow-[0_20px_40px_-16px_rgba(11,18,32,0.35)] relative overflow-hidden",
    ghost: "bg-transparent border-0 p-0",
  }[variant];

  return (
    <div
      className={cn(variantStyles, paddingStyles, className)}
      {...props}
    >
      {/* Decorative subtle hairline for decision card */}
      {(variant === "decision" || variant === "recommendation") && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8F34A]/50 to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  );
}
