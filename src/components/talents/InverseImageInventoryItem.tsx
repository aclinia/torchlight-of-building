import { Tooltip, TooltipTitle } from "@/src/components/ui/Tooltip";
import { useTooltip } from "@/src/hooks/useTooltip";
import { formatEffectModifier } from "@/src/lib/inverse-image-utils";
import type { CraftedInverseImage } from "@/src/tli/core";

interface InverseImageInventoryItemProps {
  inverseImage: CraftedInverseImage;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  selectionMode?: boolean;
}

export const InverseImageInventoryItem: React.FC<
  InverseImageInventoryItemProps
> = ({
  inverseImage,
  onEdit,
  onCopy,
  onDelete,
  isSelected = false,
  onSelect,
  selectionMode = false,
}) => {
  const { isVisible, triggerRef, triggerRect } = useTooltip();

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
            ? "border-cyan-500 bg-cyan-500/20 ring-1 ring-cyan-500"
            : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
        } ${selectionMode ? "cursor-pointer" : ""}`}
        onClick={handleClick}
        ref={triggerRef}
      >
        <div className="flex-shrink-0">
          <span className="inline-block h-4 w-4 rounded bg-cyan-500" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-200">
              Inverse Image
            </span>
          </div>
          <div className="text-xs text-zinc-400 truncate">
            Micro: {formatEffectModifier(inverseImage.microTalentEffect)} |
            Medium: {formatEffectModifier(inverseImage.mediumTalentEffect)} |
            Legendary:{" "}
            {formatEffectModifier(inverseImage.legendaryTalentEffect)}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-600"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
            className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-600"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded bg-zinc-700 px-2 py-1 text-xs text-red-400 hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      </div>

      <Tooltip
        isVisible={isVisible}
        triggerRect={triggerRect}
        variant="default"
        width="lg"
      >
        <TooltipTitle>
          <span className="text-cyan-400">Inverse Image</span>
        </TooltipTitle>
        <div className="mb-2 text-xs text-zinc-300">
          Reflects all Talents within the range to the mirrored area. All
          Talents within the reflected area have no prerequisites.
        </div>
        <div className="space-y-1 text-xs">
          <div className="text-blue-400">
            {formatEffectModifier(inverseImage.microTalentEffect)} all reflected
            Micro Talent Effects
          </div>
          <div className="text-blue-400">
            {formatEffectModifier(inverseImage.mediumTalentEffect)} all
            reflected Medium Talent Effects
          </div>
          <div className="text-blue-400">
            {formatEffectModifier(inverseImage.legendaryTalentEffect)} all
            reflected Legendary Medium Talent Effects
          </div>
        </div>
      </Tooltip>
    </>
  );
};
