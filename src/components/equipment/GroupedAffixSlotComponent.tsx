import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import { craft } from "@/src/tli/crafting/craft";
import type { BaseGearAffix } from "@/src/tli/gear-data-types";
import {
  type GroupableAffixType,
  getAffixForPercentage,
  getOptionsWithHeaders,
  getPercentageWithinTier,
  getSortedGroups,
  groupAffixesByBaseName,
} from "../../lib/affix-utils";
import type { AffixSlotState } from "../../lib/types";
import { AffixPreviewSection } from "./AffixPreviewSection";

interface GroupedAffixSlotComponentProps {
  slotIndex: number;
  affixType: GroupableAffixType;
  affixes: BaseGearAffix[];
  selection: AffixSlotState;
  onAffixSelect: (slotIndex: number, value: string) => void;
  onSliderChange: (slotIndex: number, value: string) => void;
  onClear: (slotIndex: number) => void;
  hideTierInfo?: boolean;
  formatCraftedText?: (affix: BaseGearAffix) => string;
  allSlotStates?: AffixSlotState[];
}

export const GroupedAffixSlotComponent = ({
  slotIndex,
  affixType,
  affixes,
  selection,
  onAffixSelect,
  onSliderChange,
  onClear,
  hideTierInfo = false,
  formatCraftedText,
  allSlotStates,
}: GroupedAffixSlotComponentProps): React.ReactElement => {
  // Build set of affix indices that are selected in OTHER slots of the same affixType (Prefix/Suffix/Base Affix)
  const excludedAffixIndices = new Set<number>();
  if (allSlotStates !== undefined) {
    allSlotStates.forEach((slot, index) => {
      if (index !== slotIndex && slot.affixIndex !== undefined) {
        excludedAffixIndices.add(slot.affixIndex);
      }
    });
  }

  // Group all affixes by their base name (e.g., all "Max Life" tiers together)
  const allGroups = groupAffixesByBaseName(affixes, affixes);

  // Filter out groups that contain already-selected affixes (except our current selection)
  const availableGroups = allGroups.filter((group) => {
    // Always keep group if it contains our current selection
    if (
      selection.affixIndex !== undefined &&
      group.originalIndices.includes(selection.affixIndex)
    ) {
      return true;
    }

    return !group.originalIndices.some((affixIndexInOriginalArray) =>
      excludedAffixIndices.has(affixIndexInOriginalArray),
    );
  });

  // Find which group contains our selected affix
  const selectedGroup =
    selection.affixIndex !== undefined
      ? availableGroups.find((group) =>
          group.originalIndices.includes(selection.affixIndex ?? -1),
        )
      : undefined;

  // Get the actual affix object based on slider percentage
  const selectedAffix =
    selectedGroup !== undefined
      ? getAffixForPercentage(selection.percentage, selectedGroup.affixes)
      : undefined;

  // Generate preview text
  const previewText =
    selectedAffix !== undefined && selectedGroup !== undefined
      ? formatCraftedText !== undefined
        ? formatCraftedText(selectedAffix)
        : craft(
            selectedAffix,
            getPercentageWithinTier(
              selection.percentage,
              selectedGroup.affixes.length,
            ),
          )
      : "";

  const sortedAffixGroups = getSortedGroups(availableGroups);
  const sortedOptionsWithHeaders = getOptionsWithHeaders(sortedAffixGroups);

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <SearchableSelect
        value={
          selectedGroup !== undefined
            ? sortedAffixGroups.indexOf(selectedGroup)
            : undefined
        }
        onChange={(value) => {
          if (value === null || value === undefined) {
            onAffixSelect(slotIndex, "");
            return;
          }
          const groupIndexInFilteredList = value as number;
          const group = sortedAffixGroups[groupIndexInFilteredList];
          if (group !== undefined) {
            const affixIndexInOriginalArray = group.originalIndices[0];
            onAffixSelect(slotIndex, affixIndexInOriginalArray.toString());
          }
        }}
        options={sortedOptionsWithHeaders}
        placeholder={`<Select ${affixType}>`}
        className="mb-3"
      />

      {selectedAffix !== undefined && (
        <AffixPreviewSection
          slotIndex={slotIndex}
          selectedAffix={selectedAffix}
          percentage={selection.percentage}
          previewText={previewText}
          hideQualitySlider={false}
          showTierInfo={!hideTierInfo}
          onSliderChange={onSliderChange}
          onClear={onClear}
        />
      )}
    </div>
  );
};
