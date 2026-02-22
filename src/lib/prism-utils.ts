import { Prisms } from "@/src/data/prism/prisms";
import type { PrismRarity } from "./save-data";

export interface PrismAffix {
  type: string;
  rarity: string;
  affix: string;
}

const PHANTASMAGORIA_AFFIX =
  "+75% to the effects of Random Affixes on this Prism";

export const getBaseAffixes = (rarity: PrismRarity): PrismAffix[] => {
  const prefix = rarity === "rare" ? "Adds" : "Replaces";
  const seen = new Set<string>();
  return Prisms.filter((p) => {
    if (p.type !== "Base Affix") return false;
    if (
      !p.affix.startsWith(prefix) &&
      !(rarity === "legendary" && p.affix === PHANTASMAGORIA_AFFIX)
    )
      return false;
    if (seen.has(p.affix)) return false;
    seen.add(p.affix);
    return true;
  });
};

export const getRareGaugeAffixes = (): PrismAffix[] => {
  const seen = new Set<string>();
  return Prisms.filter((p) => {
    if (p.type !== "Prism Gauge" || p.rarity !== "Rare") return false;
    if (seen.has(p.affix)) return false;
    seen.add(p.affix);
    return true;
  });
};

export const getLegendaryGaugeAffixes = (): PrismAffix[] => {
  const seen = new Set<string>();
  return Prisms.filter((p) => {
    if (p.type !== "Prism Gauge" || p.rarity !== "Legendary") return false;
    if (seen.has(p.affix)) return false;
    seen.add(p.affix);
    return true;
  });
};

export const getMaxRareGaugeAffixes = (): number => 1;

export const getMaxLegendaryGaugeAffixes = (rarity: PrismRarity): number =>
  rarity === "legendary" ? 1 : 0;

// Area expansion affixes (deduplicated)
export const getAreaAffixes = (): PrismAffix[] => {
  const seen = new Set<string>();
  return Prisms.filter((p) => {
    if (p.type !== "Random Affix") return false;
    if (!p.affix.startsWith("The Effect Area expands to")) return false;
    if (seen.has(p.affix)) return false;
    seen.add(p.affix);
    return true;
  });
};

// Mutation affixes (for legendary prisms only)
export const getMutationAffixes = (): PrismAffix[] => {
  const seen = new Set<string>();
  return Prisms.filter((p) => {
    if (p.type !== "Random Affix") return false;
    if (!p.affix.includes("Mutated Core Talents")) return false;
    if (seen.has(p.affix)) return false;
    seen.add(p.affix);
    return true;
  });
};

// Shared constants for prism base affix parsing
export const REPLACES_CORE_TALENT_PREFIX =
  "Replaces the Core Talent on the God of Might/Goddess of Hunting/Goddess of Knowledge/God of War/Goddess of Deception/God of Machines Advanced Talent Panel with ";

export const ADDS_CORE_TALENT_DELIMITER = "Advanced Talent Panel:\n";

// Extract the replacement core talent name from a legendary base affix
export const extractReplacementName = (
  baseAffix: string,
): string | undefined => {
  if (!baseAffix.startsWith(REPLACES_CORE_TALENT_PREFIX)) return undefined;
  return baseAffix.slice(REPLACES_CORE_TALENT_PREFIX.length);
};

// Extract the additional effect text from a rare base affix
export const extractAdditionalEffect = (
  baseAffix: string,
): string | undefined => {
  if (!baseAffix.startsWith("Adds an additional effect to the Core Talent")) {
    return undefined;
  }
  const delimiterIndex = baseAffix.indexOf(ADDS_CORE_TALENT_DELIMITER);
  if (delimiterIndex === -1) return undefined;
  return baseAffix.slice(delimiterIndex + ADDS_CORE_TALENT_DELIMITER.length);
};

// Get a short display label for a prism base affix
export const getBaseAffixLabel = (baseAffix: string): string => {
  if (baseAffix === PHANTASMAGORIA_AFFIX) return "Phantasmagoria";
  const additional = extractAdditionalEffect(baseAffix);
  if (additional !== undefined) return additional.replaceAll("\n", " / ");
  const replacement = extractReplacementName(baseAffix);
  if (replacement !== undefined) return replacement;
  return baseAffix.split("\n")[0];
};

// Prism area dimensions and anchor points
export interface PrismArea {
  w: number;
  h: number;
  anchorCol: number;
  anchorRow: number;
}

const PRISM_AREAS: Record<string, PrismArea> = {
  "3x3": { w: 3, h: 3, anchorCol: 1, anchorRow: 1 },
  "3x4": { w: 3, h: 4, anchorCol: 1, anchorRow: 1 },
  "4x3": { w: 4, h: 3, anchorCol: 1, anchorRow: 1 },
  "2x2": { w: 2, h: 2, anchorCol: 0, anchorRow: 0 },
  "7x1": { w: 7, h: 1, anchorCol: 3, anchorRow: 0 },
  "2x4": { w: 2, h: 4, anchorCol: 0, anchorRow: 1 },
  "4x2": { w: 4, h: 2, anchorCol: 1, anchorRow: 0 },
  "1x1": { w: 1, h: 1, anchorCol: 0, anchorRow: 0 },
};

// Parse area dimensions from an area affix string
export const parseAreaAffix = (affix: string | undefined): PrismArea => {
  if (affix === undefined) return PRISM_AREAS["1x1"];
  const match = affix.match(/(\d+x\d+) Rectangle/);
  return (
    (match !== null ? PRISM_AREAS[match[1]] : undefined) ?? PRISM_AREAS["1x1"]
  );
};

// Get display label for an area affix (e.g. "3x3")
export const getAreaLabel = (affix: string | undefined): string => {
  if (affix === undefined) return "1x1";
  const match = affix.match(/(\d+x\d+) Rectangle/);
  return match !== null ? match[1] : "1x1";
};
