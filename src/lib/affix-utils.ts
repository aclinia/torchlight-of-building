import { ALL_GEAR_AFFIXES } from "@/src/tli/all-affixes";
import type { BaseGearAffix, EquipmentType } from "@/src/tli/gear-data-types";

export const FILTER_AFFIX_TYPES = [
  "Prefix",
  "Suffix",
  "Base Stats",
  "Base Affix",
  "Sweet Dream Affix",
  "Tower Sequence",
  "Blend",
] as const;

export type FilterAffixType = (typeof FILTER_AFFIX_TYPES)[number];

export const NON_GROUPABLE_AFFIX_TYPES = [
  "Base Stats",
  "Sweet Dream Affix",
  "Tower Sequence",
  "Blend",
] as const;
export type NonGroupableAffixType = (typeof NON_GROUPABLE_AFFIX_TYPES)[number];

export const GROUPABLE_AFFIX_TYPES = [
  "Prefix",
  "Suffix",
  "Base Affix",
] as const;
export type GroupableAffixType = (typeof GROUPABLE_AFFIX_TYPES)[number];

export const isGroupableAffixType = (
  affixType: FilterAffixType,
): affixType is "Prefix" | "Suffix" | "Base Affix" => {
  return GROUPABLE_AFFIX_TYPES.includes(affixType as GroupableAffixType);
};

export const getFilteredAffixes = (
  equipmentType: EquipmentType,
  affixType: FilterAffixType,
): BaseGearAffix[] => {
  const filtered = ALL_GEAR_AFFIXES.filter(
    (affix) =>
      affix.equipmentType === equipmentType && affix.affixType === affixType,
  );

  // Reverse base stats so highest values appear first
  if (affixType === "Base Stats") {
    return filtered.toReversed();
  }

  return filtered;
};

// Represents a group of affixes with the same base name (e.g., all Max Life tiers)
export interface CollapsedAffixGroup {
  affixBaseName: string; // Clean display name (e.g., "+# Maximum Life")
  affixes: BaseGearAffix[]; // All affixes in this group, sorted by tier
  originalIndices: number[]; // Original indices in the input array
  craftingPool: string;
}

export const formatAffixOption = (affix: BaseGearAffix): string => {
  let display = affix.craftableAffix;
  display = display.replace(/\n/g, "/");
  if (display.length > 80) {
    display = `${display.substring(0, 77)}...`;
  }
  return display;
};

// Extracts the base name for affixes and cleans up the text to a standard format
// Percentages will show up as "% Name" - eg. % Energy Sheild or % Damage
// Fixed values will show up as "+# Name" - eg. +# Health or +# Physical Skill Level
export const extractAffixBaseName = (affixText: string): string => {
  let baseName = affixText;
  const hasPercentage = baseName.includes("%");

  // Step 1: Remove ranges like (10-20) or +(10-20)
  baseName = baseName.replace(/[+-]?\(\d+-\d+\)/g, "");

  // Step 2: Remove all numbers and +/- signs
  baseName = baseName.replace(/[+-]?\d+/g, "");

  // Step 3: Clean up extra whitespace
  baseName = baseName.replace(/\s+/g, " ").trim();

  // Step 4: Add appropriate prefix
  if (hasPercentage) {
    // For percentage mods, ensure it starts with %
    baseName = baseName.replace(/^%?\s*/, "% ");
  } else {
    // For fixed value mods, add # prefix
    baseName = `+# ${baseName}`;
  }

  // Step 5: Capitalize first letter after % or +#
  baseName = baseName.replace(
    /^(% |\+# )(\w)/,
    (_, p1, p2) => p1 + p2.toUpperCase(),
  );

  return baseName;
};

// Groups affixes by their base name (all tiers of the same stat together)
export const groupAffixesByBaseName = (
  affixes: BaseGearAffix[],
  originalAffixArray?: BaseGearAffix[],
): CollapsedAffixGroup[] => {
  const affixGroups = new Map<string, CollapsedAffixGroup>();

  affixes.forEach((affix, index) => {
    const affixBaseName = extractAffixBaseName(affix.craftableAffix);

    if (!affixGroups.has(affixBaseName)) {
      affixGroups.set(affixBaseName, {
        affixBaseName,
        affixes: [],
        originalIndices: [],
        craftingPool: affix.craftingPool,
      });
    }

    const group = affixGroups.get(affixBaseName);
    if (group !== undefined) {
      group.affixes.push(affix);

      // If we have an original array, find the index in that array
      const originalIndex =
        originalAffixArray !== undefined
          ? originalAffixArray.indexOf(affix)
          : index;
      group.originalIndices.push(originalIndex);
    }
  });

  return Array.from(affixGroups.values());
};

// Helper to calculate which tier index the slider percentage maps to
const getTierIndexFromPercentage = (
  percentage: number,
  tierCount: number,
): number => {
  return Math.min(Math.floor((percentage / 100) * tierCount), tierCount - 1);
};

// Given the slider percentage, returns which affix tier should be active
// Slider is divided proportionally: 5 tiers = 0-20% T4, 20-40% T3, ..., 80-100% T0
export const getAffixForPercentage = (
  sliderPercentageValue: number,
  affixes: BaseGearAffix[],
): BaseGearAffix => {
  const tierCount = affixes.length;
  const tierIndex = getTierIndexFromPercentage(
    sliderPercentageValue,
    tierCount,
  );
  // Reverse the index so lowest tier (T4) is at 0%, highest tier (T0) is at 100%
  return affixes[tierCount - 1 - tierIndex];
};

// Calculates the percentage within the selected tier's range for interpolation
// Example: 5 tiers, 35% slider → tier 1 (20-40% range) → 75% within tier 1
export const getPercentageWithinTier = (
  percentage: number,
  tierCount: number,
): number => {
  const tierWidth = 100 / tierCount;
  const tierIndex = getTierIndexFromPercentage(percentage, tierCount);
  const tierStart = tierIndex * tierWidth;
  return ((percentage - tierStart) / tierWidth) * 100;
};

export const getSortedGroups = (affixGroups: CollapsedAffixGroup[]) => {
  return affixGroups.toSorted((a, b) => {
    const prio = ["Basic", "Advanced", "Ultimate"];
    if (!prio.includes(a.craftingPool) || !prio.includes(b.craftingPool)) {
      return -1;
    }
    return prio.indexOf(a.craftingPool) - prio.indexOf(b.craftingPool);
  });
};

export const getOptionsWithHeaders = (affixGroups: CollapsedAffixGroup[]) => {
  // Add the Basic, Advanced and Ultimate into the options as headers
  return affixGroups.map((group, index, array) => {
    const option: { label: string; value: number; header?: string } = {
      label: group.affixBaseName,
      value: index,
    };

    // Need to check this as some groups might not have any pool attached eg. Base Affixes
    if (index === 0 && group.craftingPool === "Basic") {
      option.header = "Basic";
    }

    const previousGroup = array[index - 1];
    if (
      previousGroup !== undefined &&
      previousGroup.craftingPool !== group.craftingPool
    ) {
      if (group.craftingPool === "Advanced") {
        option.header = "Advanced";
      } else if (group.craftingPool === "Ultimate") {
        option.header = "Ultimate";
      }
    }

    return option;
  });
};
