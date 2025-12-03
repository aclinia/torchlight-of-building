import React from "react";
import type { PlacedPrism } from "@/src/app/lib/save-data";
import type { TreeSlot } from "@/src/app/lib/types";
import { getPrismCoreTalentEffect } from "@/src/app/lib/prism-utils";

interface PrismCoreTalentEffectProps {
  placedPrism: PlacedPrism | undefined;
  activeTreeSlot: TreeSlot;
}

export const PrismCoreTalentEffect: React.FC<PrismCoreTalentEffectProps> = ({
  placedPrism,
  activeTreeSlot,
}) => {
  if (!placedPrism || placedPrism.treeSlot !== activeTreeSlot) {
    return null;
  }

  const effect = getPrismCoreTalentEffect(placedPrism.prism);
  if (!effect) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg border border-purple-500/50 bg-purple-500/10 p-4">
      <div className="mb-2 flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 text-purple-400"
        >
          <path
            d="M12 2L2 12L12 22L22 12L12 2Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M12 2L2 12L12 22L22 12L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm font-medium text-purple-400">
          Prism Core Talent Effect
        </span>
      </div>
      <div className="whitespace-pre-line text-sm text-blue-400">{effect}</div>
    </div>
  );
};
