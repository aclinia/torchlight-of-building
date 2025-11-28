"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { RawHeroMemory } from "@/src/tli/core";
import { formatCraftedMemoryAffixes } from "../../lib/hero-utils";

interface HeroMemoryItemProps {
  memory: RawHeroMemory;
  isEquipped: boolean;
  onCopy: (memory: RawHeroMemory) => void;
  onDelete: (id: string) => void;
}

export const HeroMemoryItem: React.FC<HeroMemoryItemProps> = ({
  memory,
  isEquipped,
  onCopy,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const craftedAffixes = formatCraftedMemoryAffixes(memory);

  return (
    <div
      className="group relative flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-zinc-50 text-sm">
          {memory.memoryType}
        </span>
        <span className="text-xs text-zinc-500">
          ({craftedAffixes.length} affixes)
        </span>
        {isEquipped && (
          <span className="text-xs text-green-500 font-medium">Equipped</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onCopy(memory)}
          className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded text-xs"
          title="Copy memory"
        >
          Copy
        </button>
        <button
          onClick={() => onDelete(memory.id)}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
          title="Delete memory"
        >
          Delete
        </button>
      </div>

      {/* Hover tooltip showing memory details - rendered via portal to escape scroll container */}
      {isHovered &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed z-50 w-72 pointer-events-none"
            style={{ left: mousePos.x + 12, top: mousePos.y + 12 }}
          >
            <div className="bg-zinc-950 text-zinc-50 p-3 rounded-lg shadow-xl border border-zinc-700">
              <div className="font-semibold text-sm mb-2 text-amber-400">
                {memory.memoryType}
              </div>
              {craftedAffixes.length > 0 ? (
                <ul className="space-y-1">
                  {craftedAffixes.map((affix, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-zinc-400 whitespace-pre-wrap"
                    >
                      {affix}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-zinc-500 italic">No affixes</p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
