import { BaseGearAffix } from "@/src/tli/gear_data_types";
import { craft } from "@/src/tli/crafting/craft";
import { AffixSlotState } from "../../lib/types";
import { formatAffixOption } from "../../lib/affix-utils";

interface AffixSlotProps {
  slotIndex: number;
  affixType: "Prefix" | "Suffix";
  affixes: BaseGearAffix[];
  selection: AffixSlotState;
  onAffixSelect: (slotIndex: number, value: string) => void;
  onSliderChange: (slotIndex: number, value: string) => void;
  onClear: (slotIndex: number) => void;
}

export const AffixSlotComponent: React.FC<AffixSlotProps> = ({
  slotIndex,
  affixType,
  affixes,
  selection,
  onAffixSelect,
  onSliderChange,
  onClear,
}) => {
  const selectedAffix =
    selection.affixIndex !== null ? affixes[selection.affixIndex] : null;
  const craftedText = selectedAffix
    ? craft(selectedAffix, selection.percentage)
    : "";

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      {/* Affix Dropdown */}
      <select
        value={selection.affixIndex !== null ? selection.affixIndex : ""}
        onChange={(e) => onAffixSelect(slotIndex, e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-zinc-700 rounded bg-zinc-900 text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
      >
        <option value="">&lt;Select {affixType}&gt;</option>
        {affixes.map((affix, idx) => (
          <option key={idx} value={idx}>
            {formatAffixOption(affix)}
          </option>
        ))}
      </select>

      {/* Slider and Preview (only show if affix selected) */}
      {selectedAffix && (
        <>
          {/* Quality Slider */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-zinc-500">Quality</label>
              <span className="text-xs font-medium text-zinc-50">
                {selection.percentage}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={selection.percentage}
              onChange={(e) => onSliderChange(slotIndex, e.target.value)}
              className="w-full"
            />
          </div>

          {/* Crafted Preview */}
          <div className="bg-zinc-900 p-3 rounded border border-zinc-700">
            <div className="text-sm font-medium text-amber-400 mb-1">
              {craftedText}
            </div>
            <div className="text-xs text-zinc-500">
              Tier {selectedAffix.tier}
              {selectedAffix.craftingPool && ` | ${selectedAffix.craftingPool}`}
            </div>
          </div>

          {/* Clear Button */}
          <button
            onClick={() => onClear(slotIndex)}
            className="mt-2 text-xs text-red-500 hover:text-red-400 font-medium"
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
};
