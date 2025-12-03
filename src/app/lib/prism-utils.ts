import { Prisms } from "@/src/data/prism/prisms";
import type { CraftedPrism, PlacedPrism, PrismRarity } from "./save-data";

const ADDS_CORE_TALENT_PREFIX =
  "Adds an additional effect to the Core Talent on the";

// Extract the "added effect" text from a prism's "Adds an additional effect..." base affix
export const extractCoreTalentAddedEffect = (
  baseAffix: string,
): string | undefined => {
  if (!baseAffix.startsWith(ADDS_CORE_TALENT_PREFIX)) {
    return undefined;
  }
  const parts = baseAffix.split(":\n");
  if (parts.length <= 1) return undefined;
  const effect = parts.slice(1).join(":\n").trim();
  return effect || undefined;
};

// Get the core talent added effect from a crafted prism, if applicable
export const getPrismCoreTalentEffect = (
  prism: CraftedPrism,
): string | undefined => {
  return extractCoreTalentAddedEffect(prism.baseAffix);
};

export interface PrismAffix {
  type: string;
  rarity: string;
  affix: string;
}

export const getBaseAffixes = (rarity: PrismRarity): PrismAffix[] => {
  const prefix = rarity === "rare" ? "Adds" : "Replaces";
  return Prisms.filter(
    (p) => p.type === "Base Affix" && p.affix.startsWith(prefix),
  );
};

export const getRareGaugeAffixes = (): PrismAffix[] => {
  return Prisms.filter((p) => p.type === "Prism Gauge" && p.rarity === "Rare");
};

export const getLegendaryGaugeAffixes = (): PrismAffix[] => {
  return Prisms.filter(
    (p) => p.type === "Prism Gauge" && p.rarity === "Legendary",
  );
};

export const getMaxRareGaugeAffixes = (): number => 2;

export const getMaxLegendaryGaugeAffixes = (rarity: PrismRarity): number =>
  rarity === "legendary" ? 1 : 0;

export const getMaxTotalGaugeAffixes = (rarity: PrismRarity): number =>
  getMaxRareGaugeAffixes() + getMaxLegendaryGaugeAffixes(rarity);

// Types for prism gauge affix effects
export interface ParsedGaugeAffix {
  targetType: "legendary" | "medium" | "micro";
  bonusText: string;
}

export interface NodeBonusAffix {
  bonusText: string;
}

// Parse a Rare Gauge affix to extract target type and bonus text
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

  return {
    targetType: typeMapping[match[1]],
    bonusText: match[2].trim(),
  };
};

// Get positions affected by a prism (8 surrounding nodes in 3x3 area)
export const getAffectedPositions = (
  prismX: number,
  prismY: number,
  gridWidth: number = 7,
  gridHeight: number = 5,
): { x: number; y: number }[] => {
  const positions: { x: number; y: number }[] = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      // Skip the prism position itself
      if (dx === 0 && dy === 0) continue;

      const newX = prismX + dx;
      const newY = prismY + dy;

      // Check bounds
      if (newX >= 0 && newX < gridWidth && newY >= 0 && newY < gridHeight) {
        positions.push({ x: newX, y: newY });
      }
    }
  }

  return positions;
};

// Scale numeric values in affix text by a multiplier
// Handles integers and decimals, e.g. "+8% Movement Speed" -> "+16% Movement Speed" when scaled by 2
export const scaleAffixText = (text: string, multiplier: number): string => {
  // Match numbers (integers and decimals) that appear in the text
  // Captures optional sign, integer part, and optional decimal part
  return text.replace(/([+-]?)(\d+(?:\.\d+)?)/g, (match, sign, numStr) => {
    const num = parseFloat(numStr);
    const scaled = num * multiplier;
    // Format: preserve decimal places if original had them, otherwise use integer
    const hasDecimal = numStr.includes(".");
    const formatted = hasDecimal
      ? scaled.toFixed(numStr.split(".")[1].length)
      : Math.round(scaled).toString();
    return sign + formatted;
  });
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

  const affectedPositions = getAffectedPositions(
    placedPrism.position.x,
    placedPrism.position.y,
  );

  const isAffected = affectedPositions.some(
    (pos) => pos.x === nodePosition.x && pos.y === nodePosition.y,
  );

  if (!isAffected) return [];

  const bonuses: NodeBonusAffix[] = [];

  for (const gaugeAffix of placedPrism.prism.gaugeAffixes) {
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
