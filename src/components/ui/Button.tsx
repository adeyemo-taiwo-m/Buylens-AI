import React from "react";
import { cn } from "@/lib/utils";
import { Heart, ArrowRight } from "lucide-react";

export type ButtonType =
  | "Primary"
  | "Secondary"
  | "Tertiary"
  | "Cancel/Delete"
  | "Secondary-new"
  // Lowercase & alias support for backward compatibility:
  | "primary"
  | "secondary"
  | "tertiary"
  | "cancel/delete"
  | "cancel"
  | "delete"
  | "danger"
  | "secondary-new"
  | "secondaryNew"
  | "accent"
  | "ghost";

export type ButtonSize = "Large" | "Small" | "large" | "small" | "lg" | "sm" | "md";

export type ButtonState = "Default" | "Active" | "inactive" | "default" | "active";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  /** Figma Button Type */
  variant?: ButtonType;
  /** Alias for variant matching Figma component property */
  buttonType?: ButtonType;
  /** Figma Button Size */
  size?: ButtonSize;
  /** Figma Button State */
  buttonState?: ButtonState;
  /** Figma Label Content */
  labelContent?: string;
  /** Figma Show Left Icon toggle */
  showLeftIcon?: boolean;
  /** Figma Left Icon Type (e.g. 'heart', 'arrow-right' or custom JSX) */
  leftIconType?: "heart" | "arrow-right" | string | React.ReactNode;
  /** Figma Show Right Icon toggle */
  showRightIcon?: boolean;
  /** Figma Right Icon Type (e.g. 'arrow-right', 'heart' or custom JSX) */
  rightIconType?: "heart" | "arrow-right" | string | React.ReactNode;
  /** Loading spinner indicator */
  loading?: boolean;
}

function renderIcon(icon: string | React.ReactNode, sizeClass: string) {
  if (!icon) return null;
  if (typeof icon === "string") {
    switch (icon.toLowerCase()) {
      case "heart":
        return <Heart className={sizeClass} />;
      case "arrow-right":
      case "arrowright":
        return <ArrowRight className={sizeClass} />;
      default:
        return null;
    }
  }
  return <>{icon}</>;
}

export function Button({
  type = "button",
  variant,
  buttonType,
  size = "Large",
  buttonState = "Default",
  labelContent,
  showLeftIcon = false,
  leftIconType = "heart",
  showRightIcon = false,
  rightIconType = "arrow-right",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  // Normalize type/variant (defaults to Primary)
  const resolvedType = (buttonType || variant || "Primary").toLowerCase();
  const normalizedSize = size.toLowerCase();
  const normalizedState = buttonState.toLowerCase();
  const isInactive = normalizedState === "inactive" || disabled || loading;

  // Size specifications matching Figma Large and Small
  const isSmall = normalizedSize === "small" || normalizedSize === "sm";
  const sizeStyles = isSmall
    ? "h-9 px-4 text-xs gap-1.5 font-semibold"
    : "h-11 px-6 text-sm gap-2 font-semibold";

  const iconSizeClass = isSmall ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0";

  // Variant styles based on Figma design:
  // - Primary: 600 of primary color (#2563eb / blue-600) with white text
  // - Secondary: dark charcoal pill with white text
  // - Cancel/Delete: soft light red/pink with red text
  // - Secondary-new: soft pastel blue with blue text
  // - Tertiary: borderless/transparent text button with blue text
  // - Accent: electric lime (from style guide)
  // - Ghost: subtle neutral text button
  let variantStyles = "";

  switch (resolvedType) {
    case "primary":
      // Primary button using primary-600 (#2563eb)
      variantStyles =
        normalizedState === "active"
          ? "bg-[#1d4ed8] text-white shadow-inner"
          : isInactive
          ? "bg-[#2563eb]/50 text-white/80 cursor-not-allowed"
          : "bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] active:scale-[0.98] shadow-sm";
      break;

    case "secondary":
      // Dark pill button
      variantStyles =
        normalizedState === "active"
          ? "bg-[#09090b] text-white shadow-inner"
          : isInactive
          ? "bg-[#18181b]/50 text-white/80 cursor-not-allowed"
          : "bg-[#18181b] text-white hover:bg-[#27272a] active:bg-[#09090b] active:scale-[0.98] shadow-sm";
      break;

    case "cancel/delete":
    case "cancel":
    case "delete":
    case "danger":
      // Light red/pink pill with red text
      variantStyles =
        normalizedState === "active"
          ? "bg-[#fca5a5] text-[#991b1b] shadow-inner"
          : isInactive
          ? "bg-[#fee2e2]/60 text-[#dc2626]/50 cursor-not-allowed"
          : "bg-[#fee2e2] text-[#dc2626] hover:bg-[#fecaca] active:bg-[#fca5a5] active:scale-[0.98]";
      break;

    case "secondary-new":
    case "secondarynew":
      // Soft light blue pill with blue text
      variantStyles =
        normalizedState === "active"
          ? "bg-[#bfdbfe] text-[#1d4ed8] shadow-inner"
          : isInactive
          ? "bg-[#eff6ff]/60 text-[#2563eb]/50 cursor-not-allowed"
          : "bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe] active:bg-[#bfdbfe] active:scale-[0.98]";
      break;

    case "tertiary":
      // Text-only button in primary blue
      variantStyles =
        normalizedState === "active"
          ? "bg-[#dbeafe] text-[#1d4ed8]"
          : isInactive
          ? "text-[#2563eb]/40 bg-transparent cursor-not-allowed"
          : "bg-transparent text-[#2563eb] hover:bg-[#eff6ff] active:bg-[#dbeafe]";
      break;

    case "accent":
      // Lime accent button
      variantStyles =
        normalizedState === "active"
          ? "bg-[#88cf13] text-[#0b1220]"
          : isInactive
          ? "bg-[#b8f34a]/40 text-[#0b1220]/50 cursor-not-allowed"
          : "bg-[#b8f34a] text-[#0b1220] hover:bg-[#a7e932] active:bg-[#88cf13] active:scale-[0.98] shadow-sm";
      break;

    case "ghost":
    default:
      variantStyles =
        normalizedState === "active"
          ? "bg-[#e4e7ec] text-[#101828]"
          : isInactive
          ? "text-[#667085]/40 bg-transparent cursor-not-allowed"
          : "bg-transparent text-[#101828] hover:bg-[#f2f4f0] active:scale-[0.98]";
      break;
  }

  const content = labelContent || children || "Button Label";

  return (
    <button
      type={type}
      disabled={isInactive}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-150 select-none cursor-pointer border-0",
        sizeStyles,
        variantStyles,
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        showLeftIcon && renderIcon(leftIconType, iconSizeClass)
      )}

      <span>{content}</span>

      {!loading && showRightIcon && renderIcon(rightIconType, iconSizeClass)}
    </button>
  );
}
