"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductTileProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export function ProductTile({ src, alt, fallbackSrc, className, imageClassName, sizes = "76px" }: ProductTileProps) {
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
          className={cn("object-contain p-2", imageClassName)}
          onError={() => {
            if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
            else setFailed(true);
          }}
        />
      ) : (
        <span aria-hidden="true" className="h-8 w-8 rounded-[8px] border-2 border-[#9DBFF2] bg-white/80" />
      )}
    </div>
  );
}
