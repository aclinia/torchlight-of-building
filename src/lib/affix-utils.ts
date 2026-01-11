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

export const DEFAULT_TIER = 4;



// Extracts the base name of an affix by removing the numeric ranges. EG - "+10-20 Fire Damage" becomes "Fire Damage"
export const extractAffixBaseName = (affixText: string): string => {
  let baseName = affixText.replace(/[+-]?\(\d+-\d+\)/g, "").trim();
  baseName = baseName.replace(/[+-]?\d+/g, "").trim();
  baseName = baseName.replace(/^[+-]\s*/, "");
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
  affixes: BaseGearAffix[],
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
