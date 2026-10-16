import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoSize = "header" | "footer";

type BrandLogoProps = {
  size?: BrandLogoSize;
  alt?: string;
  priority?: boolean;
  className?: string;
};

const sizes: Record<BrandLogoSize, { width: number; height: number; className: string }> = {
  header: { width: 124, height: 28, className: "h-6 w-auto sm:h-7" },
  footer: { width: 176, height: 36, className: "h-9 w-auto" },
};

export function BrandLogo({ size = "header", alt = "BuyLens AI", priority = false, className }: BrandLogoProps) {
  const config = sizes[size];

  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={config.width}
      height={config.height}
      priority={priority}
      className={cn(config.className, "object-contain", className)}
    />
  );
}
