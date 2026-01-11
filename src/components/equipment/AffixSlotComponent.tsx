import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import { craft } from "@/src/tli/crafting/craft";
import type { BaseGearAffix } from "@/src/tli/gear-data-types";
import {
  type GroupedAffix,
  PERCENTAGE_RANGE_PER_TIER,
  formatAffixOption,
  groupAffixesByBaseName,
  tierAndPercentageToUnifiedValue,
  unifiedValueToTierAndPercentage,
} from "../../lib/affix-utils";
import type { AffixSlotState } from "../../lib/types";

const AFFIX_SLOT_TYPES = [
  "Prefix",
  "Suffix",
  "Blend",
  "Base Stats",
  "Base Affix",
  "Sweet Dream Affix",
  "Tower Sequence",
] as const;

type AffixSlotType = (typeof AFFIX_SLOT_TYPES)[number];

interface AffixSlotProps {
  slotIndex: number;
  affixType: AffixSlotType;
  affixes: BaseGearAffix[];
  selection: AffixSlotState;
  onAffixSelect: (slotIndex: number, value: string) => void;
  onTierChange: (slotIndex: number, tierIndex: number) => void;
  onSliderChange: (slotIndex: number, value: string) => void;
  onClear: (slotIndex: number) => void;
  hideQualitySlider?: boolean;
  hideTierInfo?: boolean;
  formatOption?: (affix: BaseGearAffix) => string;
  formatCraftedText?: (affix: BaseGearAffix) => string;
  selectedAffixNames?: string[]; // List of already selected affix base names to exclude
}

export const AffixSlotComponent: React.FC<AffixSlotProps> = ({
  slotIndex,
  affixType,
  affixes,
  selection,
  onAffixSelect,
  onTierChange,
  onSliderChange,
  onClear,
  hideQualitySlider = false,
  hideTierInfo = false,
  formatOption,
  formatCraftedText,
  selectedAffixNames = [],
}) => {
  // For Prefix, Suffix, and Base Affix, we group by base name (they have tiers)
  const shouldGroup = 
    affixType === "Prefix" || 
    affixType === "Suffix" || 
    affixType === "Base Affix";
  const groupedAffixes: GroupedAffix[] = shouldGroup
    ? groupAffixesByBaseName(affixes)
    : affixes.map((affix, idx) => ({
        baseName: affix.craftableAffix,
        affixes: [affix],
        displayName: formatOption ? formatOption(affix) : formatAffixOption(affix),
      }));

  const selectedGroup =
    selection.affixIndex !== undefined && selection.affixIndex < groupedAffixes.length
      ? groupedAffixes[selection.affixIndex]
      : undefined;

  // Filter out already selected affixes, but keep the current selection
  const currentSelectionBaseName = selectedGroup?.baseName;
  const availableGroups = groupedAffixes.filter(
    (group) => 
      group.baseName === currentSelectionBaseName || 
      !selectedAffixNames.includes(group.baseName),
  );


  // Its possible not all affixes support the same tier range, we default to the lowest one if out of range
  const clampedTierIndex = selectedGroup 
    ? Math.min(selection.tierIndex, selectedGroup.affixes.length - 1)
    : selection.tierIndex;

  const selectedAffix =
    selectedGroup && clampedTierIndex >= 0
      ? selectedGroup.affixes[clampedTierIndex]
      : undefined;

  const craftedText = selectedAffix
    ? formatCraftedText
      ? formatCraftedText(selectedAffix)
      : craft(selectedAffix, selection.percentage)
    : "";

  // Calculate unified slider value (combines tier and quality)
  const tierCount = selectedGroup?.affixes.length ?? 1;
  const hasMultipleTiers = shouldGroup && tierCount > 1;
  
  const unifiedValue = tierAndPercentageToUnifiedValue(
    tierCount,
    clampedTierIndex,
    selection.percentage,
  );

  const handleUnifiedSliderChange = (value: number) => {
    const { tierIndex, percentage } = unifiedValueToTierAndPercentage(tierCount, value);
    onTierChange(slotIndex, tierIndex);
    onSliderChange(slotIndex, percentage.toString());
  };

  const maxSliderValue = tierCount * PERCENTAGE_RANGE_PER_TIER - 1;
  const totalPercentage = Math.round((unifiedValue / maxSliderValue) * 100);

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      {/* Affix Dropdown */}
      <SearchableSelect
        value={selection.affixIndex ?? undefined}
        onChange={(value) => onAffixSelect(slotIndex, value?.toString() ?? "")}
        options={availableGroups.map((group, idx) => {
          const originalIndex = groupedAffixes.findIndex(g => g.baseName === group.baseName);
          return {
            value: originalIndex,
            label: group.displayName,
          };
        })}
        placeholder={`<Select ${affixType}>`}
        className="mb-3"
      />

      {/* Slider and Preview (only show if affix selected) */}
      {selectedAffix && selectedGroup && (
        <>
          {/* Unified Quality/Tier Slider */}
          {!hideQualitySlider && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor={`unified-slider-${slotIndex}`}
                  className="text-xs text-zinc-500"
                >
                  Quality
                </label>
                <span className="text-xs font-medium text-zinc-50">
                  {totalPercentage}% {hasMultipleTiers && `- Tier ${selectedAffix.tier}`}
                </span>
              </div>
              <div className="relative">
                <input
                  id={`unified-slider-${slotIndex}`}
                  type="range"
                  min="0"
                  max={tierCount * PERCENTAGE_RANGE_PER_TIER - 1}
                  value={unifiedValue}
                  onChange={(e) => handleUnifiedSliderChange(Number.parseInt(e.target.value, 10))}
                  className="w-full relative z-10"
                />
                {/* Tier boundary tick marks - Denotes the tier you are currently in*/}
                {hasMultipleTiers && (
                  <div className="absolute top-0.5 left-0 right-0 pointer-events-none" style={{ transform: 'translateY(-50%)' }}>
                    {Array.from({ length: tierCount - 1 }, (_, i) => {
                      const tierBoundaryValue = (i + 1) * PERCENTAGE_RANGE_PER_TIER;
                      const sliderMax = tierCount * PERCENTAGE_RANGE_PER_TIER - 1;
                      const position = (tierBoundaryValue / sliderMax) * 100;

                      return (
                        <div
                          key={i}
                          className="absolute h-4 w-0.5 bg-zinc-500"
                          style={{ 
                            left: `${position}%`,
                            transform: 'translateX(-50%)'
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Crafted Preview */}
          <div className="bg-zinc-900 p-3 rounded border border-zinc-700">
            <div
              className={`text-sm font-medium mb-1 whitespace-pre-line ${hideTierInfo || hideQualitySlider ? "text-purple-400" : "text-amber-400"}`}
            >
              {craftedText}
            </div>
          </div>

          {/* Clear Button */}
          <button
            type="button"
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
