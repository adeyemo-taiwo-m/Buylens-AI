"use client";

import type { RefObject } from "react";
import { ConnectorLines } from "./ConnectorLines";
import { HeroProductCard } from "./HeroProductCard";
import { InsightChips } from "./InsightChips";
import { ProductCardLayers } from "./ProductCardLayers";
import type { LensController } from "./useLensController";

type HeroMagnifierProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  rowRef: RefObject<HTMLDivElement | null>;
  controller: LensController;
};

export function HeroMagnifier({ cardRef, rowRef, controller }: HeroMagnifierProps) {

  return (
    <div className="hero-visual relative mx-auto flex w-full flex-col items-center">
      <div className="hero-card-wrap relative w-full max-w-[800px]">
        <ProductCardLayers cardRef={cardRef} controller={controller}>
          <HeroProductCard />
        </ProductCardLayers>
        <ConnectorLines
          cardWidth={controller.cardSize.width}
          cardHeight={controller.cardSize.height}
          rowWidth={controller.rowWidth}
          activeId={controller.activeId}
        />
      </div>

      <div
        ref={rowRef}
        className="hero-insights relative z-[6] mt-[54px] w-full max-w-[890px]"
      >
        <InsightChips controller={controller} />
      </div>
    </div>
  );
}
