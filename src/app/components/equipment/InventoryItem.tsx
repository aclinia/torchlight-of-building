"use client";

import { Tooltip, TooltipTitle } from "@/src/app/components/ui/Tooltip";
import { useTooltip } from "@/src/app/hooks/useTooltip";
import { getAllAffixes, type Gear } from "@/src/tli/core";

interface InventoryItemProps {
  item: Gear;
  isEquipped: boolean;
  onCopy: (itemId: string) => void;
  onDelete: (id: string) => void;
}

export const InventoryItem: React.FC<InventoryItemProps> = ({
  item,
  isEquipped,
  onCopy,
  onDelete,
}) => {
  const { isHovered, mousePos, handlers } = useTooltip();

  const isLegendary = item.rarity === "legendary";

  return (
    <div
      className={`group relative flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors border ${
        isLegendary ? "border-amber-500/50" : "border-transparent"
      }`}
      {...handlers}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-zinc-50 text-sm">
          {item.legendaryName ?? item.equipmentType}
        </span>
        {isLegendary && (
          <span className="text-xs text-amber-400 font-medium">Legendary</span>
        )}
        <span className="text-xs text-zinc-500">
          ({getAllAffixes(item).length} affixes)
        </span>
        {isEquipped && (
          <span className="text-xs text-green-500 font-medium">Equipped</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onCopy(item.id!)}
          className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded text-xs"
          title="Copy item"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id!)}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
          title="Delete item"
        >
          Delete
        </button>
      </div>

      <Tooltip
        isVisible={isHovered}
        mousePos={mousePos}
        variant={isLegendary ? "legendary" : "default"}
      >
        <TooltipTitle>{item.legendaryName ?? item.equipmentType}</TooltipTitle>
        {isLegendary && (
          <div className="text-xs text-zinc-500 mb-2">{item.equipmentType}</div>
        )}
        {item.baseStats?.text && (
          <div className="text-xs text-amber-300 mb-2">
            {item.baseStats.text}
          </div>
        )}
        {getAllAffixes(item).length > 0 ? (
          <ul className="space-y-1">
            {getAllAffixes(item).map((affix, idx) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: affixes can have duplicate text, index is stable
                key={idx}
                className="text-xs text-zinc-400"
              >
                {affix.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-zinc-500 italic">No affixes</p>
        )}
      </Tooltip>
    </div>
  );
};
