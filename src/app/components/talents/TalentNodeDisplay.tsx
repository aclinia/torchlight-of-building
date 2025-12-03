import { useState } from "react";
import { createPortal } from "react-dom";
import { TalentNodeData } from "@/src/tli/talent_tree";
import { CraftedPrism } from "@/src/app/lib/save-data";
import type { NodeBonusAffix } from "@/src/app/lib/prism-utils";

interface TalentNodeDisplayProps {
  node: TalentNodeData;
  allocated: number;
  canAllocate: boolean;
  canDeallocate: boolean;
  onAllocate: () => void;
  onDeallocate: () => void;
  hasPrism?: boolean;
  prism?: CraftedPrism;
  isSelectingPrism?: boolean;
  onPlacePrism?: () => void;
  onRemovePrism?: () => void;
  canRemovePrism?: boolean;
  bonusAffixes?: NodeBonusAffix[];
}

export const TalentNodeDisplay: React.FC<TalentNodeDisplayProps> = ({
  node,
  allocated,
  canAllocate,
  canDeallocate,
  onAllocate,
  onDeallocate,
  hasPrism = false,
  prism,
  isSelectingPrism = false,
  onPlacePrism,
  onRemovePrism,
  canRemovePrism = false,
  bonusAffixes = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isFullyAllocated = allocated >= node.maxPoints;
  const isLocked = !canAllocate && allocated === 0;
  const isLegendary = node.nodeType === "legendary";
  const canPlacePrism = isSelectingPrism && allocated === 0 && !hasPrism;

  const talentTypeName =
    node.nodeType === "micro"
      ? "Micro Talent"
      : node.nodeType === "medium"
        ? "Medium Talent"
        : "Legendary Talent";

  const handleClick = () => {
    if (canPlacePrism && onPlacePrism) {
      onPlacePrism();
    }
  };

  // Prism node rendering
  if (hasPrism && prism) {
    return (
      <div
        className="relative w-20 h-20 rounded-lg border-2 transition-all border-purple-500 bg-purple-500/15 cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        {/* Prism Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-10 h-10 text-purple-400"
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
              <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Prism Label */}
        <div className="absolute bottom-0 left-0 right-0 bg-purple-900/70 text-purple-200 text-xs text-center py-0.5 rounded-b-md">
          Prism
        </div>

        {/* Remove Button (shown on hover) */}
        {isHovered && onRemovePrism && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            <button
              onClick={canRemovePrism ? onRemovePrism : undefined}
              disabled={!canRemovePrism}
              className={`w-5 h-5 rounded-full text-white text-xs font-bold ${
                canRemovePrism
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
              title={
                canRemovePrism
                  ? "Remove prism"
                  : "Cannot remove: dependent nodes have points allocated"
              }
            >
              ×
            </button>
          </div>
        )}

        {/* Tooltip */}
        {isHovered &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              className="fixed z-50 w-72 pointer-events-none"
              style={{ left: mousePos.x + 12, top: mousePos.y + 12 }}
            >
              <div className="bg-zinc-950 text-zinc-50 p-3 rounded-lg shadow-xl border border-purple-500/50">
                <div className="font-semibold text-sm mb-2 text-purple-400">
                  Rare Prism
                </div>
                <div className="text-xs text-zinc-400 whitespace-pre-line">
                  {prism.baseAffix}
                </div>
                {prism.gaugeAffixes.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-zinc-700">
                    <div className="text-xs text-zinc-500 mb-1">
                      Gauge Affixes:
                    </div>
                    {prism.gaugeAffixes.map((affix, idx) => (
                      <div key={idx} className="text-xs text-zinc-400">
                        {affix}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )}
      </div>
    );
  }

  // Normal talent node rendering
  return (
    <div
      className={`
        relative w-20 h-20 rounded-lg border-2 transition-all
        ${
          canPlacePrism
            ? "border-purple-500 bg-purple-500/20 cursor-pointer hover:bg-purple-500/30"
            : isFullyAllocated
              ? "border-green-500 bg-green-500/15"
              : allocated > 0
                ? "border-amber-500 bg-amber-500/10"
                : isLocked
                  ? "border-zinc-800 bg-zinc-800 opacity-50"
                  : "border-zinc-700 bg-zinc-800 hover:border-amber-500"
        }
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- dynamic game assets */}
        <img
          src={`/tli/talents/${node.iconName}.webp`}
          alt={node.iconName}
          className="w-12 h-12 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Points Display */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5 rounded-b-md">
        {allocated}/{node.maxPoints}
      </div>

      {/* Allocation Buttons (hidden when selecting prism on empty node) */}
      {!canPlacePrism && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          <button
            onClick={onAllocate}
            disabled={!canAllocate}
            className={`
              w-5 h-5 rounded-full text-white text-xs font-bold
              ${
                canAllocate
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }
            `}
          >
            +
          </button>
          <button
            onClick={onDeallocate}
            disabled={!canDeallocate}
            className={`
              w-5 h-5 rounded-full text-white text-xs font-bold
              ${
                canDeallocate
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }
            `}
          >
            -
          </button>
        </div>
      )}

      {/* Place Prism indicator when selecting */}
      {canPlacePrism && (
        <div className="absolute -top-2 -right-2">
          <div className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center animate-pulse">
            +
          </div>
        </div>
      )}

      {/* Tooltip */}
      {isHovered &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed z-50 w-72 pointer-events-none"
            style={{ left: mousePos.x + 12, top: mousePos.y + 12 }}
          >
            <div
              className={`bg-zinc-950 text-zinc-50 p-3 rounded-lg shadow-xl border ${
                isLegendary ? "border-amber-500/50" : "border-zinc-700"
              }`}
            >
              <div className="font-semibold text-sm mb-2 text-amber-400">
                {talentTypeName}
              </div>
              <div className="text-xs text-zinc-400 whitespace-pre-line">
                {node.rawAffix}
              </div>
              {bonusAffixes.length > 0 && (
                <div className="mt-2 pt-2 border-t border-blue-500/30">
                  {bonusAffixes.map((bonus, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-blue-400 whitespace-pre-line"
                    >
                      {bonus.bonusText}
                    </div>
                  ))}
                </div>
              )}
              {canPlacePrism && (
                <div className="mt-2 pt-2 border-t border-zinc-700 text-xs text-purple-400">
                  Click to place prism here
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
