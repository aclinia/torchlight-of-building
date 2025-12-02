import { useState } from "react";
import { createPortal } from "react-dom";
import { TalentNodeData } from "@/src/tli/talent_tree";

interface TalentNodeDisplayProps {
  node: TalentNodeData;
  allocated: number;
  canAllocate: boolean;
  canDeallocate: boolean;
  onAllocate: () => void;
  onDeallocate: () => void;
}

export const TalentNodeDisplay: React.FC<TalentNodeDisplayProps> = ({
  node,
  allocated,
  canAllocate,
  canDeallocate,
  onAllocate,
  onDeallocate,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isFullyAllocated = allocated >= node.maxPoints;
  const isLocked = !canAllocate && allocated === 0;
  const isLegendary = node.nodeType === "legendary";

  const talentTypeName =
    node.nodeType === "micro"
      ? "Micro Talent"
      : node.nodeType === "medium"
        ? "Medium Talent"
        : "Legendary Talent";

  return (
    <div
      className={`
        relative w-20 h-20 rounded-lg border-2 transition-all
        ${
          isFullyAllocated
            ? "border-green-500 bg-green-500/15"
            : allocated > 0
              ? "border-amber-500 bg-amber-500/10"
              : isLocked
                ? "border-zinc-800 bg-zinc-800 opacity-50"
                : "border-zinc-700 bg-zinc-800 hover:border-amber-500"
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
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

      {/* Allocation Buttons */}
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
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
