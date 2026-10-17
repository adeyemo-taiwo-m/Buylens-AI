"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductTileProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: "phone" | "generic";
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export function ProductTile({ src, alt, fallbackSrc, placeholder = "generic", className, imageClassName, sizes = "76px" }: ProductTileProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-[#EDF3FD]", className)}>
      {!failed ? (
        <Image
          src={currentSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-contain p-[10px]", imageClassName)}
          onError={() => {
            if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
            else setFailed(true);
          }}
        />
      ) : (
        placeholder === "phone" ? <span aria-hidden="true" className="relative h-[52px] w-[28px] rounded-[5px] border-2 border-[#9DB9E8] bg-white/90 shadow-[2px_2px_0_#C9DFFF]"><i className="absolute left-1/2 top-[5px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#9DB9E8]" /><i className="absolute bottom-[4px] left-1/2 h-[3px] w-[8px] -translate-x-1/2 rounded-full bg-[#D8E6FA]" /></span> : <span aria-hidden="true" className="h-8 w-8 rounded-[8px] border-2 border-[#9DBFF2] bg-white/80" />
      )}
    </div>
  );
}
