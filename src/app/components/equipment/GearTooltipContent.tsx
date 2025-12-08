"use client";

import { useRef, useState } from "react";
import { TooltipTitle } from "@/src/app/components/ui/Tooltip";
import { type Gear, getAllAffixes } from "@/src/tli/core";

const TOOLTIP_WIDTH = 150;
const VIEWPORT_PADDING = 8;

const ModNotImplementedIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOnLeft, setShowOnLeft] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right - VIEWPORT_PADDING;
      setShowOnLeft(spaceOnRight < TOOLTIP_WIDTH);
    }
    setIsHovered(true);
  };

  return (
    <span
      ref={iconRef}
      className="relative ml-1 inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-red-500 cursor-help"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {isHovered && (
        <div
          className={`absolute top-0 z-50 whitespace-nowrap rounded bg-zinc-800 border border-zinc-600 px-2 py-1 text-xs text-zinc-300 shadow-lg ${
            showOnLeft ? "right-4" : "left-4"
          }`}
        >
          Mod not implemented yet
        </div>
      )}
    </span>
  );
};

export const GearTooltipContent: React.FC<{ item: Gear }> = ({ item }) => {
  const isLegendary = item.rarity === "legendary";
  const affixes = getAllAffixes(item);

  return (
    <>
      <TooltipTitle>{item.legendaryName ?? item.equipmentType}</TooltipTitle>
      {isLegendary && (
        <div className="text-xs text-zinc-500 mb-2">{item.equipmentType}</div>
      )}
      {item.baseStats && (
        <div className="text-xs text-amber-300 mb-2">
          <div>{item.baseStats.text}</div>
        </div>
      )}
      {affixes.length > 0 ? (
        <ul className="space-y-1">
          {affixes.map((affix, affixIdx) =>
            affix.affixLines.map((line, lineIdx) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: affixes can have duplicate text, index is stable
                key={`${affixIdx}-${lineIdx}`}
                className="text-xs text-zinc-400 flex items-center"
              >
                <span>{line.text}</span>
                {!line.mod && <ModNotImplementedIcon />}
              </li>
            )),
          )}
        </ul>
      ) : (
        <p className="text-xs text-zinc-500 italic">No affixes</p>
      )}
    </>
  );
};
