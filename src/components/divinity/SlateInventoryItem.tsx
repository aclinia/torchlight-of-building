import { Tooltip } from "@/src/components/ui/Tooltip";
import { useTooltip } from "@/src/hooks/useTooltip";
import { getSlateDisplayName } from "@/src/lib/divinity-utils";
import type { DivinitySlate } from "@/src/tli/core";
import { SlatePreview } from "./SlatePreview";
import { SlateTooltipContent } from "./SlateTooltipContent";

interface SlateInventoryItemProps {
  slate: DivinitySlate;
  isPlaced: boolean;
  onPlace: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

export const SlateInventoryItem: React.FC<SlateInventoryItemProps> = ({
  slate,
  isPlaced,
  onPlace,
  onCopy,
  onDelete,
}) => {
  const { isVisible, triggerRef, triggerRect } = useTooltip();
  const isLegendary = slate.isLegendary === true;

  const displayName = isLegendary
    ? (slate.legendaryName ?? "Legendary Slate")
    : slate.god !== undefined
      ? getSlateDisplayName(slate.god)
      : "Unknown Slate";

  return (
    <>
      <div
        ref={triggerRef}
        className={`flex items-center gap-3 rounded border p-2 transition-colors ${
          isPlaced
            ? "border-zinc-600 bg-zinc-700/50"
            : isLegendary
              ? "border-orange-600/50 bg-zinc-900 hover:border-orange-500"
              : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
        }`}
      >
        <div className="flex-shrink-0">
          <SlatePreview
            shape={slate.shape}
            god={slate.god}
            rotation={slate.rotation}
            flippedH={slate.flippedH}
            flippedV={slate.flippedV}
            size="small"
            isLegendary={isLegendary}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${isLegendary ? "text-orange-400" : "text-zinc-200"}`}
            >
              {displayName}
            </span>
            {isPlaced && (
              <span className="rounded bg-zinc-600 px-1.5 py-0.5 text-xs text-zinc-300">
                Placed
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!isPlaced && (
            <button
              type="button"
              onClick={onPlace}
              className="rounded bg-amber-600 px-2 py-1 text-xs text-white hover:bg-amber-500"
            >
              Place
            </button>
          )}
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
        variant={isLegendary ? "legendary" : "default"}
      >
        <SlateTooltipContent slate={slate} />
      </Tooltip>
    </>
  );
};
