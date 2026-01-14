import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import { craft } from "@/src/tli/crafting/craft";
import type { BaseGearAffix } from "@/src/tli/gear-data-types";
import {
  formatAffixOption,
  type NonGroupableAffixType,
} from "../../lib/affix-utils";
import type { AffixSlotState } from "../../lib/types";
import { AffixPreviewSection } from "./AffixPreviewSection";

// This component renders affix slots that only have single tiers for mods
// It also will NOT group up mods of the same base name as there is generally a single affix
interface AffixSlotProps {
  slotIndex: number;
  affixType: NonGroupableAffixType;
  affixes: BaseGearAffix[];
  selection: AffixSlotState;
  onAffixSelect: (slotIndex: number, value: string) => void;
  onSliderChange: (slotIndex: number, value: string) => void;
  onClear: (slotIndex: number) => void;
  hideQualitySlider?: boolean;
  hideTierInfo?: boolean;
  formatOption?: (affix: BaseGearAffix) => string;
  formatCraftedText?: (affix: BaseGearAffix) => string;
}

export const AffixSlotComponent: React.FC<AffixSlotProps> = ({
  slotIndex,
  affixType,
  affixes,
  selection,
  onAffixSelect,
  onSliderChange,
  onClear,
  hideQualitySlider = false,
  hideTierInfo = false,
  formatOption,
  formatCraftedText,
}) => {
  const selectedAffix =
    selection.affixIndex !== undefined
      ? affixes[selection.affixIndex]
      : undefined;

  const previewText = selectedAffix
    ? formatCraftedText
      ? formatCraftedText(selectedAffix)
      : craft(selectedAffix, selection.percentage)
    : "";

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      {/* Affix Dropdown */}
      <SearchableSelect
        value={selection.affixIndex ?? undefined}
        onChange={(value) => onAffixSelect(slotIndex, value?.toString() ?? "")}
        options={affixes.map((affix, idx) => ({
          value: idx,
          label: formatOption ? formatOption(affix) : formatAffixOption(affix),
        }))}
        placeholder={`<Select ${affixType}>`}
        className="mb-3"
      />

      {selectedAffix !== undefined && (
        <AffixPreviewSection
          slotIndex={slotIndex}
          selectedAffix={selectedAffix}
          percentage={selection.percentage}
          previewText={previewText}
          hideQualitySlider={hideQualitySlider}
          showTierInfo={!hideTierInfo}
          onSliderChange={onSliderChange}
          onClear={onClear}
        />
      )}
    </div>
  );
};
