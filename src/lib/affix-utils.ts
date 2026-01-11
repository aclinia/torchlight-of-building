import { ALL_GEAR_AFFIXES } from "@/src/tli/all-affixes";
import type { BaseGearAffix, EquipmentType } from "@/src/tli/gear-data-types";

const FILTER_AFFIX_TYPES = [
  "Prefix",
  "Suffix",
  "Base Stats",
  "Base Affix",
  "Sweet Dream Affix",
  "Tower Sequence",
] as const;

type FilterAffixType = (typeof FILTER_AFFIX_TYPES)[number];

export const DEFAULT_TIER = 4;
export const PERCENTAGE_RANGE_PER_TIER = 100;

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

export const formatAffixOption = (affix: BaseGearAffix): string => {
  let display = affix.craftableAffix;
  display = display.replace(/\n/g, "/");
  if (display.length > 80) {
    display = `${display.substring(0, 77)}...`;
  }
  return display;
};


// Converts tier index and the percentage (quality) to a single slider value
export const tierAndPercentageToUnifiedValue = (
  tierCount: number,
  tierIndex: number,
  percentage: number,
): number => {
  const displayTier = tierCount - 1 - tierIndex;
  return displayTier * PERCENTAGE_RANGE_PER_TIER + percentage;
};

// Convert unified slider value back to tier index and percentage
// tierCount: total number of tiers available
// unifiedValue: the slider position (0 to tierCount * 100 - 1)
export const unifiedValueToTierAndPercentage = (
  tierCount: number,
  unifiedValue: number,
): { tierIndex: number; percentage: number } => {
  const displayTier = Math.floor(unifiedValue / PERCENTAGE_RANGE_PER_TIER);
  const percentage = unifiedValue % PERCENTAGE_RANGE_PER_TIER;
  const tierIndex = tierCount - 1 - displayTier;
  return { tierIndex, percentage };
};



// Extracts the base name of an affix by removing numeric values
// Examples:
//   "+(10-20)% Fire Damage" → "% Fire Damage"
//   "+6% Fire Damage" → "% Fire Damage"
//   "+(10-20) Max Life" → "# Max Life"
//   "Max Life" → "# Max Life"
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
  baseName = baseName.replace(/^(% |\+# )(\w)/, (_, p1, p2) => p1 + p2.toUpperCase());

  return baseName;
};

// Represents a group of affixes with the same base effect but different tiers
export interface GroupedAffix {
  baseName: string;
  affixes: BaseGearAffix[];
  displayName: string;
}


// Groups affixes by their base name (removing tier-specific values)
// For Prefix and Suffix types only - these are the ones that should be grouped by tier
// Affixes like Base / Sweet dream have a single tier with a range
export const groupAffixesByBaseName = (
  affixes: readonly BaseGearAffix[],
): GroupedAffix[] => {
  const groups = new Map<string, BaseGearAffix[]>();

  for (const affix of affixes) {
    const baseName = extractAffixBaseName(affix.craftableAffix);
    
    if (!groups.has(baseName)) {
      groups.set(baseName, []);
    }
    groups.get(baseName)?.push(affix);
  }

  const result: GroupedAffix[] = [];
  for (const [baseName, groupAffixes] of groups.entries()) {
    const sorted = groupAffixes.sort((a, b) => {
      const tierA = Number.parseInt(a.tier, 10);
      const tierB = Number.parseInt(b.tier, 10);
      return tierA - tierB;
    });

    result.push({
      baseName,
      affixes: sorted,
      displayName: baseName,
    });
  }

  // Sort groups alphabetically by affix name
  return result.sort((a, b) => a.baseName.localeCompare(b.baseName));
};
