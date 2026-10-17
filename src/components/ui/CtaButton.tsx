import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CtaButtonVariant = "primary" | "soft" | "ghost";

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: CtaButtonVariant;
  trailingIcon?: ReactNode;
  loading?: boolean;
};

const variants: Record<CtaButtonVariant, string> = {
  primary: "bg-[#2563EB] text-white shadow-[0_4px_12px_rgba(37,99,235,0.12)]",
  soft: "bg-[#E3ECFC] text-[#2563EB]",
  ghost: "border border-[#E9EEF7] bg-transparent text-[#2563EB]",
};

export function CtaButton({ href, variant = "primary", trailingIcon, loading = false, className, children, disabled, ...props }: CtaButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {loading ? <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : trailingIcon}
    </>
  );
  const classes = cn(
    "app-cta inline-flex h-12 items-center justify-center gap-3 rounded-full px-6 text-base font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  );

  if (href && !disabled) return <Link href={href} className={classes}>{content}</Link>;
  return <button type={props.type ?? "button"} className={classes} disabled={disabled || loading} {...props}>{content}</button>;
}
