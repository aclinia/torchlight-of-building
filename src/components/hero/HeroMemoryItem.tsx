import { Tooltip, TooltipTitle } from "@/src/components/ui/Tooltip";
import { useTooltip } from "@/src/hooks/useTooltip";
import type { HeroMemory } from "@/src/tli/core";

interface HeroMemoryItemProps {
  memory: HeroMemory;
  isEquipped: boolean;
  isSelected: boolean;
  onSelect: (memoryId: string) => void;
}

export const HeroMemoryItem: React.FC<HeroMemoryItemProps> = ({
  memory,
  isEquipped,
  isSelected,
  onSelect,
}) => {
  const { isVisible, triggerRef, triggerRect } = useTooltip();

  return (
    <div
      className={`group relative flex items-center px-2 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors border cursor-pointer ${
        isSelected ? "border-amber-500" : "border-transparent"
      }`}
      ref={triggerRef}
      onClick={() => onSelect(memory.id)}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-zinc-50 text-sm">
          {memory.memoryType}
        </span>
        <span className="text-xs text-zinc-500">
          ({memory.affixes.length} affixes)
        </span>
        {isEquipped && (
          <span className="text-xs text-green-500 font-medium">Equipped</span>
        )}
      </div>

      <Tooltip isVisible={isVisible} triggerRect={triggerRect}>
        <TooltipTitle>{memory.memoryType}</TooltipTitle>
        <div className="text-xs text-zinc-400 mb-1">
          {memory.rarity.charAt(0).toUpperCase() + memory.rarity.slice(1)}{" "}
          &middot; Level {memory.level}
        </div>
        {memory.affixes.length > 0 ? (
          <div>
            {memory.affixes.map((affix, affixIdx) => (
              <div
                key={affixIdx}
                className={
                  affixIdx > 0 ? "mt-2 pt-2 border-t border-zinc-500" : ""
                }
              >
                {affix.affixLines.map((line, lineIdx) => (
                  <div
                    key={lineIdx}
                    className={
                      lineIdx > 0 ? "mt-1 pt-1 border-t border-zinc-800" : ""
                    }
                  >
                    <div className="text-xs text-zinc-400">{line.text}</div>
                    {line.mods === undefined && (
                      <div className="text-xs text-red-500">
                        (Mod not supported in TOB yet)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-500 italic">No affixes</p>
        )}
      </Tooltip>
    </div>
  );
};
