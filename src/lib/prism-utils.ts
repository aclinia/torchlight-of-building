import { Prisms } from "@/src/data/prism/prisms";
import type { PlacedPrism } from "@/src/tli/core";
import type { PrismRarity } from "./save-data";

export interface PrismAffix {
  type: string;
  rarity: string;
  affix: string;
}

export const getBaseAffixes = (rarity: PrismRarity): PrismAffix[] => {
  const prefix = rarity === "rare" ? "Adds" : "Replaces";
  const seen = new Set<string>();
  return Prisms.filter((p) => {
    if (p.type !== "Base Affix" || !p.affix.startsWith(prefix)) return false;
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

// Types for prism gauge affix effects
export interface ParsedGaugeAffix {
  targetType: "legendary" | "medium" | "micro";
  bonusText: string;
}

export interface NodeBonusAffix {
  bonusText: string;
}

// Parse a Gauge affix to extract target type and bonus text
export const parseRareGaugeAffix = (
  affix: string,
): ParsedGaugeAffix | undefined => {
  // Pattern: "All <type> Talent within the area also gain: <bonus>"
  // Use [\s\S]* instead of .* with s flag to match across newlines
  const match = affix.match(
    /^All (Legendary Medium|Medium|Micro) Talent within the area also gain:\s*([\s\S]+)$/,
  );
  if (!match) return undefined;

  const typeMapping: Record<string, ParsedGaugeAffix["targetType"]> = {
    "Legendary Medium": "legendary",
    Medium: "medium",
    Micro: "micro",
  };

  return { targetType: typeMapping[match[1]], bonusText: match[2].trim() };
};

// Get positions affected by a prism based on its area dimensions
export const getAffectedPositions = (
  prismX: number,
  prismY: number,
  area: PrismArea = PRISM_AREAS["1x1"],
  gridWidth: number = 7,
  gridHeight: number = 5,
): { x: number; y: number }[] => {
  const positions: { x: number; y: number }[] = [];

  for (let col = 0; col < area.w; col++) {
    for (let row = 0; row < area.h; row++) {
      const x = prismX + col - area.anchorCol;
      const y = prismY + row - area.anchorRow;

      // Skip the prism position itself
      if (x === prismX && y === prismY) continue;

      // Check bounds
      if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
        positions.push({ x, y });
      }
    }
  }

  return positions;
};

// Scale numeric values in affix text by a multiplier
// Handles integers and decimals, e.g. "+8% Movement Speed" -> "+16% Movement Speed" when scaled by 2
// Excludes cooldown values from scaling (e.g., "6 s cooldown" or "Cooldown: 0.3 s")
export const scaleAffixText = (text: string, multiplier: number): string => {
  // Patterns for cooldown values that should NOT be scaled:
  // - "X s cooldown" (e.g., "6 s cooldown against the same target")
  // - "Cooldown: X s" (e.g., "Cooldown: 0.3 s")
  const cooldownPatterns = [
    /(\d+(?:\.\d+)?)\s*s\s+cooldown/gi,
    /Cooldown:\s*(\d+(?:\.\d+)?)\s*s/gi,
  ];

  // Collect cooldown values and their positions to preserve them
  const cooldownMatches: { start: number; end: number; original: string }[] =
    [];
  for (const pattern of cooldownPatterns) {
    for (const match of text.matchAll(pattern)) {
      cooldownMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        original: match[0],
      });
    }
  }

  // Scale numbers, but skip those within cooldown ranges
  return text.replace(
    /([+-]?)(\d+(?:\.\d+)?)/g,
    (match, sign, numStr, offset) => {
      // Check if this number is within a cooldown pattern
      const isInCooldown = cooldownMatches.some(
        (cm) => offset >= cm.start && offset < cm.end,
      );
      if (isInCooldown) {
        return match; // Return original, don't scale
      }

      const num = parseFloat(numStr);
      const scaled = num * multiplier;
      // Format: preserve decimal places if original had them, otherwise use integer
      const hasDecimal = numStr.includes(".");
      const formatted = hasDecimal
        ? scaled.toFixed(numStr.split(".")[1].length)
        : Math.round(scaled).toString();
      return sign + formatted;
    },
  );
};

// Collect gauge affixes from the new structured fields
const collectGaugeAffixes = (prism: PlacedPrism["prism"]): string[] => {
  const affixes: string[] = [];
  if (prism.rareAffix !== undefined) affixes.push(prism.rareAffix);
  if (prism.legendaryAffix !== undefined) affixes.push(prism.legendaryAffix);
  return affixes;
};

// Get bonus affixes that apply to a specific node from the placed prism
// Scales the bonus values based on allocated points (like normal talent affixes)
// When 0 points allocated, displays as if 1 point (shows base value)
export const getNodeBonusAffixes = (
  nodePosition: { x: number; y: number },
  nodeType: "micro" | "medium" | "legendary",
  placedPrism: PlacedPrism | undefined,
  treeSlot: string,
  allocatedPoints: number,
): NodeBonusAffix[] => {
  if (!placedPrism || placedPrism.treeSlot !== treeSlot) return [];

  const area = parseAreaAffix(placedPrism.prism.areaAffix);
  const affectedPositions = getAffectedPositions(
    placedPrism.position.x,
    placedPrism.position.y,
    area,
  );

  const isAffected = affectedPositions.some(
    (pos) => pos.x === nodePosition.x && pos.y === nodePosition.y,
  );

  if (!isAffected) return [];

  const bonuses: NodeBonusAffix[] = [];

  for (const gaugeAffix of collectGaugeAffixes(placedPrism.prism)) {
    const parsed = parseRareGaugeAffix(gaugeAffix);
    if (!parsed) continue;

    // Match node type to affix target type
    if (parsed.targetType === nodeType) {
      // Scale the bonus text by allocated points (minimum 1 to show base value)
      const scaledText = scaleAffixText(
        parsed.bonusText,
        Math.max(1, allocatedPoints),
      );
      bonuses.push({ bonusText: scaledText });
    }
  }

  return bonuses;
};
