import { Tooltip } from "@/src/components/ui/Tooltip";
import { useTooltip } from "@/src/hooks/useTooltip";
import { i18n } from "@/src/lib/i18n";
import { getGearAffixes } from "@/src/tli/calcs/affix-collectors";
import type { Gear } from "@/src/tli/core";
import { GearTooltipContent } from "./GearTooltipContent";

interface InventoryItemProps {
  item: Gear;
  isEquipped: boolean;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
}

export const InventoryItem: React.FC<InventoryItemProps> = ({
  item,
  isEquipped,
  isSelected,
  onSelect,
}) => {
  const { isVisible, triggerRef, triggerRect } = useTooltip();

  const isLegendary = item.rarity === "legendary";

  return (
    <div
      className={`group relative flex items-center px-2 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors border cursor-pointer ${
        isSelected
          ? "border-amber-500"
          : isLegendary
            ? "border-amber-500/50"
            : "border-transparent"
      }`}
      ref={triggerRef}
      // biome-ignore lint/style/noNonNullAssertion: inventory items always have id
      onClick={() => onSelect(item.id!)}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-zinc-50 text-sm">
          {i18n._(item.legendaryName ?? item.equipmentType)}
        </span>
        {isLegendary && (
          <span className="text-xs text-amber-400 font-medium">Legendary</span>
        )}
        <span className="text-xs text-zinc-500">
          ({getGearAffixes(item).length} affixes)
        </span>
        {isEquipped && (
          <span className="text-xs text-green-500 font-medium">Equipped</span>
        )}
      </div>

      <Tooltip
        isVisible={isVisible}
        triggerRect={triggerRect}
        variant={isLegendary ? "legendary" : "default"}
      >
        <GearTooltipContent item={item} />
      </Tooltip>
    </div>
  );
};
