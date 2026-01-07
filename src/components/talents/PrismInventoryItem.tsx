import { Tooltip, TooltipTitle } from "@/src/components/ui/Tooltip";
import { useTooltip } from "@/src/hooks/useTooltip";
import { getLegendaryGaugeAffixes } from "@/src/lib/prism-utils";
import type { CraftedPrism } from "@/src/tli/core";

interface PrismInventoryItemProps {
  prism: CraftedPrism;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  selectionMode?: boolean;
}

export const PrismInventoryItem: React.FC<PrismInventoryItemProps> = ({
  prism,
  onEdit,
  onCopy,
  onDelete,
  isSelected = false,
  onSelect,
  selectionMode = false,
}) => {
  const { isVisible, triggerRef, triggerRect } = useTooltip();

  const legendaryGauges = getLegendaryGaugeAffixes();
  const legendaryCount = prism.gaugeAffixes.filter((a) =>
    legendaryGauges.some((lg) => lg.affix === a),
  ).length;
  const rareCount = prism.gaugeAffixes.length - legendaryCount;

  const baseAffixFirstLine = prism.baseAffix.split("\n")[0];
  const displayText =
    baseAffixFirstLine.length > 60
      ? `${baseAffixFirstLine.slice(0, 60)}...`
      : baseAffixFirstLine;

  const handleClick = () => {
    if (selectionMode && onSelect) {
      onSelect();
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-3 rounded border p-2 transition-colors ${
          isSelected
            ? "border-purple-500 bg-purple-500/20 ring-1 ring-purple-500"
            : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
        } ${selectionMode ? "cursor-pointer" : ""}`}
        onClick={handleClick}
        ref={triggerRef}
      >
        <div className="flex-shrink-0">
          <span
            className={`inline-block h-4 w-4 rounded ${
              prism.rarity === "legendary" ? "bg-orange-500" : "bg-purple-500"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-200 capitalize">
              {prism.rarity}
            </span>
          </div>
          <div className="text-xs text-zinc-400 truncate">{displayText}</div>
          <div className="flex items-center gap-1 mt-1">
            {legendaryCount > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="h-2 w-2 rounded-sm bg-orange-500" />
                <span className="text-xs text-zinc-400">×{legendaryCount}</span>
              </div>
            )}
            {rareCount > 0 && (
              <div className="flex items-center gap-0.5 ml-1">
                <span className="h-2 w-2 rounded-sm bg-purple-500" />
                <span className="text-xs text-zinc-400">×{rareCount}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-600"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-600"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded bg-zinc-700 px-2 py-1 text-xs text-red-400 hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      </div>

      <Tooltip
        isVisible={isVisible}
        triggerRect={triggerRect}
        variant={prism.rarity === "legendary" ? "legendary" : "prism"}
        width="lg"
      >
        <TooltipTitle>
          <span className="capitalize">{prism.rarity} Prism</span>
        </TooltipTitle>
        <div className="mb-2 text-xs text-zinc-300 whitespace-pre-line">
          <span className="text-zinc-500">Base: </span>
          {prism.baseAffix}
        </div>
        {prism.gaugeAffixes.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs text-zinc-500">Gauge Affixes:</span>
            {prism.gaugeAffixes.map((affix, index) => {
              const isLegendary = legendaryGauges.some(
                (lg) => lg.affix === affix,
              );
              return (
                <div key={index} className="flex items-start gap-1">
                  <span
                    className={`mt-1 h-2 w-2 flex-shrink-0 rounded-sm ${
                      isLegendary ? "bg-orange-500" : "bg-purple-500"
                    }`}
                  />
                  <span className="text-xs text-zinc-300 whitespace-pre-line">
                    {affix}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Tooltip>
    </>
  );
};
