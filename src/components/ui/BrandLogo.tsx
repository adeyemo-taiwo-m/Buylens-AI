import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoSize = "header" | "footer";

type BrandLogoProps = {
  size?: BrandLogoSize;
  alt?: string;
  priority?: boolean;
  className?: string;
};

const sizes: Record<BrandLogoSize, { icon: number; className: string; wordmark: string }> = {
  header: { icon: 28, className: "h-6 w-6 sm:h-7 sm:w-7", wordmark: "text-[18px] sm:text-[20px]" },
  footer: { icon: 35, className: "h-[34px] w-[35px]", wordmark: "text-[35px]" },
};

export function BrandLogo({ size = "header", alt = "BuyLens AI", priority = false, className }: BrandLogoProps) {
  const config = sizes[size];

  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", className)} aria-label={alt}>
      <Image
        src="/logo-icon.svg"
        alt=""
        width={config.icon}
        height={config.icon}
        priority={priority}
        className={cn(config.className, "object-contain")}
      />
      <span className={cn("inline-flex items-baseline font-bold leading-none tracking-[-0.045em]", config.wordmark)}>
        <span className="text-[#333]">Buy</span>
        <span className="text-[#2563EB]">Lens</span>
        <span className="ml-1.5 text-[#333]">AI</span>
      </span>
    </span>
  );
}
